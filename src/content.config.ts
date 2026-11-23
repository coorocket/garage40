import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 글 1편 = 파일 1개. 날짜는 'YYYY-MM-DD' 글자 그대로 쓴다.
const day = z.union([z.string(), z.date()]).transform((v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v));

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['도장 증상 사전', '셀프 관리', '유리막·코팅', '도색 후 광택', '40년 장인 노트']),
    keyword: z.string(),
    pubDate: day,
    updatedDate: day.optional(),
    summary: z.string(),
    glance: z.array(z.object({ name: z.string(), value: z.string() })).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    related: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    masterNote: z.string().optional(),
    closing: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const photo = z.object({ src: z.string(), alt: z.string().default('') });

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    car: z.string().optional(),
    color: z.string().optional(),
    symptom: z.string().optional(),
    program: z.string().optional(),
    hours: z.string().optional(),
    priceRange: z.string().optional(),
    area: z.string().optional(),
    before: z.array(photo).default([]),
    after: z.array(photo).default([]),
    process: z.array(photo).default([]),
    masterNote: z.string().optional(),
    steps: z.array(z.string()).default([]),
    result: z.string().optional(),
    limits: z.string().optional(),
    pubDate: day,
    updatedDate: day.optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, cases };
