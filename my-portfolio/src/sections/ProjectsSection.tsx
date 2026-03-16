import type { Project } from '../types.ts';

type ProjectsSectionProps = {
    projects: Project[];
};

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
    return (
        <section id="projects" className="relative z-20 px-6 py-24">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-light mb-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent text-center">
                    Projects
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed text-center mb-12">
                    A selection of projects from coursework, internships, and hackathons.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {projects.map((project) => (
                        <article
                            key={project.title}
                            className="rounded-2xl overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 hover:border-orange-400/40 transition-colors"
                        >
                            <img src={project.image} alt={project.title} className="h-44 w-full object-cover" />
                            <div className="p-4">
                                <h3 className="text-sm font-medium min-h-[3.5rem]">{project.title}</h3>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {project.links.length > 0 ? (
                                        project.links.map((link) => (
                                            <a
                                                key={`${project.title}-${link.label}`}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/30 hover:bg-orange-500/30 transition-colors"
                                            >
                                                {link.label}
                                            </a>
                                        ))
                                    ) : (
                                        <span className="text-xs text-gray-400">Coming Soon</span>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
