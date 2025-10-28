import type { Resolver } from "./react-hook-form";
import { type ZodSchema } from "./zod";

export const zodResolver = <T>(schema: ZodSchema<T>): Resolver<T> => {
  return async (values: T) => {
    const result = schema.safeParse(values);
    if (result.success) {
      return { values: result.data, errors: {} };
    }
    const errors: Record<string, { message: string }> = {};
    result.errors.forEach((issue) => {
      if (issue.path) {
        errors[issue.path] = { message: issue.message };
      }
    });
    return { values, errors };
  };
};
