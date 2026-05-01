import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import AboutSection from './sections/AboutSection.tsx';
import ContactSection from './sections/ContactSection.tsx';
import HomeSection from './sections/HomeSection.tsx';
import ProjectsSection from './sections/ProjectsSection.tsx';
import TimelineSection from './sections/TimelineSection.tsx';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';

const App = () => {
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const roles = ['a student', 'an athlete', 'a full-stack developer', 'a hard worker'];

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
            <ProjectsSection />
            <ContactSection />

            <div className="fixed bottom-8 right-8 z-50 flex flex-col space-y-4">
                <motion.a
                    href="https://www.linkedin.com/in/ian-mei/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center hover:bg-orange-500/20 hover:border-orange-500/50 transition-all duration-300 shadow-lg"
                    aria-label="LinkedIn"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                </motion.a>
                <motion.a
                    href="https://www.instagram.com/ian.meiii/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center hover:bg-orange-500/20 hover:border-orange-500/50 transition-all duration-300 shadow-lg"
                    aria-label="Instagram"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                </motion.a>
                <motion.a
                    href="https://github.com/Ian-Mei"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center hover:bg-orange-500/20 hover:border-orange-500/50 transition-all duration-300 shadow-lg"
                    aria-label="GitHub"
                >
                    <Github className="w-5 h-5" aria-hidden="true" />
                </motion.a>
                <motion.a
                    href="https://www.facebook.com/ian.mei.144"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center hover:bg-orange-500/20 hover:border-orange-500/50 transition-all duration-300 shadow-lg"
                    aria-label="Facebook"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                </motion.a>
            </div>

            <BackgroundGradientAnimation
                interactive={false}
                size="78%"
                className="pointer-events-none"
                containerClassName="fixed inset-0 z-0 opacity-41"
            />

            <footer className="relative z-20 py-10 text-center text-gray-500 text-sm">&copy; 2026 Ian Mei</footer>
        </div>
    );
};

export default App;
