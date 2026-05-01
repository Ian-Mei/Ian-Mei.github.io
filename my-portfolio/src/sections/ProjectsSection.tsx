import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { GlassBlogCard } from '@/components/ui/glass-blog-card';
import DigitRecognizer from '../projects/DigitRecognizer.tsx';
import type { Project } from '../types.ts';

const ProjectsSection = () => {
    const [digitModalOpen, setDigitModalOpen] = useState(false);

    const projects: Project[] = [
        {
            title: 'UMass Dining Wrapped',
            image: '/images/UMassDiningWrapped.jpg',
            description: 'An annual recap of dining hall experiences and food preferences',
            tags: ['React', 'Web'],
            links: [{ label: 'Repo', href: 'https://github.com/Ian-Mei/UMass-Dining-Wrapped' }],
        },
        {
            title: 'LockIn - UMass Hackathon 2023',
            image: '/images/LockIn.jpg',
            description: 'A focus management app designed to help students stay productive',
            tags: ['Hackathon', 'Mobile'],
            links: [
                { label: 'About', href: 'https://github.com/D-SehKim/LockIn/blob/main/README.md' },
                { label: 'Repo', href: 'https://github.com/D-SehKim/LockIn' },
            ],
        },
        {
            title: 'Audio Visualizer',
            image: '/images/AudioVis.png',
            description: 'Real-time audio frequency visualization with canvas rendering',
            tags: ['Canvas', 'Audio'],
            links: [
                { label: 'Demo', href: '/src/projects/audiovis.html' },
                { label: 'Repo', href: 'https://github.com/Ian-Mei/Audio-Visualizer' },
            ],
        },
        {
            title: 'Digit Recognizer',
            image: '/images/9.png',
            description: 'ML-powered handwritten digit recognition using neural networks',
            tags: ['ML', 'TensorFlow.js'],
            links: [
                { label: 'Demo', href: '#', onClick: () => setDigitModalOpen(true) },
                { label: 'Repo', href: 'https://github.com/Ian-Mei/Digit-Recognizer' },
            ],
        },
        {
            title: 'UMass BITES - Hack UMass 2024',
            image: '/images/bites.png',
            description: 'Campus dining recommendation system using AI and user preferences',
            tags: ['Hackathon', 'AI'],
            links: [
                { label: 'Devpost', href: 'https://devpost.com/software/umass-bites' },
                { label: 'Repo', href: 'https://github.com/Ian-Mei/UMass-BITES' },
            ],
        },
        {
            title: 'Duckpond - UMass CS320 Project',
            image: '/images/DP_Logo_White.png',
            description: 'Full-stack collaborative project from Software Engineering course',
            tags: ['Full-Stack', 'Coursework'],
            links: [{ label: 'Repo', href: 'https://github.com/AryanJoshi-03/DuckPond' }],
        },
        {
            title: 'Tokenless - Hack UMass 2025',
            image: '/images/tokenless.png',
            description: 'Innovative authentication system without traditional tokens',
            tags: ['Security', 'Hackathon'],
            links: [{ label: 'Devpost', href: 'https://devpost.com/software/tokenless' }],
        },
        {
            title: 'More Coming Soon!',
            image: '/images/ComingSoon.jpg',
            description: 'Exciting projects in development',
            tags: ['Upcoming', 'Latest'],
            links: [],
        },
    ];

    return (
        <section id="projects" className="relative z-20 min-h-screen px-6 py-24 flex items-center">
            <div className="max-w-7xl mx-auto w-full">
                <h2 className="text-3xl md:text-5xl font-light mb-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent text-center">
                    Projects
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed text-center mb-12">
                    A selection of projects from coursework, internships, and hackathons.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {projects.map((project) => (
                        <GlassBlogCard
                            key={project.title}
                            title={project.title}
                            excerpt={project.description || 'Project showcase'}
                            image={project.image}
                            date=""
                            readTime=""
                            tags={project.tags || []}
                            links={project.links}
                            author={{
                                name: 'Ian Mei',
                                avatar: 'https://github.com/Ian-Mei.png',
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Digit Recognizer modal */}
            <AnimatePresence>
                {digitModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={() => setDigitModalOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 24 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 24 }}
                            transition={{ duration: 0.25 }}
                            className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl overflow-auto max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setDigitModalOpen(false)}
                                className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                                aria-label="Close"
                            >
                                <X className="h-4 w-4" />
                            </button>
                            <DigitRecognizer />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ProjectsSection;
