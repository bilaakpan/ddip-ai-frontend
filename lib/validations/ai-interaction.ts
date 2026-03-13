import { z } from "zod";

export const aiInteractionSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Please enter a valid email").optional(),
  phone: z.string().optional(),
  message: z.string().min(1, "Please enter a message"),
  category: z.string().optional(),
});

export type AIInteractionFormData = z.infer<typeof aiInteractionSchema>;
