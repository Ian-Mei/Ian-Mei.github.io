const AboutSection = () => {
    return (
        <section id="about" className="relative z-20 min-h-screen px-6 py-24 flex items-center">
            <div className="max-w-6xl mx-auto w-full">
                <h2 className="text-3xl md:text-5xl font-light mb-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent text-center">
                    About Me
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed text-center max-w-3xl mx-auto mb-12">
                    Hello! I&apos;m Ian Mei, a junior at UMass Amherst studying Computer Science with a
                    passion for building usable software that solves real problems.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 p-6">
                        <h3 className="text-xl font-semibold mb-4">Professional Experience</h3>
                        <ul className="space-y-4 text-gray-300">
                            <li>
                                <p className="text-white font-medium">Software Engineering Intern</p>
                                <p className="text-sm text-orange-300">North Atlantic Industries - Summer 2025</p>
                                <p className="text-sm mt-1">Translated C code to Rust, improving memory safety and code quality.</p>
                            </li>
                            <li>
                                <p className="text-white font-medium">Tech Lead</p>
                                <p className="text-sm text-orange-300">UMass LRC and OURS - Oct 2024 to Present</p>
                                <p className="text-sm mt-1">Maintaining and expanding internal university tools and websites.</p>
                            </li>
                            <li>
                                <p className="text-white font-medium">Web Developer</p>
                                <p className="text-sm text-orange-300">BUILD UMass - Sep 2024 to May 2025</p>
                                <p className="text-sm mt-1">Built software for student organizations and local nonprofits.</p>
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 p-6">
                        <h3 className="text-xl font-semibold mb-4">Leadership and Athletics</h3>
                        <ul className="space-y-4 text-gray-300">
                            <li>
                                <p className="text-white font-medium">President, TCSA</p>
                                <p className="text-sm text-orange-300">May 2025 to Present</p>
                                <p className="text-sm mt-1">Lead a 15-member board and organized events with 500+ attendees.</p>
                            </li>
                            <li>
                                <p className="text-white font-medium">Events Coordinator, TCSA</p>
                                <p className="text-sm text-orange-300">May 2024 to May 2025</p>
                            </li>
                            <li>
                                <p className="text-white font-medium">UMass Club Swim Team</p>
                                <p className="text-sm text-orange-300">2022 to Present</p>
                                <p className="text-sm mt-1">2x Nationals qualifier, placed 33rd in 50 Breaststroke (2024).</p>
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 p-6 md:col-span-2">
                        <h3 className="text-xl font-semibold mb-4">Skills</h3>
                        <div className="flex flex-wrap gap-3">
                            {[
                                'Full-stack Development',
                                'Embedded Programming',
                                'Multi-agent Systems',
                                'Rust',
                                'C',
                                'Team Management',
                                'Event Planning',
                                'Project Strategy',
                            ].map((skill) => (
                                <span key={skill} className="rounded-full border border-white/20 px-4 py-1 text-sm text-gray-200 bg-white/5">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
