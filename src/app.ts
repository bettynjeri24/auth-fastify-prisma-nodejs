require('dotenv').config();
import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import fjwt from "@fastify/jwt";
import userRoutes from "./modules/user/user.routes";
import { userSchemas } from "./modules/user/user.schema";
// server
export const server = Fastify();

//
declare module "fastify" {
  export interface FastifyInstance {
    authenticate:any;
  }
}
//
server.register(fjwt,
  {
    secret: "process.env.JWT_SECRET",
  });
//
server.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      return reply.send(error);
    }
  }
);

// Test APi
server.get("/api", async function (req, res) {
  return { status: 200, body: "Daiel" };
});

async function main() {
  //this is to add schema validation for our responses and requests
  //and alos whitelist the files that we need to view in response
  for (const schema of userSchemas) {
    server.addSchema(schema);
  }
  //This is to add a route for our user routes
  server.register(userRoutes, { prefix: "api/user" });

  //this is how fastify is started
  try {
    await server.listen(3000, "0.0.0.0");
    console.log("Server listening on host http://localhost:3000 on port 3000");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
