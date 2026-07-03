import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const site = "https://enghausen.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/cv", "/blog", "/contact"].map((path) => ({
    url: `${site}${path}`,
  }));
  const posts = getAllPosts().map((post) => ({
    url: `${site}/blog/${post.slug}`,
    lastModified: post.date,
  }));
  return [...pages, ...posts];
}
