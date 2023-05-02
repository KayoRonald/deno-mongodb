import { z } from "../../deps.ts";

export const createSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    status: z.boolean(),
  }),
});

const params = {
  params: z.object({
    userId: z.string(),
  }),
};

export const getIdSchema = z.object({
  ...params,
});

export const updateUserSchema = z.object({
  ...params,
  body: z
    .object({
      name: z.string(),
      email: z.string(),
      status: z.string(),
    })
    .partial(),
});

export type createSchemaInput = z.TypeOf<typeof createSchema>["body"];
export type getIdSchema = z.TypeOf<typeof getIdSchema>["params"];
