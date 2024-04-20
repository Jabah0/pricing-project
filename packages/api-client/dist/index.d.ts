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
export declare const CredentialSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type Credential = z.infer<typeof CredentialSchema>;
export declare const UserSchema: z.ZodObject<{
    id: z.ZodNumber;
    username: z.ZodString;
    password: z.ZodString;
    createDate: z.ZodDate;
    updatedDate: z.ZodDate;
    lastLogin: z.ZodDate;
    hashRefreshToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    username: string;
    password: string;
    createDate: Date;
    updatedDate: Date;
    lastLogin: Date;
    hashRefreshToken: string;
}, {
    id: number;
    username: string;
    password: string;
    createDate: Date;
    updatedDate: Date;
    lastLogin: Date;
    hashRefreshToken: string;
}>;
export type User = z.infer<typeof UserSchema>;
export declare const contract: {
    medServices: {
        create: {
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
            strictStatusCodes: true;
        };
        getAll: {
            query: z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                code: z.ZodOptional<z.ZodString>;
                dalilCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                name?: string | undefined;
                code?: string | undefined;
                dalilCode?: string | undefined;
            }, {
                name?: string | undefined;
                code?: string | undefined;
                dalilCode?: string | undefined;
            }>;
            method: "GET";
            path: "/api/med-services";
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
            method: "GET";
            path: "/api/med-services/:id";
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
            method: "DELETE";
            body: z.ZodAny;
            path: "/api/med-services/:id";
            responses: {
                204: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
                404: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
            strictStatusCodes: true;
        };
        patchOne: {
            pathParams: z.ZodObject<{
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
            }, {
                id: string;
            }>;
            method: "PATCH";
            body: z.ZodObject<{
                price: z.ZodOptional<z.ZodNumber>;
                unitSize: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                price?: number | undefined;
                unitSize?: number | undefined;
            }, {
                price?: number | undefined;
                unitSize?: number | undefined;
            }>;
            path: "/api/med-services/:id";
            responses: {
                200: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
                404: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
            strictStatusCodes: true;
        };
    };
    auth: {
        login: {
            method: "POST";
            body: z.ZodObject<{
                username: z.ZodString;
                password: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                username: string;
                password: string;
            }, {
                username: string;
                password: string;
            }>;
            path: "/api/auth/login";
            responses: {
                200: z.ZodString;
            };
            strictStatusCodes: true;
        };
        logout: {
            method: "POST";
            body: z.ZodAny;
            path: "/api/auth/logout";
            responses: {
                200: z.ZodString;
            };
            strictStatusCodes: true;
        };
        isAuthenticated: {
            method: "GET";
            path: "/api/auth/is_authenticated";
            responses: {
                200: z.ZodString;
            };
            strictStatusCodes: true;
        };
        refresh: {
            method: "GET";
            path: "/api/auth/refresh";
            responses: {
                200: z.ZodString;
            };
            strictStatusCodes: true;
        };
    };
    users: {
        getAll: {
            method: "GET";
            path: "/api/users";
            responses: {
                200: z.ZodArray<z.ZodObject<Omit<{
                    id: z.ZodNumber;
                    username: z.ZodString;
                    password: z.ZodString;
                    createDate: z.ZodDate;
                    updatedDate: z.ZodDate;
                    lastLogin: z.ZodDate;
                    hashRefreshToken: z.ZodString;
                }, "password">, "strip", z.ZodTypeAny, {
                    id: number;
                    username: string;
                    createDate: Date;
                    updatedDate: Date;
                    lastLogin: Date;
                    hashRefreshToken: string;
                }, {
                    id: number;
                    username: string;
                    createDate: Date;
                    updatedDate: Date;
                    lastLogin: Date;
                    hashRefreshToken: string;
                }>, "many">;
            };
            strictStatusCodes: true;
        };
        getOne: {
            pathParams: z.ZodObject<{
                id: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            method: "GET";
            path: "/api/users/:id";
            responses: {
                200: z.ZodObject<Omit<{
                    id: z.ZodNumber;
                    username: z.ZodString;
                    password: z.ZodString;
                    createDate: z.ZodDate;
                    updatedDate: z.ZodDate;
                    lastLogin: z.ZodDate;
                    hashRefreshToken: z.ZodString;
                }, "password">, "strip", z.ZodTypeAny, {
                    id: number;
                    username: string;
                    createDate: Date;
                    updatedDate: Date;
                    lastLogin: Date;
                    hashRefreshToken: string;
                }, {
                    id: number;
                    username: string;
                    createDate: Date;
                    updatedDate: Date;
                    lastLogin: Date;
                    hashRefreshToken: string;
                }>;
                404: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
            strictStatusCodes: true;
        };
        create: {
            method: "POST";
            body: z.ZodObject<{
                username: z.ZodString;
                password: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                username: string;
                password: string;
            }, {
                username: string;
                password: string;
            }>;
            path: "/api/users";
            responses: {
                201: z.ZodObject<Omit<{
                    id: z.ZodNumber;
                    username: z.ZodString;
                    password: z.ZodString;
                    createDate: z.ZodDate;
                    updatedDate: z.ZodDate;
                    lastLogin: z.ZodDate;
                    hashRefreshToken: z.ZodString;
                }, "password">, "strip", z.ZodTypeAny, {
                    id: number;
                    username: string;
                    createDate: Date;
                    updatedDate: Date;
                    lastLogin: Date;
                    hashRefreshToken: string;
                }, {
                    id: number;
                    username: string;
                    createDate: Date;
                    updatedDate: Date;
                    lastLogin: Date;
                    hashRefreshToken: string;
                }>;
            };
            strictStatusCodes: true;
        };
    };
};
