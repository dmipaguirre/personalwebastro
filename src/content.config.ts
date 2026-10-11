import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const postCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/pages/post" }),
  schema: z.object({
    layout: z.string().default("../../layouts/BlogLayout.astro"),
    title: z.string(),
    publishDate: z.string().datetime({ offset: true }).or(z.string().date()),
    description: z.string(),
    author: z.string().default("Miguel Páez"),
    image: z.object({
      url: z.string().url().or(z.string().startsWith("/")),
      alt: z.string().default("Miguel Páez web development notes."),
    }).optional(),
    icon: z.string().default(""),
    readingTime: z.string().default("5"),
    sizeLayout: z.enum(["wide", "tall", "featured"]).optional(),
    titleCategory: z.string().default(""),
  }),
});

export const collections = {
  post: postCollection,
};