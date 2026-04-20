// src/sanity/image.ts

// 1. UBAH IMPORT: Gunakan destructuring { createImageUrlBuilder }
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";

const { projectId, dataset } = client.config();

// 2. UBAH PEMANGGILAN: Gunakan createImageUrlBuilder (bukan imageUrlBuilder)
const builder = createImageUrlBuilder({ 
  projectId: projectId || '', 
  dataset: dataset || '' 
});

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};