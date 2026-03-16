import { useFrame, useLoader } from '@react-three/fiber';
import { useFBX, Environment, ContactShadows, Trail } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

type VehicleModelProps = {
    scrollProgress: number;
    motionFactor: number;
    onFrontChange: (inFront: boolean) => void;
};

const VehicleModel = ({ scrollProgress, motionFactor, onFrontChange }: VehicleModelProps) => {
    const groupRef = useRef<THREE.Group>(null);
    const frontLeftSkidAnchorRef = useRef<THREE.Object3D>(null!);
    const frontRightSkidAnchorRef = useRef<THREE.Object3D>(null!);
    const rearLeftSkidAnchorRef = useRef<THREE.Object3D>(null!);
    const rearRightSkidAnchorRef = useRef<THREE.Object3D>(null!);
    const sourceModel = useFBX('/3d_assets/source/Transport5C.fbx');
    const colorTexture = useLoader(THREE.TextureLoader, '/3d_assets/source/Textures/TransportPack.png');
    const model = useMemo(() => sourceModel.clone(), [sourceModel]);

    useEffect(() => {
        colorTexture.colorSpace = THREE.SRGBColorSpace;
        colorTexture.wrapS = THREE.RepeatWrapping;
        colorTexture.wrapT = THREE.RepeatWrapping;

        const applyTexture = (material: THREE.Material) => {
            if ('map' in material) {
                const texturedMaterial = material as THREE.MeshStandardMaterial;
                texturedMaterial.map = colorTexture;
                texturedMaterial.color.set(0xfff0d6);
                texturedMaterial.emissive.set(0x2f1404);
                texturedMaterial.emissiveIntensity = 0.15;
                texturedMaterial.roughness = 0.45;
                texturedMaterial.metalness = 0.3;
                texturedMaterial.alphaMap = null;
                texturedMaterial.transparent = false;
                texturedMaterial.alphaTest = 0;
                texturedMaterial.opacity = 1;
                texturedMaterial.envMapIntensity = 1.2;
                texturedMaterial.needsUpdate = true;
            }
        };

        model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;

                const name = mesh.name.toLowerCase();
                const hasUv = Boolean(mesh.geometry?.getAttribute('uv'));
                const isProxyMesh = /(ucx|collision|collider|proxy|low|lod)/.test(name);

                if (!hasUv || isProxyMesh) {
                    mesh.visible = false;
                    return;
                }

                if (Array.isArray(mesh.material)) {
                    mesh.material.forEach((mat) => applyTexture(mat));
                } else if (mesh.material) {
                    applyTexture(mesh.material as THREE.Material);
                }
            }
        });
    }, [model, colorTexture]);

    const wasInFrontRef = useRef<boolean | null>(null);

    useFrame(({ clock }, delta) => {
        if (!groupRef.current) return;

        const t = clock.elapsedTime;
        const lerpSpeed = 1 - Math.exp(-6 * delta);

        // Slalom helix around the timeline center:
        //   X  = left-right weave past the timeline cards
        //   Z  = front-back through the timeline (positive = in front, negative = behind)
        //   Y  = full descent from very top of the section viewport to the bottom
        const loops = 2.5;
        const theta = scrollProgress * Math.PI * 2 * loops;
        const xRadius = 2.6;
        const zDepth = 2.8; // big Z swing so in-front vs behind is obvious
        const topY = 4.8;
        const bottomY = -4.8;

        const targetX = Math.sin(theta) * xRadius;
        const targetZ = Math.cos(theta) * zDepth;
        const targetY = THREE.MathUtils.lerp(topY, bottomY, scrollProgress) + Math.sin(t * 6) * 0.02;

        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, lerpSpeed);
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, lerpSpeed);
        groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, lerpSpeed);

        // Tangent heading so the car always faces its direction of travel.
        const tangentX = Math.cos(theta) * xRadius;
        const tangentZ = -Math.sin(theta) * zDepth;
        const heading = Math.atan2(tangentX, tangentZ);
        const currentYaw = groupRef.current.rotation.y;
        // Interpolate yaw on the shortest arc to avoid wrap-around 360 spins at -PI/PI.
        const shortestYawDelta = Math.atan2(Math.sin(heading - currentYaw), Math.cos(heading - currentYaw));
        groupRef.current.rotation.y = currentYaw + shortestYawDelta * lerpSpeed;
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.06, lerpSpeed);
        groupRef.current.rotation.z = THREE.MathUtils.lerp(
            groupRef.current.rotation.z,
            -Math.sin(theta) * 0.07 * motionFactor,
            lerpSpeed,
        );

        // Keep hidden anchors at wheel contact points to emit four tire-aligned skid trails.
        const yaw = groupRef.current.rotation.y;
        const forwardX = Math.sin(yaw);
        const forwardZ = Math.cos(yaw);
        const rightX = forwardZ;
        const rightZ = -forwardX;
        const frontAxleOffset = 0.32;
        const rearAxleOffset = -0.28;
        const halfTrackWidth = 0.5;
        const skidY = groupRef.current.position.y - 0.03;
        const centerX = groupRef.current.position.x;
        const centerZ = groupRef.current.position.z;

        const setWheelAnchor = (anchor: THREE.Object3D, longitudinalOffset: number, lateralOffset: number) => {
            anchor.position.set(
                centerX + forwardX * longitudinalOffset + rightX * lateralOffset,
                skidY,
                centerZ + forwardZ * longitudinalOffset + rightZ * lateralOffset,
            );
        };

        if (frontLeftSkidAnchorRef.current) {
            setWheelAnchor(frontLeftSkidAnchorRef.current, frontAxleOffset, -halfTrackWidth);
        }
        if (frontRightSkidAnchorRef.current) {
            setWheelAnchor(frontRightSkidAnchorRef.current, frontAxleOffset, halfTrackWidth);
        }
        if (rearLeftSkidAnchorRef.current) {
            setWheelAnchor(rearLeftSkidAnchorRef.current, rearAxleOffset, -halfTrackWidth);
        }
        if (rearRightSkidAnchorRef.current) {
            setWheelAnchor(rearRightSkidAnchorRef.current, rearAxleOffset, halfTrackWidth);
        }

        // Notify parent when car crosses Z=0 so it can flip the Canvas z-index.
        // Only fires on sign change — not every frame.
        const isInFront = groupRef.current.position.z >= 0;
        if (wasInFrontRef.current !== isInFront) {
            wasInFrontRef.current = isInFront;
            onFrontChange(isInFront);
        }
    });

    return (
        <>
            {/* IBL environment for realistic PBR reflections on the car */}
            <Environment preset="city" />
            {/* Grounding shadow underneath the car */}
            <ContactShadows
                position={[0, -4.8, 0]}
                opacity={0.35}
                scale={16}
                blur={3}
                far={5}
                color="#1a0a00"
            />
            <object3D ref={frontLeftSkidAnchorRef} />
            <object3D ref={frontRightSkidAnchorRef} />
            <object3D ref={rearLeftSkidAnchorRef} />
            <object3D ref={rearRightSkidAnchorRef} />
            <Trail
                target={frontLeftSkidAnchorRef}
                width={0.12}
                length={8}
                decay={1}
                interval={2}
                stride={0.02}
                color="#f97316"
                attenuation={(width) => width * width * 0.9}
            />
            <Trail
                target={frontRightSkidAnchorRef}
                width={0.12}
                length={8}
                decay={1}
                interval={2}
                stride={0.02}
                color="#f97316"
                attenuation={(width) => width * width * 0.9}
            />
            <Trail
                target={rearLeftSkidAnchorRef}
                width={0.12}
                length={8}
                decay={1}
                interval={2}
                stride={0.02}
                color="#f97316"
                attenuation={(width) => width * width * 0.9}
            />
            <Trail
                target={rearRightSkidAnchorRef}
                width={0.12}
                length={8}
                decay={1}
                interval={2}
                stride={0.02}
                color="#f97316"
                attenuation={(width) => width * width * 0.9}
            />
            <group ref={groupRef} position={[0, 4.8, 0]} scale={0.007}>
                <primitive object={model} />
            </group>
        </>
    );
};

export default VehicleModel;
