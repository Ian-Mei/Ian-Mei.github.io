import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink } from "lucide-react";

interface GlassBlogCardProps {
    title?: string;
    excerpt?: string;
    image?: string;
    author?: {
        name: string;
        avatar: string;
    };
    date?: string;
    readTime?: string;
    tags?: string[];
    links?: Array<{ label: string; href: string }>;
    className?: string;
    onLinkClick?: (href: string) => void;
}

const defaultPost = {
    title: "The Future of UI Design",
    excerpt:
        "Exploring the latest trends in glassmorphism, 3D elements, and micro-interactions.",
    image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    author: {
        name: "Ian Mei",
        avatar: "https://github.com/Ian-Mei.png",
    },
    date: "Mar 2026",
    readTime: "5 min",
    tags: ["Design", "UI/UX"],
};

export function GlassBlogCard({
    title = defaultPost.title,
    excerpt = defaultPost.excerpt,
    image = defaultPost.image,
    author = defaultPost.author,
    date = defaultPost.date,
    tags = defaultPost.tags,
    links = [],
    className,
    onLinkClick,
}: GlassBlogCardProps) {
    const primaryLink = links?.[0];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn("w-full max-w-[400px]", className)}
        >
            <Card className="group relative h-full overflow-hidden rounded-2xl border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-orange-400/50 hover:shadow-2xl hover:shadow-orange-500/20">
                {/* Image Section */}
                <div className="relative aspect-[16/9] overflow-hidden">
                    <motion.img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                    <div className="absolute bottom-3 left-3 flex gap-2">
                        {tags?.map((tag, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="bg-slate-900/50 text-slate-100 backdrop-blur-sm hover:bg-slate-900/80"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Hover Overlay Action */}
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {primaryLink ? (
                            <motion.a
                                href={primaryLink.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => onLinkClick?.(primaryLink.href)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 rounded-full bg-orange-500 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-orange-500/25 hover:bg-orange-600"
                            >
                                <BookOpen className="h-4 w-4" />
                                {primaryLink.label}
                            </motion.a>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled
                                className="flex items-center gap-2 rounded-full bg-slate-600 px-6 py-2.5 text-sm font-medium text-slate-300 shadow-lg opacity-50 cursor-not-allowed"
                            >
                                <BookOpen className="h-4 w-4" />
                                Coming Soon
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col gap-4 p-5">
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold leading-tight tracking-tight text-white transition-colors group-hover:text-orange-400">
                            {title}
                        </h3>
                        <p className="line-clamp-2 text-sm text-slate-300">
                            {excerpt}
                        </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8 border border-white/10">
                                <AvatarImage src={author.avatar} alt={author.name} />
                                <AvatarFallback>{author.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col text-xs">
                                <span className="font-medium text-white">
                                    {author.name}
                                </span>
                                <span className="text-slate-400">{date}</span>
                            </div>
                        </div>

                        <div className="flex gap-1">
                            {links?.map((link) => (
                                <motion.a
                                    key={`${title}-${link.label}`}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => onLinkClick?.(link.href)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    title={link.label}
                                    className="flex items-center justify-center h-6 w-6 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/30 hover:bg-orange-500/30 transition-colors"
                                >
                                    <ExternalLink className="h-3 w-3" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
