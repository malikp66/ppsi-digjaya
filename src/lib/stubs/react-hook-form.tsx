"use client";

import React from "react";

export type FieldValues = Record<string, unknown>;

export type ResolverResult<TFieldValues extends FieldValues> = {
  values: TFieldValues;
  errors: Record<string, { message: string }>;
};

export type Resolver<TFieldValues extends FieldValues> = (
  values: TFieldValues,
) => Promise<ResolverResult<TFieldValues>>;

export type UseFormOptions<TFieldValues extends FieldValues> = {
  defaultValues?: Partial<TFieldValues>;
  resolver?: Resolver<TFieldValues>;
};

export type UseFormReturn<TFieldValues extends FieldValues> = {
  register: (
    name: keyof TFieldValues & string,
    options?: { required?: string },
  ) => {
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value: unknown;
  };
  handleSubmit: (
    callback: (values: TFieldValues) => void | Promise<void>,
  ) => (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  formState: {
    errors: Record<string, { message: string }>;
    isSubmitting: boolean;
  };
  watch: () => TFieldValues;
  reset: (values?: Partial<TFieldValues>) => void;
  setValue: (name: keyof TFieldValues & string, value: unknown) => void;
  control: null;
};

export function useForm<TFieldValues extends FieldValues = FieldValues>(
  options: UseFormOptions<TFieldValues> = {},
): UseFormReturn<TFieldValues> {
  const [values, setValues] = React.useState<TFieldValues>(
    (options.defaultValues || {}) as TFieldValues,
  );
  const [errors, setErrors] = React.useState<Record<string, { message: string }>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const register = React.useCallback(
    (name: keyof TFieldValues & string) => ({
      name,
      value: values?.[name] ?? "",
      onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        const newValue = (event.target.value ?? "") as unknown as TFieldValues[typeof name];
        setValues((prev) => ({ ...prev, [name]: newValue }));
      },
    }),
    [values],
  );

  const setValue = React.useCallback(
    (name: keyof TFieldValues & string, value: unknown) => {
      setValues((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleSubmit = React.useCallback(
    (callback: (vals: TFieldValues) => void | Promise<void>) => async (
      event: React.FormEvent<HTMLFormElement>,
    ) => {
      event.preventDefault();
      setIsSubmitting(true);
      setErrors({});
      const resolver = options.resolver;
      let result: ResolverResult<TFieldValues> | null = null;
      if (resolver) {
        result = await resolver(values);
      }
      if (!result || Object.keys(result.errors).length === 0) {
        await callback(values);
      } else {
        setErrors(result.errors);
      }
      setIsSubmitting(false);
    },
    [options.resolver, values],
  );

  const reset = React.useCallback((vals?: Partial<TFieldValues>) => {
    setValues((vals as TFieldValues) || ((options.defaultValues || {}) as TFieldValues));
    setErrors({});
  }, [options.defaultValues]);

  return {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
    watch: () => values,
    reset,
    setValue,
    control: null,
  };
}

export const FormProvider = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
