import { FastifyReply, FastifyRequest } from "fastify";
import { CreateProductInput } from "./products.schema";
import { createProduct } from "./products.services";
export async function createProductHandler(
  request: FastifyRequest<{
    Body: CreateProductInput;
  }>,
) {
  const product = await createProduct({
    ...request.body,
    ownerId: request.user.id,
  });
  return product;
}
