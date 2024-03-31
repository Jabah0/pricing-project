import { z } from "zod";
export declare const MedServiceSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    code: z.ZodString;
    dalilName: z.ZodString;
    nationalCode: z.ZodString;
    price: z.ZodNumber;
    unitSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    code: string;
    dalilName: string;
    nationalCode: string;
    price: number;
    unitSize: number;
}, {
    id: string;
    name: string;
    code: string;
    dalilName: string;
    nationalCode: string;
    price: number;
    unitSize: number;
}>;
export type MedService = z.infer<typeof MedServiceSchema>;
export declare const contract: {
    medServices: {
        create: {
            responses: {
                201: z.ZodObject<{
                    id: z.ZodString;
                    name: z.ZodString;
                    code: z.ZodString;
                    dalilName: z.ZodString;
                    nationalCode: z.ZodString;
                    price: z.ZodNumber;
                    unitSize: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    name: string;
                    code: string;
                    dalilName: string;
                    nationalCode: string;
                    price: number;
                    unitSize: number;
                }, {
                    id: string;
                    name: string;
                    code: string;
                    dalilName: string;
                    nationalCode: string;
                    price: number;
                    unitSize: number;
                }>;
            };
            method: "POST";
            body: z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
                code: z.ZodString;
                dalilName: z.ZodString;
                nationalCode: z.ZodString;
                price: z.ZodNumber;
                unitSize: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                id: string;
                name: string;
                code: string;
                dalilName: string;
                nationalCode: string;
                price: number;
                unitSize: number;
            }, {
                id: string;
                name: string;
                code: string;
                dalilName: string;
                nationalCode: string;
                price: number;
                unitSize: number;
            }>;
            path: "/api/med-services";
            strictStatusCodes: true;
        };
        getAll: {
            responses: {
                200: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    name: z.ZodString;
                    code: z.ZodString;
                    dalilName: z.ZodString;
                    nationalCode: z.ZodString;
                    price: z.ZodNumber;
                    unitSize: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    name: string;
                    code: string;
                    dalilName: string;
                    nationalCode: string;
                    price: number;
                    unitSize: number;
                }, {
                    id: string;
                    name: string;
                    code: string;
                    dalilName: string;
                    nationalCode: string;
                    price: number;
                    unitSize: number;
                }>, "many">;
            };
            method: "GET";
            path: "/api/med-services";
            strictStatusCodes: true;
        };
        getOne: {
            pathParams: z.ZodObject<{
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
            }, {
                id: string;
            }>;
            responses: {
                200: z.ZodObject<{
                    id: z.ZodString;
                    name: z.ZodString;
                    code: z.ZodString;
                    dalilName: z.ZodString;
                    nationalCode: z.ZodString;
                    price: z.ZodNumber;
                    unitSize: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    name: string;
                    code: string;
                    dalilName: string;
                    nationalCode: string;
                    price: number;
                    unitSize: number;
                }, {
                    id: string;
                    name: string;
                    code: string;
                    dalilName: string;
                    nationalCode: string;
                    price: number;
                    unitSize: number;
                }>;
                404: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
            method: "GET";
            path: "/api/med-services/:id";
            strictStatusCodes: true;
        };
        remove: {
            pathParams: z.ZodObject<{
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
            }, {
                id: string;
            }>;
            responses: {
                204: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
                404: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
            method: "DELETE";
            body: z.ZodAny;
            path: "/api/med-services/:id";
            strictStatusCodes: true;
        };
    };
};
