import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import AboutSection from './sections/AboutSection.tsx';
import ContactSection from './sections/ContactSection.tsx';
import HomeSection from './sections/HomeSection.tsx';
import ProjectsSection from './sections/ProjectsSection.tsx';
import TimelineSection from './sections/TimelineSection.tsx';
import type { Project } from './types.ts';

const App = () => {
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const roles = ['a student', 'an athlete', 'a full-stack developer', 'a hard worker'];

    const projects: Project[] = [
        {
            title: 'UMass Dining Wrapped',
            image: '/images/UMassDiningWrapped.jpg',
            links: [{ label: 'Repo', href: 'https://github.com/Ian-Mei/UMass-Dining-Wrapped' }],
        },
        {
            title: 'LockIn - UMass Hackathon 2023',
            image: '/images/LockIn.jpg',
            links: [
                { label: 'About', href: 'https://github.com/D-SehKim/LockIn/blob/main/README.md' },
                { label: 'Repo', href: 'https://github.com/D-SehKim/LockIn' },
            ],
        },
        {
            title: 'Audio Visualizer',
            image: '/images/AudioVis.png',
            links: [
                { label: 'Demo', href: '/audiovis.html' },
                { label: 'Repo', href: 'https://github.com/Ian-Mei/Audio-Visualizer' },
            ],
        },
        {
            title: 'Digit Recognizer',
            image: '/images/9.png',
            links: [{ label: 'Repo', href: 'https://github.com/Ian-Mei/Digit-Recognizer' }],
        },
        {
            title: 'UMass BITES - UMass Hackathon 2024',
            image: '/images/bites.png',
            links: [
                { label: 'Devpost', href: 'https://devpost.com/software/umass-bites' },
                { label: 'Repo', href: 'https://github.com/Ian-Mei/UMass-BITES' },
            ],
        },
        {
            title: 'Duckpond - UMass CS320 Software Engineering Project',
            image: '/images/DP_Logo_White.png',
            links: [{ label: 'Repo', href: 'https://github.com/AryanJoshi-03/DuckPond' }],
        },
        {
            title: 'Tokenless - UMass Hackathon 2025',
            image: '/images/tokenless.png',
            links: [{ label: 'Devpost', href: 'https://devpost.com/software/tokenless' }],
        },
        {
            title: 'More Coming Soon!',
            image: '/images/ComingSoon.jpg',
            links: [],
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2500);

        return () => clearInterval(interval);
    }, [roles.length]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setParticles((prev) => [
                ...prev.slice(-20),
                { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY },
            ]);
        };

        globalThis.addEventListener('mousemove', handleMouseMove);
        return () => globalThis.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId = 0;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, index) => {
                const opacity = (index / particles.length) * 0.5;
                const size = (index / particles.length) * 4 + 1;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(251, 146, 60, ${opacity})`;
                ctx.fill();

                if (index > 0) {
                    const prevParticle = particles[index - 1];
                    ctx.beginPath();
                    ctx.moveTo(prevParticle.x, prevParticle.y);
                    ctx.lineTo(particle.x, particle.y);
                    ctx.strokeStyle = `rgba(251, 146, 60, ${opacity * 0.3})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationFrameId);
    }, [particles]);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#030303] text-white relative overflow-hidden">
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />

            <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-center space-x-8">
                        <button onClick={() => scrollToSection('home')} className="text-sm font-light hover:text-orange-400 transition-colors duration-300">Home</button>
                        <button onClick={() => scrollToSection('timeline')} className="text-sm font-light hover:text-orange-400 transition-colors duration-300">Timeline</button>
                        <button onClick={() => scrollToSection('about')} className="text-sm font-light hover:text-orange-400 transition-colors duration-300">About</button>
                        <button onClick={() => scrollToSection('projects')} className="text-sm font-light hover:text-orange-400 transition-colors duration-300">Projects</button>
                        <button onClick={() => scrollToSection('contact')} className="text-sm font-light hover:text-orange-400 transition-colors duration-300">Contact</button>
                    </div>
                </div>
            </nav>

            <HomeSection currentRoleIndex={currentRoleIndex} roles={roles} />
            <TimelineSection />
            <AboutSection />
            <ProjectsSection projects={projects} />
            <ContactSection />

            <div className="fixed bottom-8 right-8 z-50 flex flex-col space-y-4">
                <motion.a
                    href="https://www.linkedin.com/in/ian-mei/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center hover:bg-orange-500/20 hover:border-orange-500/50 transition-all duration-300 shadow-lg"
                >
                    <span className="text-xs font-semibold tracking-wide">in</span>
                </motion.a>
                <motion.a
                    href="https://www.instagram.com/ian.meiii/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center hover:bg-orange-500/20 hover:border-orange-500/50 transition-all duration-300 shadow-lg"
                >
                    <span className="text-xs font-semibold tracking-wide">ig</span>
                </motion.a>
                <motion.a
                    href="https://github.com/Ian-Mei"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center hover:bg-orange-500/20 hover:border-orange-500/50 transition-all duration-300 shadow-lg"
                >
                    <span className="text-xs font-semibold tracking-wide">gh</span>
                </motion.a>
                <motion.a
                    href="https://www.facebook.com/ian.mei.144"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center hover:bg-orange-500/20 hover:border-orange-500/50 transition-all duration-300 shadow-lg"
                >
                    <span className="text-xs font-semibold tracking-wide">fb</span>
                </motion.a>
            </div>

            <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(72rem_48rem_at_-8%_-6%,rgba(251,146,60,0.22),transparent_62%),radial-gradient(56rem_40rem_at_84%_72%,rgba(239,68,68,0.14),transparent_66%),linear-gradient(180deg,rgba(255,255,255,0.01),rgba(0,0,0,0.22))]" />
                <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-orange-500/5 blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-red-500/5 blur-3xl" />
            </div>

            <footer className="relative z-20 py-10 text-center text-gray-500 text-sm">&copy; 2026 Ian Mei</footer>
        </div>
    );
};

export default App;
