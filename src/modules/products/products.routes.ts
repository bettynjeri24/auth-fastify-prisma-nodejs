import { FastifyInstance } from "fastify";
import { createProductHandler } from "./products.controller";
import { $ref } from "./products.schema";

async function productRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref("createProductRequestSchema"),
        response: {
            201:$ref("productResponseSchema"),
        }
      }
    },
    createProductHandler
  );
}

export default productRoutes
