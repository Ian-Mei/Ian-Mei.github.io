import { Canvas } from '@react-three/fiber';
import { motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Rocket, Sparkles } from 'lucide-react';
import { Suspense, useCallback, useRef, useState } from 'react';
import VehicleModel from '../components/VehicleModel';

type TimelineEvent = {
    id: string;
    title: string;
    period: string;
    description: string;
    icon: React.ReactNode;
};

type TimelineItemProps = {
    event: TimelineEvent;
    index: number;
};



const TimelineItem = ({ event, index }: TimelineItemProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -40 : 40 }}
            transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
            className={`relative flex items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
        >
            <div className="flex-1 w-full md:w-auto">
                <article className="group relative overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-xl p-6 shadow-2xl transition-all duration-300 hover:shadow-orange-500/20">
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-orange-500/10 via-red-500/5 to-yellow-500/10" />

                    <div className="relative mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/40">
                        {event.icon}
                    </div>

                    <div className="relative">
                        <h3 className="mb-2 text-xl md:text-2xl font-semibold text-white transition-colors group-hover:text-orange-400">
                            {event.title}
                        </h3>
                        <p className="mb-3 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-orange-400">
                            {event.period}
                        </p>
                        <p className="text-sm md:text-base leading-relaxed text-zinc-400">{event.description}</p>
                    </div>

                    <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-gradient-to-br from-orange-500/20 to-transparent" />
                </article>
            </div>

            <div className="relative z-10 flex flex-shrink-0 items-center justify-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.12 + 0.2 }}
                    className="relative"
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-red-500 opacity-60 blur-lg" />
                    <div className="relative h-6 w-6 rounded-full border-4 border-zinc-950 bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500 shadow-lg shadow-orange-500/50" />
                </motion.div>
            </div>

            <div className="hidden flex-1 md:block" />
        </motion.div>
    );
};

const TimelineSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasWrapperRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const motionFactor = shouldReduceMotion ? 0.4 : 1;
    const [scrollProgress, setScrollProgress] = useState(0);

    // Flip canvas z-index when car crosses Z=0 — no re-render, direct DOM write.
    const handleFrontChange = useCallback((inFront: boolean) => {
        if (canvasWrapperRef.current) {
            canvasWrapperRef.current.style.zIndex = inFront ? '30' : '-1';
        }
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        setScrollProgress(latest);
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
    const parallaxLeftY = useTransform(scrollYProgress, [0, 1], [-28, 36]);
    const parallaxRightY = useTransform(scrollYProgress, [0, 1], [36, -28]);
    const cardOneY = useTransform(scrollYProgress, [0, 1], [-220 * motionFactor, 140 * motionFactor]);
    const cardOneRotateX = useTransform(scrollYProgress, [0, 1], [52 * motionFactor, -24 * motionFactor]);
    const cardOneRotateY = useTransform(scrollYProgress, [0, 1], [-58 * motionFactor, 32 * motionFactor]);
    const cardOneRotateZ = useTransform(scrollYProgress, [0, 1], [-24 * motionFactor, 18 * motionFactor]);

    const cardTwoY = useTransform(scrollYProgress, [0, 1], [140 * motionFactor, -200 * motionFactor]);
    const cardTwoRotateX = useTransform(scrollYProgress, [0, 1], [-42 * motionFactor, 24 * motionFactor]);
    const cardTwoRotateY = useTransform(scrollYProgress, [0, 1], [52 * motionFactor, -28 * motionFactor]);
    const cardTwoRotateZ = useTransform(scrollYProgress, [0, 1], [20 * motionFactor, -16 * motionFactor]);

    const cardThreeY = useTransform(scrollYProgress, [0, 1], [-80 * motionFactor, 120 * motionFactor]);
    const cardThreeRotateX = useTransform(scrollYProgress, [0, 1], [34 * motionFactor, -20 * motionFactor]);
    const cardThreeRotateY = useTransform(scrollYProgress, [0, 1], [30 * motionFactor, -42 * motionFactor]);
    const cardThreeRotateZ = useTransform(scrollYProgress, [0, 1], [-16 * motionFactor, 20 * motionFactor]);

    const events: TimelineEvent[] = [
        {
            id: '1',
            title: 'President - TCSA',
            period: 'MAY 2025 - PRESENT',
            description:
                'Leading a 15-member board and organizing events with 500+ attendees while mentoring newer student leaders.',
            icon: <Sparkles className="h-5 w-5" aria-hidden="true" />,
        },
        {
            id: '2',
            title: 'Software Engineering Intern - North Atlantic Industries',
            period: 'SUMMER 2025',
            description:
                'Translated C code to Rust to improve memory safety, maintainability, and long-term code quality.',
            icon: <Briefcase className="h-5 w-5" aria-hidden="true" />,
        },
        {
            id: '3',
            title: 'Tech Lead - UMass LRC & OURS',
            period: 'OCT 2024 - PRESENT',
            description:
                'Maintaining and expanding internal university tools while leading development practices across teams.',
            icon: <Award className="h-5 w-5" aria-hidden="true" />,
        },
        {
            id: '4',
            title: 'Web Developer - BUILD UMass',
            period: 'SEP 2024 - MAY 2025',
            description:
                'Built software for student organizations and local nonprofits with a focus on usability and impact.',
            icon: <Rocket className="h-5 w-5" aria-hidden="true" />,
        },
        {
            id: '5',
            title: 'Events Coordinator - TCSA',
            period: 'MAY 2024 - MAY 2025',
            description:
                'Planned and executed large student events while improving operations and cross-team coordination.',
            icon: <Briefcase className="h-5 w-5" aria-hidden="true" />,
        },
        {
            id: '6',
            title: 'UMass Amherst - B.S. Computer Science',
            period: 'SEP 2023 - PRESENT',
            description:
                'Coursework and projects across full-stack systems, embedded programming, and multi-agent workflows.',
            icon: <GraduationCap className="h-5 w-5" aria-hidden="true" />,
        },
    ];

    return (
        <section id="timeline" className="relative z-20 py-24 px-6 md:px-10 lg:px-12">
            {/* 3D car — z-index flips via canvasWrapperRef when car crosses Z=0 */}
            <div
                ref={canvasWrapperRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden md:block"
                style={{ zIndex: 30, overflow: 'hidden' }}
            >
                <Canvas
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block' }}
                    camera={{ position: [0, 1.5, 9.5], fov: 58 }}
                    dpr={[1, 1.5]}
                >
                    <ambientLight intensity={0.6} color="#ffedd5" />
                    <directionalLight intensity={1.8} position={[5, 8, 3]} color="#fb923c" castShadow />
                    <directionalLight intensity={0.5} position={[-4, 2, -2]} color="#67e8f9" />
                    <Suspense fallback={null}>
                        <VehicleModel scrollProgress={scrollProgress} motionFactor={motionFactor} onFrontChange={handleFrontChange} />
                    </Suspense>
                </Canvas>
            </div>
            {/* Decorative background elements — behind timeline cards */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    pointerEvents: 'none',
                    zIndex: -1,
                    overflow: 'hidden',
                }}
                className="hidden md:block"
            >
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.32))' }} />
                {/* preserve-3d removed — children use individual transformTemplate; preserve-3d on parent */}
                {/* creates a 3D compositing context that escapes CSS z-index and fights the WebGL canvas */}
                <div style={{ position: 'absolute', inset: 0, perspective: '1600px' }}>

                    <motion.div
                        style={{ y: cardOneY, rotateX: cardOneRotateX, rotateY: cardOneRotateY, rotateZ: cardOneRotateZ, position: 'absolute', top: 300, left: -68 }}
                        className="h-52 w-72 overflow-hidden rounded-2xl border border-orange-300/30 shadow-[0_24px_70px_rgba(251,146,60,0.25)]"
                        transformTemplate={({ x, y, rotateX, rotateY, rotateZ }) =>
                            `translate3d(${x ?? '0px'}, ${y ?? '0px'}, 0px) rotateX(${rotateX ?? '0deg'}) rotateY(${rotateY ?? '0deg'}) rotateZ(${rotateZ ?? '0deg'})`
                        }
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,146,60,0.65),transparent_45%),radial-gradient(circle_at_78%_70%,rgba(239,68,68,0.6),transparent_42%),linear-gradient(135deg,rgba(24,24,27,0.95),rgba(9,9,11,0.96))]" />
                        <div className="absolute -left-8 top-12 h-24 w-24 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm" />
                        <div className="absolute right-10 top-7 h-10 w-24 rounded-full border border-orange-200/30 bg-orange-200/15" />
                        <div className="absolute bottom-7 left-12 h-3 w-36 rounded-full bg-white/25" />
                        <div className="absolute bottom-14 left-12 h-2 w-24 rounded-full bg-white/15" />
                    </motion.div>

                    <motion.div
                        style={{ y: cardTwoY, rotateX: cardTwoRotateX, rotateY: cardTwoRotateY, rotateZ: cardTwoRotateZ, position: 'absolute', top: '24%', right: -96 }}
                        className="h-48 w-72 overflow-hidden rounded-2xl border border-red-300/25 shadow-[0_26px_75px_rgba(239,68,68,0.22)]"
                        transformTemplate={({ x, y, rotateX, rotateY, rotateZ }) =>
                            `translate3d(${x ?? '0px'}, ${y ?? '0px'}, 0px) rotateX(${rotateX ?? '0deg'}) rotateY(${rotateY ?? '0deg'}) rotateZ(${rotateZ ?? '0deg'})`
                        }
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(244,63,94,0.62),transparent_46%),radial-gradient(circle_at_20%_85%,rgba(249,115,22,0.58),transparent_44%),linear-gradient(140deg,rgba(17,24,39,0.95),rgba(10,10,12,0.96))]" />
                        <div className="absolute left-6 top-8 h-20 w-20 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm" />
                        <div className="absolute right-8 top-10 h-14 w-28 rounded-xl border border-red-200/30 bg-red-200/15" />
                        <div className="absolute bottom-10 right-8 h-2 w-28 rounded-full bg-white/25" />
                        <div className="absolute bottom-6 right-8 h-2 w-20 rounded-full bg-white/15" />
                    </motion.div>

                    <motion.div
                        style={{ y: cardThreeY, rotateX: cardThreeRotateX, rotateY: cardThreeRotateY, rotateZ: cardThreeRotateZ, position: 'absolute', top: '60%', left: '20%' }}
                        className="h-44 w-64 overflow-hidden rounded-2xl border border-yellow-300/20 shadow-[0_20px_65px_rgba(234,179,8,0.2)]"
                        transformTemplate={({ x, y, rotateX, rotateY, rotateZ }) =>
                            `translate3d(${x ?? '0px'}, ${y ?? '0px'}, 0px) rotateX(${rotateX ?? '0deg'}) rotateY(${rotateY ?? '0deg'}) rotateZ(${rotateZ ?? '0deg'})`
                        }
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(234,179,8,0.55),transparent_40%),radial-gradient(circle_at_82%_20%,rgba(249,115,22,0.5),transparent_42%),linear-gradient(155deg,rgba(24,24,27,0.95),rgba(10,10,10,0.96))]" />
                        <div className="absolute left-8 top-8 h-12 w-12 rounded-full border border-white/20 bg-white/10" />
                        <div className="absolute left-24 top-11 h-12 w-28 rounded-xl border border-yellow-200/30 bg-yellow-200/10" />
                        <div className="absolute bottom-8 left-8 h-2 w-24 rounded-full bg-white/25" />
                        <div className="absolute bottom-4 left-8 h-2 w-16 rounded-full bg-white/15" />
                    </motion.div>
                </div>
                <motion.div
                    style={{ y: parallaxLeftY, position: 'absolute', left: '10%', top: 128 }}
                    className="h-56 w-56 rounded-full bg-orange-500/20 blur-3xl"
                />
                <motion.div
                    style={{ y: parallaxRightY, position: 'absolute', right: '8%', top: '52%' }}
                    className="h-64 w-64 rounded-full bg-red-500/20 blur-3xl"
                />
            </div>

            <div className="relative mx-auto max-w-6xl">
                <motion.header
                    initial={{ opacity: 0, y: -24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <p className="mb-3 text-xs tracking-[0.3em] uppercase text-orange-300">Experience Timeline</p>
                    <h2 className="mb-4 text-3xl md:text-5xl font-semibold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                        My Journey So Far
                    </h2>
                    <p className="mx-auto max-w-2xl text-zinc-400 text-sm md:text-base">
                        Milestones that shaped how I build software, lead teams, and keep leveling up.
                    </p>
                </motion.header>

                <div ref={containerRef} className="relative">
                    <div className="absolute bottom-0 left-1/2 top-0 hidden w-1 -translate-x-1/2 md:block">
                        <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 via-zinc-700 to-zinc-800" />
                        <motion.div
                            style={{ height: lineHeight }}
                            className="absolute left-0 right-0 top-0 bg-gradient-to-b from-orange-500 via-red-500 to-yellow-500 shadow-lg shadow-orange-500/30"
                        />
                    </div>

                    <div className="absolute bottom-0 left-6 top-0 w-1 md:hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 via-zinc-700 to-zinc-800" />
                        <motion.div
                            style={{ height: lineHeight }}
                            className="absolute left-0 right-0 top-0 bg-gradient-to-b from-orange-500 via-red-500 to-yellow-500"
                        />
                    </div>

                    <div className="relative space-y-12 pl-16 md:space-y-20 md:pl-0">
                        {events.map((event, index) => (
                            <TimelineItem key={event.id} event={event} index={index} />
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 shadow-xl shadow-orange-500/40">
                        <Sparkles className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <p className="mt-4 text-xs tracking-[0.18em] uppercase text-zinc-500">More coming soon</p>
                </motion.div>
            </div>
        </section>
    );
};

export default TimelineSection;
