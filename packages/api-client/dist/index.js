"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contract = exports.MedServiceSchema = void 0;
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
    unitSize: zod_1.z.number(),
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
                204: zod_1.z.object({}),
                404: zod_1.z.object({
                    message: zod_1.z.string(),
                }),
            },
        },
    },
}, { pathPrefix: "/api", strictStatusCodes: true });
