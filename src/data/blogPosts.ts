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
