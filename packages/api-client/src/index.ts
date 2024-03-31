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
    auth: {},
  },
  { pathPrefix: "/api", strictStatusCodes: true }
);
