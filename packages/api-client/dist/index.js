"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contract = exports.TodoSchema = void 0;
var core_1 = require("@ts-rest/core");
var zod_1 = require("zod");
var c = (0, core_1.initContract)();
exports.TodoSchema = zod_1.z.object({
    id: zod_1.z.number(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
});
exports.contract = c.router({
    todos: {
        create: {
            method: "POST",
            path: "/todos",
            body: exports.TodoSchema.omit({ id: true }),
            responses: {
                201: exports.TodoSchema,
            },
        },
        getAll: {
            method: "GET",
            path: "/todos",
            query: zod_1.z.object({
                title: zod_1.z.string().optional(),
            }),
            responses: {
                200: exports.TodoSchema.array(),
            },
        },
        getOne: {
            method: "GET",
            path: "/todos/:id",
            pathParams: zod_1.z.object({
                id: zod_1.z.coerce.number(),
            }),
            responses: {
                200: exports.TodoSchema,
                404: zod_1.z.object({
                    message: zod_1.z.string(),
                }),
            },
        },
        update: {
            method: "PATCH",
            path: "/todos/:id",
            pathParams: zod_1.z.object({
                id: zod_1.z.coerce.number(),
            }),
            body: exports.TodoSchema.omit({ id: true }).partial(),
            responses: {
                200: exports.TodoSchema,
                404: zod_1.z.object({
                    message: zod_1.z.string(),
                }),
            },
        },
        remove: {
            method: "DELETE",
            path: "/todos/:id",
            pathParams: zod_1.z.object({
                id: zod_1.z.coerce.number(),
            }),
            body: zod_1.z.any(),
            responses: {
                204: zod_1.z.object({}),
                404: zod_1.z.object({
                    message: zod_1.z.string(),
                }),
            },
        },
    },
}, { pathPrefix: "/api", strictStatusCodes: true });
