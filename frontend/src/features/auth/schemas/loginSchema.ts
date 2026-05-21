import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'El nombre de usuario es requerido'),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

// Esto exporta el tipo automáticamente basándose en el esquema anterior
export type LoginFormData = z.infer<typeof loginSchema>;