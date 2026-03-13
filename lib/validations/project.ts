import { z } from "zod";

export const projectStepOneSchema = z.object({
  projectType: z.enum([
    "ai-commercial",
    "ai-content",
    "ai-influencer",
    "automation",
    "other",
  ]),
});

export const projectInfluencerSchema = z.object({
  targetRegions: z.array(z.string()).min(1, "Select at least one region"),
  language: z.string().min(1, "Select a language"),
  targetAudience: z.string().min(1, "Select target audience"),
  purpose: z.string().min(1, "Select influencer purpose"),
  influencerType: z.string().optional(),
});

export const projectContactSchema = z.object({
  company: z.string().min(1, "Company / Brand name is required"),
  title: z.string().optional(),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
});

export const projectBriefSchema = z.object({
  styleReference: z.string().optional(),
  brandGuide: z.any().optional(), // File
  briefDetails: z.string().optional(),
  briefFile: z.any().optional(), // File
});

export type ProjectStepOneData = z.infer<typeof projectStepOneSchema>;
export type ProjectInfluencerData = z.infer<typeof projectInfluencerSchema>;
export type ProjectContactData = z.infer<typeof projectContactSchema>;
export type ProjectBriefData = z.infer<typeof projectBriefSchema>;
