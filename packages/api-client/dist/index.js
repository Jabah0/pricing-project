"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contract = exports.CredentialSchema = exports.MedServiceSchema = exports.UserSchema = exports.RolesSchema = void 0;
var core_1 = require("@ts-rest/core");
var zod_1 = require("zod");
var c = (0, core_1.initContract)();
var ROLES = ["ADMIN", "USER"];
exports.RolesSchema = zod_1.z.enum(ROLES);
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.number(),
    username: zod_1.z.string(),
    fullName: zod_1.z.string(),
    role: exports.RolesSchema,
    password: zod_1.z.string(),
    createDate: zod_1.z.date().optional(),
    updatedDate: zod_1.z.date().optional(),
    lastLogin: zod_1.z.date().optional(),
    hashRefreshToken: zod_1.z.string().optional(),
});
var UserWithoutPasswordSchema = exports.UserSchema.omit({ password: true });
exports.MedServiceSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    code: zod_1.z.string(),
    dalilCode: zod_1.z.string(),
    nationalCode: zod_1.z.string(),
    price: zod_1.z.number(),
    numberOfPricing: zod_1.z.number().default(0),
    limitNumberOfPricing: zod_1.z.number().default(0),
    unitSize: zod_1.z.number(),
});
exports.CredentialSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.contract = c.router({
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
        whoAmI: {
            method: "GET",
            path: "/auth/whoAmI",
            responses: {
                200: zod_1.z.object({
                    username: zod_1.z.string(),
                    fullName: zod_1.z.string(),
                    role: zod_1.z.string(),
                }),
            },
        },
        updateMyPassword: {
            method: "PATCH",
            path: "/update-password",
            body: zod_1.z.object({ oldPassword: zod_1.z.string(), newPassword: zod_1.z.string() }),
            responses: {
                200: zod_1.z.object({ message: zod_1.z.string() }),
                401: zod_1.z.object({ message: zod_1.z.string() }),
            },
        },
    },
    users: {
        getAll: {
            method: "GET",
            path: "/users",
            query: zod_1.z.object({
                role: exports.RolesSchema.optional(),
                username: zod_1.z.string().optional(),
                fullName: zod_1.z.string().optional(),
                page: zod_1.z.coerce.number().optional(),
                perPage: zod_1.z.coerce.number().optional(),
            }),
            responses: {
                200: zod_1.z.object({
                    data: exports.UserSchema.omit({ password: true }).array(),
                    meta: zod_1.z.object({
                        total: zod_1.z.number(),
                        lastPage: zod_1.z.number(),
                        currentPage: zod_1.z.number(),
                        perPage: zod_1.z.number(),
                        prev: zod_1.z.number().nullable(),
                        next: zod_1.z.number().nullable(),
                    }),
                }),
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
            body: zod_1.z.object({
                fullName: zod_1.z.string(),
                username: zod_1.z.string(),
                password: zod_1.z.string(),
                role: exports.RolesSchema,
            }),
            responses: {
                201: exports.UserSchema.omit({ password: true }),
            },
        },
        patch: {
            method: "PATCH",
            path: "/users/:id",
            pathParams: zod_1.z.object({
                id: zod_1.z.coerce.number(),
            }),
            body: exports.UserSchema.partial().omit({ id: true }),
            responses: {
                200: exports.UserSchema.omit({ password: true }),
            },
        },
        servicesStatus: {
            method: "GET",
            path: "/user-status",
            responses: {
                200: zod_1.z.object({
                    pricedServices: zod_1.z.number(),
                    totalServices: zod_1.z.number(),
                }),
            },
        },
    },
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
                nationalCode: zod_1.z.string().optional(),
                orderBy: zod_1.z.string().optional(),
                orderDirection: zod_1.z.string().optional(),
                page: zod_1.z.coerce.number().default(1),
                perPage: zod_1.z.coerce.number().optional(),
                price: zod_1.z
                    .object({
                    equals: zod_1.z.coerce.number().optional(),
                    not: zod_1.z.coerce.number().optional(),
                    gt: zod_1.z.coerce.number().optional(),
                    gte: zod_1.z.coerce.number().optional(),
                    lt: zod_1.z.coerce.number().optional(),
                    lte: zod_1.z.coerce.number().optional(),
                })
                    .optional(),
                unitSize: zod_1.z
                    .object({
                    equals: zod_1.z.coerce.number().optional(),
                    not: zod_1.z.coerce.number().optional(),
                    gt: zod_1.z.coerce.number().optional(),
                    gte: zod_1.z.coerce.number().optional(),
                    lt: zod_1.z.coerce.number().optional(),
                    lte: zod_1.z.coerce.number().optional(),
                })
                    .optional(),
            }),
            responses: {
                200: zod_1.z.object({
                    data: exports.MedServiceSchema.array(),
                    meta: zod_1.z.object({
                        total: zod_1.z.number(),
                        lastPage: zod_1.z.number(),
                        currentPage: zod_1.z.number(),
                        perPage: zod_1.z.number(),
                        prev: zod_1.z.number().nullable(),
                        next: zod_1.z.number().nullable(),
                    }),
                }),
            },
        },
        getAllByUser: {
            method: "GET",
            path: "/med-services/user",
            query: zod_1.z.object({
                name: zod_1.z.string().optional(),
                code: zod_1.z.string().optional(),
                dalilCode: zod_1.z.string().optional(),
                nationalCode: zod_1.z.string().optional(),
                orderBy: zod_1.z.string().optional(),
                orderDirection: zod_1.z.string().optional(),
                page: zod_1.z.coerce.number().default(1),
                perPage: zod_1.z.coerce.number().optional(),
                price: zod_1.z
                    .object({
                    equals: zod_1.z.coerce.number().optional(),
                    not: zod_1.z.coerce.number().optional(),
                    gt: zod_1.z.coerce.number().optional(),
                    gte: zod_1.z.coerce.number().optional(),
                    lt: zod_1.z.coerce.number().optional(),
                    lte: zod_1.z.coerce.number().optional(),
                })
                    .optional(),
                unitSize: zod_1.z
                    .object({
                    equals: zod_1.z.coerce.number().optional(),
                    not: zod_1.z.coerce.number().optional(),
                    gt: zod_1.z.coerce.number().optional(),
                    gte: zod_1.z.coerce.number().optional(),
                    lt: zod_1.z.coerce.number().optional(),
                    lte: zod_1.z.coerce.number().optional(),
                })
                    .optional(),
            }),
            responses: {
                200: zod_1.z.object({
                    data: exports.MedServiceSchema.array(),
                    meta: zod_1.z.object({
                        total: zod_1.z.number(),
                        lastPage: zod_1.z.number(),
                        currentPage: zod_1.z.number(),
                        perPage: zod_1.z.number(),
                        prev: zod_1.z.number().nullable(),
                        next: zod_1.z.number().nullable(),
                    }),
                }),
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
        numberOfPricing: {
            method: "GET",
            path: "/med-services/number-of-pricing",
            responses: {
                200: zod_1.z.number(),
            },
        },
        updateNumberOfPricing: {
            method: "PATCH",
            path: "/med-services-update-number-of-pricing",
            body: zod_1.z.object({ limit: zod_1.z.number() }),
            responses: { 200: zod_1.z.object({ message: zod_1.z.string() }) },
        },
    },
}, { pathPrefix: "/api", strictStatusCodes: true });
