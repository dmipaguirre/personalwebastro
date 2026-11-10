export interface PostFrontmatter {
  title: string;
  description: string;
  author: string;
  publishDate: string;
  readingTime: string;
  sizeLayout?: "wide" | "tall" | "featured";
  titleCategory?: string;
  image?: {
    url: string;
    alt: string;
  };
}

export interface PostEntry {
  frontmatter: PostFrontmatter;
  url: string;
}

const postFiles = import.meta.glob<PostEntry>("../pages/post/**/*.md", {
  eager: true,
});

export function getAllPosts(): PostEntry[] {
  return Object.values(postFiles)
    .filter((post) => post?.frontmatter)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishDate).getTime() -
        new Date(a.frontmatter.publishDate).getTime(),
    );
}

export function padIndex(n: number): string {
  return String(n).padStart(2, "0");
}

export function formatPostDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return `${padIndex(d.getDate())}·${padIndex(d.getMonth() + 1)}·${String(d.getFullYear()).slice(-2)}`;
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  slug: string;
  icon: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Comandos Básicos - Linux",
    description: "En esta entrada te explicaré los comandos básicos de Linux.",
    slug: "comandos-basicos-linux",
    icon: "brand-ubuntu"
  },
  {
    id: 2,
    title: "Introducción a Git",
    description: "Aprende los fundamentos de Git para el control de versiones.",
    slug: "introduccion-git",
    icon: "brand-git"
  },
  {
    id: 3,
    title: "Conceptos de Docker",
    description: "Entiende los conceptos básicos de Docker y contenedores.",
    slug: "conceptos-docker",
    icon: "brand-docker"
  }
];
