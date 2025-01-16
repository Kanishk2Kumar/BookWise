import z from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University Card is Required"),
  password: z.string().min(8),
});

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})