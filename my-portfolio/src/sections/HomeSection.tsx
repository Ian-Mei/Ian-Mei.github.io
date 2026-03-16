import { AnimatePresence, motion } from 'framer-motion';

type HomeSectionProps = {
    roles: string[];
    currentRoleIndex: number;
};

const HomeSection = ({ roles, currentRoleIndex }: HomeSectionProps) => {
    return (
        <main id="home" className="relative z-20 min-h-screen flex items-center justify-center px-6">
            <div className="text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="mb-8"
                >
                    <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-orange-500/30 shadow-[0_0_40px_rgba(251,146,60,0.3)]">
                        <img src="/images/Ian.jpg" alt="Ian Mei" className="w-full h-full object-cover" />
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
                    <h1 className="text-4xl md:text-6xl font-light mb-6">
                        <span className="block mb-2">Hi, my name is</span>
                        <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent font-semibold">
                            Ian Mei
                        </span>
                    </h1>

                    <div className="text-2xl md:text-4xl font-light mb-8 h-12 flex items-center justify-center">
                        <span className="mr-2">I am</span>
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentRoleIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent font-medium inline-block min-w-[200px] text-left"
                            >
                                {roles[currentRoleIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
                        Junior at UMass Amherst studying Computer Science. I build impactful software across
                        full-stack development, embedded systems, and multi-agent workflows.
                    </p>
                </motion.div>
            </div>
        </main>
    );
};

export default HomeSection;
