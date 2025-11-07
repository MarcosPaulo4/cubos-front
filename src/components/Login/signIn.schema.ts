import * as z from "zod";

export const schema =() => z.object({
  identifier: z.string({ message: 'Invalid email/name ' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export type ScheduleFormData = z.infer<ReturnType<typeof schema>>
