import { z } from "../../deps.ts";

export const createSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "O título é necessário!",
      description: "Uma string que representa o título do objeto",
      invalid_type_error: "O título deve ser uma string",
    }),
  }),
});

export const getIdSchema = z.object({
  params: z.object({
    id: z.string({
      description: "Error no id",
      required_error: "falta o id meu chapa",
    }),
  }),
});

export type createSchemaInput = z.TypeOf<typeof createSchema>["body"];
export type getIdSchema = z.TypeOf<typeof getIdSchema>["params"];
