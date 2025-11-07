import * as z from "zod";

export const registerSchema = () =>
  z
    .object({
      name: z.string({ message: "Não pode estar vazio" }),
      email: z.string().email({ message: "Email inválido" }),
      password: z.string().min(1, { message: "Não pode estar vazio" }),
      confirmPassword: z.string().min(1, { message: "Não pode estar vazio" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"], 
      message: "As senhas devem ser iguais",
    });

export type RegisterScheduleFormData = z.infer<
  ReturnType<typeof registerSchema>
>;
