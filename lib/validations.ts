import { University } from "lucide-react";
import z from "zod";

export const signUpSchema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    UniversityId: z.coerce.number(),
    UniversityCard: z.string().nonempty("University Card is Required"),
    password: z.string().min(8),
});

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})