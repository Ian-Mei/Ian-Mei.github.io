import { GlassBlogCard } from '@/components/ui/glass-blog-card';
import type { Project } from '../types.ts';

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
            { label: 'Demo', href: '/audiovis.html' },
            { label: 'Repo', href: 'https://github.com/Ian-Mei/Audio-Visualizer' },
        ],
    },
    {
        title: 'Digit Recognizer',
        image: '/images/9.png',
        description: 'ML-powered handwritten digit recognition using neural networks',
        tags: ['ML', 'Python'],
        links: [{ label: 'Repo', href: 'https://github.com/Ian-Mei/Digit-Recognizer' }],
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

const ProjectsSection = () => {
    return (
        <section id="projects" className="relative z-20 px-6 py-24">
            <div className="max-w-7xl mx-auto">
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
        </section>
    );
};

export default ProjectsSection;
