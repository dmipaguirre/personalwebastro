export type FolderTheme = "white" | "orange" | "black";

export interface CategoryConfig {
  title: string;
  headline: string;
  theme: FolderTheme;
}

export const categoryConfig: Record<string, CategoryConfig> = {
  idiomas: {
    title: "Idiomas",
    headline: "Aprendizaje de idiomas",
    theme: "white",
  },
  tecnologia: {
    title: "Tecnología",
    headline: "Frontend, Python, Astro y ciberseguridad",
    theme: "orange",
  },
  escritos: {
    title: "Escritos",
    headline: "Ensayos, crónicas y cuaderno de campo",
    theme: "black",
  },
};

export const categoryMap: Record<string, string> = {
  "Linux": "tecnologia",
  "CSS Responsive": "tecnologia",
  "CSS Hamburger": "tecnologia",
  "Css": "tecnologia",
  "CSS Animation": "tecnologia",
  "Idiomas": "idiomas",
};

export function getCategoryKey(titleCategory?: string): string {
  return titleCategory ? categoryMap[titleCategory] || "tecnologia" : "tecnologia";
}
