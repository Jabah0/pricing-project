"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contract = exports.UserSchema = exports.CredentialSchema = exports.MedServiceSchema = void 0;
var core_1 = require("@ts-rest/core");
var zod_1 = require("zod");
var c = (0, core_1.initContract)();
exports.MedServiceSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    code: zod_1.z.string(),
    dalilName: zod_1.z.string(),
    nationalCode: zod_1.z.string(),
    price: zod_1.z.number(),
    numberOfPricing: zod_1.z.number().default(0),
    unitSize: zod_1.z.number(),
});
exports.CredentialSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.number(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    createDate: zod_1.z.date(),
    updatedDate: zod_1.z.date(),
    lastLogin: zod_1.z.date(),
    hashRefreshToken: zod_1.z.string(),
});
exports.contract = c.router({
    medServices: {
        create: {
            method: "POST",
            path: "/med-services",
            body: exports.MedServiceSchema,
            responses: {
                201: exports.MedServiceSchema,
            },
        },
        getAll: {
            method: "GET",
            path: "/med-services",
            query: zod_1.z.object({
                name: zod_1.z.string().optional(),
                code: zod_1.z.string().optional(),
                dalilCode: zod_1.z.string().optional(),
            }),
            responses: {
                200: exports.MedServiceSchema.array(),
            },
        },
        getOne: {
            method: "GET",
            path: "/med-services/:id",
            pathParams: zod_1.z.object({
                id: zod_1.z.coerce.string(),
            }),
            responses: {
                200: exports.MedServiceSchema,
                404: zod_1.z.object({
                    message: zod_1.z.string(),
                }),
            },
        },
        remove: {
            method: "DELETE",
            path: "/med-services/:id",
            pathParams: zod_1.z.object({
                id: zod_1.z.coerce.string(),
            }),
            body: zod_1.z.any(),
            responses: {
                204: zod_1.z.object({
                    message: zod_1.z.string(),
                }),
                404: zod_1.z.object({
                    message: zod_1.z.string(),
                }),
            },
        },
        patchOne: {
            method: "PATCH",
            path: "/med-services/:id",
            pathParams: zod_1.z.object({
                id: zod_1.z.coerce.string(),
            }),
            body: zod_1.z.object({
                price: zod_1.z.number().optional(),
                unitSize: zod_1.z.number().optional(),
            }),
            responses: {
                200: zod_1.z.object({
                    message: zod_1.z.string(),
                }),
                404: zod_1.z.object({
                    message: zod_1.z.string(),
                }),
            },
        },
    },
    auth: {
        login: {
            method: "POST",
            path: "/auth/login",
            body: exports.CredentialSchema,
            responses: {
                200: zod_1.z.string(),
            },
        },
        logout: {
            method: "POST",
            path: "/auth/logout",
            body: zod_1.z.any(),
            responses: {
                200: zod_1.z.string(),
            },
        },
        isAuthenticated: {
            method: "GET",
            path: "/auth/is_authenticated",
            responses: {
                200: zod_1.z.string(),
            },
        },
        refresh: {
            method: "GET",
            path: "/auth/refresh",
            responses: {
                200: zod_1.z.string(),
            },
        },
    },
    users: {
        getAll: {
            method: "GET",
            path: "/users",
            responses: {
                200: exports.UserSchema.omit({ password: true }).array(),
            },
        },
        getOne: {
            method: "GET",
            path: "/users/:id",
            pathParams: zod_1.z.object({
                id: zod_1.z.coerce.number(),
            }),
            responses: {
                200: exports.UserSchema.omit({ password: true }),
                404: zod_1.z.object({
                    message: zod_1.z.string(),
                }),
            },
        },
        create: {
            method: "POST",
            path: "/users",
            body: zod_1.z.object({ username: zod_1.z.string(), password: zod_1.z.string() }),
            responses: {
                201: exports.UserSchema.omit({ password: true }),
            },
        },
    },
}, { pathPrefix: "/api", strictStatusCodes: true });
