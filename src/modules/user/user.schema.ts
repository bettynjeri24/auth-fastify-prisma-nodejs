import { z } from "zod";

import {buildJsonSchemas} from"fastify-zod";

const userCoreData = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email is not valid or must be a valid email address",
    })
    .email(),
  name: z.string(),
};
const createUserSchema = z.object({
  ...userCoreData,
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a valid length",
  }),
});

const createUserResponseSchema = z.object({
    id: z.number(),
  ...userCoreData,
});

export type createUserInput = z.infer<typeof createUserSchema>;

export const {schemas:userSchemas,$ref}=buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema,
})
