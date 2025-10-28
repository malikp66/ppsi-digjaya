export type ZodIssue = {
  path: string;
  message: string;
};

export type SafeParseSuccess<T> = {
  success: true;
  data: T;
};

export type SafeParseError = {
  success: false;
  errors: ZodIssue[];
};

export type SafeParseReturn<T> = SafeParseSuccess<T> | SafeParseError;

export interface ZodSchema<T> {
  parse: (input: unknown) => T;
  safeParse: (input: unknown) => SafeParseReturn<T>;
}

class BaseSchema<T> implements ZodSchema<T> {
  protected validators: ((value: T) => string | null)[] = [];
  constructor(protected readonly parser: (input: unknown) => T) {}

  parse(input: unknown): T {
    const value = this.parser(input);
    const issues = this.validators
      .map((validator) => validator(value))
      .filter((issue): issue is string => Boolean(issue));
    if (issues.length) {
      throw new Error(issues[0] ?? "Validation error");
    }
    return value;
  }

  safeParse(input: unknown): SafeParseReturn<T> {
    try {
      const data = this.parse(input);
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        errors: [
          {
            path: "",
            message: error instanceof Error ? error.message : String(error),
          },
        ],
      };
    }
  }
}

class ZodString extends BaseSchema<string> {
  constructor() {
    super((input) => {
      if (typeof input !== "string") {
        throw new Error("Expected string");
      }
      return input;
    });
  }

  min(length: number, message = `Minimal ${length} karakter`) {
    this.validators.push((value) =>
      value.length >= length ? null : message,
    );
    return this;
  }

  max(length: number, message = `Maksimal ${length} karakter`) {
    this.validators.push((value) =>
      value.length <= length ? null : message,
    );
    return this;
  }

  email(message = "Email tidak valid") {
    const regex = /.+@.+\..+/;
    this.validators.push((value) => (regex.test(value) ? null : message));
    return this;
  }

  nonempty(message = "Kolom wajib diisi") {
    this.validators.push((value) =>
      value.trim().length > 0 ? null : message,
    );
    return this;
  }

  optional() {
    const optionalSchema = new ZodOptional(this);
    return optionalSchema;
  }
}

class ZodNumber extends BaseSchema<number> {
  constructor() {
    super((input) => {
      const value = Number(input);
      if (Number.isNaN(value)) {
        throw new Error("Expected number");
      }
      return value;
    });
  }

  min(num: number, message = `Minimal ${num}`) {
    this.validators.push((value) => (value >= num ? null : message));
    return this;
  }
}

class ZodEnum<T extends [string, ...string[]]> extends BaseSchema<T[number]> {
  constructor(private readonly values: T) {
    super((input) => {
      if (!values.includes(String(input))) {
        throw new Error(`Nilai harus salah satu dari ${values.join(", ")}`);
      }
      return String(input) as T[number];
    });
  }
}

class ZodOptional<T> extends BaseSchema<T | undefined> {
  constructor(private readonly inner: ZodSchema<T>) {
    super((input) => {
      if (input === undefined || input === null || input === "") {
        return undefined;
      }
      return inner.parse(input);
    });
  }

  safeParse(input: unknown): SafeParseReturn<T | undefined> {
    if (input === undefined || input === null || input === "") {
      return { success: true, data: undefined };
    }
    return this.inner.safeParse(input as T);
  }
}

class ZodArray<T> extends BaseSchema<T[]> {
  constructor(private readonly inner: ZodSchema<T>) {
    super((input) => {
      if (!Array.isArray(input)) {
        throw new Error("Expected array");
      }
      return input.map((item) => inner.parse(item));
    });
  }
}

class ZodObject<T extends Record<string, ZodSchema<any>>> extends BaseSchema<{
  [K in keyof T]: T[K] extends ZodSchema<infer U> ? U : never;
}> {
  constructor(private readonly shape: T) {
    super((input) => {
      if (typeof input !== "object" || input === null) {
        throw new Error("Expected object");
      }
      const record = input as Record<string, unknown>;
      const result: Record<string, unknown> = {};
      const issues: ZodIssue[] = [];
      for (const key of Object.keys(shape)) {
        const schema = shape[key];
        const value = record[key];
        const parsed = schema.safeParse(value);
        if (parsed.success) {
          result[key] = parsed.data;
        } else {
          parsed.errors.forEach((issue) =>
            issues.push({
              path: issue.path ? `${key}.${issue.path}` : key,
              message: issue.message,
            }),
          );
        }
      }
      if (issues.length) {
        throw new Error(issues[0]?.message ?? "Invalid input");
      }
      return result as {
        [K in keyof T]: T[K] extends ZodSchema<infer U> ? U : never;
      };
    });
  }

  safeParse(input: unknown): SafeParseReturn<{
    [K in keyof T]: T[K] extends ZodSchema<infer U> ? U : never;
  }> {
    if (typeof input !== "object" || input === null) {
      return {
        success: false,
        errors: [{ path: "", message: "Expected object" }],
      };
    }
    const record = input as Record<string, unknown>;
    const result: Record<string, unknown> = {};
    const issues: ZodIssue[] = [];
    for (const key of Object.keys(this.shape)) {
      const schema = this.shape[key];
      const parsed = schema.safeParse(record[key]);
      if (parsed.success) {
        result[key] = parsed.data;
      } else {
        parsed.errors.forEach((issue) =>
          issues.push({
            path: issue.path ? `${key}.${issue.path}` : key,
            message: issue.message,
          }),
        );
      }
    }
    if (issues.length) {
      return { success: false, errors: issues };
    }
    return { success: true, data: result as any };
  }
}

export const z = {
  string: () => new ZodString(),
  number: () => new ZodNumber(),
  enum: <T extends [string, ...string[]]>(values: T) => new ZodEnum(values),
  array: <T>(schema: ZodSchema<T>) => new ZodArray(schema),
  object: <T extends Record<string, ZodSchema<any>>>(shape: T) =>
    new ZodObject(shape),
};

export type infer<T> = T extends ZodSchema<infer U> ? U : never;

export default z;
