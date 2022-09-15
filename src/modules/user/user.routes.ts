import { FastifyInstance } from "fastify";
import {
  registerUserHandler,
  loginUserHandler,
  getUserHandler,
} from "./user.controller";
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance) {
  //Register user
  server.post(
    "/",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: $ref("createUserResponseSchema"),
        },
      },
    },
    registerUserHandler
  );

  //login user
  server.post(
    "/login",
    {
      schema: {
        body: $ref("loginUserSchema"),
        response: {
          200: $ref("loginUserResponseSchema"),
        },
      },
    },
    loginUserHandler
  );

  server.get("/",{
preHandler:[server.authenticate]
  }, getUserHandler);
}

export default userRoutes;
