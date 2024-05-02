import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const ROLES = ["ADMIN", "USER"] as const;

export const RolesSchema = z.enum(ROLES);

export type Roles = z.infer<typeof RolesSchema>;

export type Credential = z.infer<typeof CredentialSchema>;

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  fullName: z.string(),
  role: RolesSchema,
  password: z.string(),
  createDate: z.date(),
  updatedDate: z.date(),
  lastLogin: z.date(),
  hashRefreshToken: z.string(),
});

const UserWithoutPasswordSchema = UserSchema.omit({ password: true });

export type User = z.infer<typeof UserWithoutPasswordSchema>;

export const MedServiceSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  dalilName: z.string(),
  nationalCode: z.string(),
  price: z.number(),
  numberOfPricing: z.number().default(0),
  unitSize: z.number(),
});

export type MedService = z.infer<typeof MedServiceSchema>;

export const CredentialSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const contract = c.router(
  {
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
      whoAmI: {
        method: "GET",
        path: "/auth/whoAmI",
        responses: {
          200: z.object({
            username: z.string(),
            fullName: z.string(),
          }),
        },
      },
    },

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
        query: z.object({
          name: z.string().optional(),
          code: z.string().optional(),
          dalilCode: z.string().optional(),
        }),
        responses: {
          200: MedServiceSchema.array(),
        },
      },

      getAllByUser: {
        method: "GET",
        path: "/med-services/user",
        query: z.object({
          name: z.string().optional(),
          code: z.string().optional(),
          dalilCode: z.string().optional(),
        }),
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
          204: z.object({
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },

      patchOne: {
        method: "PATCH",
        path: "/med-services/:id",
        pathParams: z.object({
          id: z.coerce.string(),
        }),
        body: z.object({
          price: z.number().optional(),
          unitSize: z.number().optional(),
        }),
        responses: {
          200: z.object({
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },

    users: {
      getAll: {
        method: "GET",
        path: "/users",
        responses: {
          200: UserSchema.omit({ password: true }).array(),
        },
      },
      getOne: {
        method: "GET",
        path: "/users/:id",
        pathParams: z.object({
          id: z.coerce.number(),
        }),
        responses: {
          200: UserSchema.omit({ password: true }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
      create: {
        method: "POST",
        path: "/users",
        body: z.object({
          fullName: z.string(),
          username: z.string(),
          password: z.string(),
        }),
        responses: {
          201: UserSchema.omit({ password: true }),
        },
      },
      patch: {
        method: "PATCH",
        path: "/users/:id",
        pathParams: z.object({
          id: z.coerce.number(),
        }),
        body: UserSchema.partial().omit({ id: true }),
        responses: {
          200: UserSchema.omit({ password: true }),
        },
      },
    },
  },

  { pathPrefix: "/api", strictStatusCodes: true }
);
