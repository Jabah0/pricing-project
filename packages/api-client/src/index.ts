import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const TodoSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});

export type Todo = z.infer<typeof TodoSchema>;

export const contract = c.router(
  {
    todos: {
      create: {
        method: "POST",
        path: "/todos",
        body: TodoSchema.omit({ id: true }),
        responses: {
          201: TodoSchema,
        },
      },

      getAll: {
        method: "GET",
        path: "/todos",
        query: z.object({
          title: z.string().optional(),
        }),
        responses: {
          200: TodoSchema.array(),
        },
      },

      getOne: {
        method: "GET",
        path: "/todos/:id",
        pathParams: z.object({
          id: z.coerce.number(),
        }),
        responses: {
          200: TodoSchema,
          404: z.object({
            message: z.string(),
          }),
        },
      },

      update: {
        method: "PATCH",
        path: "/todos/:id",
        pathParams: z.object({
          id: z.coerce.number(),
        }),
        body: TodoSchema.omit({ id: true }).partial(),
        responses: {
          200: TodoSchema,
          404: z.object({
            message: z.string(),
          }),
        },
      },

      remove: {
        method: "DELETE",
        path: "/todos/:id",
        pathParams: z.object({
          id: z.coerce.number(),
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
  },
  { pathPrefix: "/api", strictStatusCodes: true }
);
