import { z } from "zod";

import { buildJsonSchemas } from "fastify-zod";

// Defaults user data
const userCoreData = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email is not valid or must be a valid email address",
    })
    .email(),
  phonenumber: z.string(),
  name: z.string(),
};

//when createing user
const createUserSchema = z.object({
  ...userCoreData,
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a valid length",
  }),
});

// data to be shown responses
const createUserResponseSchema = z.object({
  id: z.number(),
  ...userCoreData,
});

//Request 
const loginUserSchema = z.object({
  phonenumber: z.string(),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a valid length",
  }),
});

//Response 
const loginUserResponseSchema = z.object({  
accessToken: z.string()
})

export type createUserInput = z.infer<typeof createUserSchema>;
export type loginUserInput = z.infer<typeof loginUserSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginUserSchema,
  loginUserResponseSchema
});
