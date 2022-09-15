import { FastifyReply, FastifyRequest } from "fastify";
import { server } from "../../app";
import { verifyPassword } from "../../utils/hash";
import { createUserInput, loginUserInput } from "./user.schema";
import { createUser, findUserByPhoneNumber ,findUsers} from "./user.service";

export async function registerUserHandler(
  request: FastifyRequest<{ Body: createUserInput }>,
  reply: FastifyReply
) {
  const body = request.body;

  console.log({ body: body });

  try {
    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (error) {
    console.log(error);
    return reply.code(500).send(error);
  }
}

//Login

export async function loginUserHandler(
  request: FastifyRequest<{ Body: loginUserInput }>,
  reply: FastifyReply
) {
  const body = request.body;

  console.log({ body: body });
  //find user by email address
  const user = await findUserByPhoneNumber(body.phonenumber);
  if (!user) {
    return reply.code(401).send({
      message: "Invalid phone number or password",
    });
  }

  //verify password
  const correctPassword = verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password,
  });

  if (correctPassword) {
    const { password, salt, ...rest } = user;

    //generate accessToken and respond
    return { accessToken: server.jwt.sign(rest) };
  }
  return reply.code(401).send({
    message: "Invalid phone number or password",
  });
}

export async function getUserHandler(){
  const users =await findUsers();

  return users;
}
