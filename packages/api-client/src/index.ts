import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const MedServiceSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  dalilName: z.string(),
  nationalCode: z.string(),
  price: z.number(),
  unitSize: z.number(),
});

export type MedService = z.infer<typeof MedServiceSchema>;

export const CredentialSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type Credential = z.infer<typeof CredentialSchema>;

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  password: z.string(),
  createDate: z.date(),
  updatedDate: z.date(),
  lastLogin: z.date(),
  hashRefreshToken: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const contract = c.router(
  {
    medServices: {
      create: {
        method: "POST",
        path: "/med-services",
        body: MedServiceSchema,
        responses: {
          201: MedServiceSchema,
        },
      },

      getAll: {
        method: "GET",
        path: "/med-services",
        responses: {
          200: MedServiceSchema.array(),
        },
      },

      getOne: {
        method: "GET",
        path: "/med-services/:id",
        pathParams: z.object({
          id: z.coerce.string(),
        }),
        responses: {
          200: MedServiceSchema,
          404: z.object({
            message: z.string(),
          }),
        },
      },

      remove: {
        method: "DELETE",
        path: "/med-services/:id",
        pathParams: z.object({
          id: z.coerce.string(),
        }),
        body: z.any(),
        responses: {
          204: z.object({}),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    auth: {
      login: {
        method: "POST",
        path: "/auth/login",
        body: CredentialSchema,
        responses: {
          200: z.string(),
        },
      },
      logout: {
        method: "POST",
        path: "/auth/logout",
        body: z.any(),
        responses: {
          200: z.string(),
        },
      },
      isAuthenticated: {
        method: "GET",
        path: "/auth/is_authenticated",
        responses: {
          200: z.string(),
        },
      },
      refresh: {
        method: "GET",
        path: "/auth/refresh",
        responses: {
          200: z.string(),
        },
      },
    },

    users: {
      getAll: {
        method: "GET",
        path: "/users",
        responses: {
          200: UserSchema.omit({ id: true }).array(),
        },
      },
      getOne: {
        method: "GET",
        path: "/users/:id",
        pathParams: z.object({
          id: z.coerce.number(),
        }),
        responses: {
          200: UserSchema.omit({ id: true, password: true }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
      create: {
        method: "POST",
        path: "/users",
        body: z.object({ username: z.string(), password: z.string() }),
        responses: {
          201: UserSchema.omit({ id: true }),
        },
      },
    },
  },
  { pathPrefix: "/api", strictStatusCodes: true }
);
