import { z } from "zod";

import { buildJsonSchemas } from "fastify-zod";

// Defaults user data
const productInput = {
  title: z.string(),
  price: z.string(),
  content: z.string(),
};

const productGenerated = {
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
};

const createProductRequestSchema = z.object({
  ...productInput,
});

const productResponseSchema = z.object({
  ...productInput,
  ...productGenerated,
});

const allProductsResponseSchema = z.array(productResponseSchema);

export type CreateProductInput = z.infer<typeof createProductRequestSchema>;

export const { schemas: productSchemas, $ref } = buildJsonSchemas({
  createProductRequestSchema,
  productResponseSchema,
  allProductsResponseSchema,
});
