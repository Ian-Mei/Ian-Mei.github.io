const ContactSection = () => {
    return (
        <section id="contact" className="relative z-20 min-h-screen px-6 py-24 flex items-center">
            <div className="max-w-5xl mx-auto w-full text-center">
                <h2 className="text-3xl md:text-5xl font-light mb-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                    Get In Touch
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-10">
                    Reach out through social platforms, email, or resume.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                    <a
                        href="https://www.linkedin.com/in/ian-mei/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-2xl p-5 backdrop-blur-md bg-white/5 border border-white/10 hover:border-orange-400/40 transition-colors"
                    >
                        <p className="text-white font-medium">LinkedIn</p>
                        <p className="text-sm text-gray-400">ian-mei</p>
                    </a>
                    <a
                        href="https://www.instagram.com/ian.meiii/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-2xl p-5 backdrop-blur-md bg-white/5 border border-white/10 hover:border-orange-400/40 transition-colors"
                    >
                        <p className="text-white font-medium">Instagram</p>
                        <p className="text-sm text-gray-400">@ian.meiii</p>
                    </a>
                    <a
                        href="https://github.com/Ian-Mei"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-2xl p-5 backdrop-blur-md bg-white/5 border border-white/10 hover:border-orange-400/40 transition-colors"
                    >
                        <p className="text-white font-medium">GitHub</p>
                        <p className="text-sm text-gray-400">Ian-Mei</p>
                    </a>
                    <a
                        href="https://www.facebook.com/ian.mei.144"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-2xl p-5 backdrop-blur-md bg-white/5 border border-white/10 hover:border-orange-400/40 transition-colors"
                    >
                        <p className="text-white font-medium">Facebook</p>
                        <p className="text-sm text-gray-400">ian.mei.144</p>
                    </a>
                    <a
                        href="mailto:ianmmei246@gmail.com"
                        className="rounded-2xl p-5 backdrop-blur-md bg-white/5 border border-white/10 hover:border-orange-400/40 transition-colors"
                    >
                        <p className="text-white font-medium">Email</p>
                        <p className="text-sm text-gray-400">ianmmei246@gmail.com</p>
                    </a>
                    <a
                        href="/images/Ian_Mei_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-2xl p-5 backdrop-blur-md bg-white/5 border border-white/10 hover:border-orange-400/40 transition-colors"
                    >
                        <p className="text-white font-medium">Resume</p>
                        <p className="text-sm text-gray-400">View PDF</p>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
