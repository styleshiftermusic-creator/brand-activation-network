import { z } from "zod";

// Shared User Registration Schema
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  turnstileToken: z.string().min(1, "Bot protection token missing").optional(),
});

// Shared Authentication Schema
export const authSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
