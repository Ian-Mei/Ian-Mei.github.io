export type ProjectLink = {
    label: string;
    href: string;
};

export type Project = {
    title: string;
    image: string;
    links: ProjectLink[];
    description?: string;
    tags?: string[];
};
