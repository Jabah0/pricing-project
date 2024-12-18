import { z } from "zod";
export declare const RolesSchema: z.ZodEnum<["ADMIN", "USER"]>;
export type Roles = z.infer<typeof RolesSchema>;
export type Credential = z.infer<typeof CredentialSchema>;
export declare const UserSchema: z.ZodObject<{
    id: z.ZodNumber;
    username: z.ZodString;
    fullName: z.ZodString;
    role: z.ZodEnum<["ADMIN", "USER"]>;
    password: z.ZodString;
    createDate: z.ZodOptional<z.ZodDate>;
    updatedDate: z.ZodOptional<z.ZodDate>;
    lastLogin: z.ZodOptional<z.ZodDate>;
    hashRefreshToken: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    id: number;
    fullName: string;
    role: "ADMIN" | "USER";
    createDate?: Date | undefined;
    updatedDate?: Date | undefined;
    lastLogin?: Date | undefined;
    hashRefreshToken?: string | undefined;
}, {
    username: string;
    password: string;
    id: number;
    fullName: string;
    role: "ADMIN" | "USER";
    createDate?: Date | undefined;
    updatedDate?: Date | undefined;
    lastLogin?: Date | undefined;
    hashRefreshToken?: string | undefined;
}>;
declare const UserWithoutPasswordSchema: z.ZodObject<Omit<{
    id: z.ZodNumber;
    username: z.ZodString;
    fullName: z.ZodString;
    role: z.ZodEnum<["ADMIN", "USER"]>;
    password: z.ZodString;
    createDate: z.ZodOptional<z.ZodDate>;
    updatedDate: z.ZodOptional<z.ZodDate>;
    lastLogin: z.ZodOptional<z.ZodDate>;
    hashRefreshToken: z.ZodOptional<z.ZodString>;
}, "password">, "strip", z.ZodTypeAny, {
    username: string;
    id: number;
    fullName: string;
    role: "ADMIN" | "USER";
    createDate?: Date | undefined;
    updatedDate?: Date | undefined;
    lastLogin?: Date | undefined;
    hashRefreshToken?: string | undefined;
}, {
    username: string;
    id: number;
    fullName: string;
    role: "ADMIN" | "USER";
    createDate?: Date | undefined;
    updatedDate?: Date | undefined;
    lastLogin?: Date | undefined;
    hashRefreshToken?: string | undefined;
}>;
export type User = z.infer<typeof UserWithoutPasswordSchema>;
export declare const MedServiceSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    code: z.ZodString;
    dalilCode: z.ZodString;
    nationalCode: z.ZodString;
    price: z.ZodNumber;
    numberOfPricing: z.ZodDefault<z.ZodNumber>;
    limitNumberOfPricing: z.ZodDefault<z.ZodNumber>;
    unitSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    code: string;
    id: string;
    name: string;
    dalilCode: string;
    nationalCode: string;
    price: number;
    numberOfPricing: number;
    limitNumberOfPricing: number;
    unitSize: number;
}, {
    code: string;
    id: string;
    name: string;
    dalilCode: string;
    nationalCode: string;
    price: number;
    unitSize: number;
    numberOfPricing?: number | undefined;
    limitNumberOfPricing?: number | undefined;
}>;
export type MedService = z.infer<typeof MedServiceSchema>;
export declare const MedServicesPricesSchema: z.ZodObject<{
    user: z.ZodObject<{
        id: z.ZodNumber;
        username: z.ZodString;
        fullName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        username: string;
        id: number;
        fullName: string;
    }, {
        username: string;
        id: number;
        fullName: string;
    }>;
    price: z.ZodNumber;
    unitSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    price: number;
    unitSize: number;
    user: {
        username: string;
        id: number;
        fullName: string;
    };
}, {
    price: number;
    unitSize: number;
    user: {
        username: string;
        id: number;
        fullName: string;
    };
}>;
export type MedServicePrices = z.infer<typeof MedServicesPricesSchema>;
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
export declare const contract: {
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
        whoAmI: {
            method: "GET";
            path: "/api/auth/whoAmI";
            responses: {
                200: z.ZodObject<{
                    username: z.ZodString;
                    fullName: z.ZodString;
                    role: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    username: string;
                    fullName: string;
                    role: string;
                }, {
                    username: string;
                    fullName: string;
                    role: string;
                }>;
            };
            strictStatusCodes: true;
        };
        updateMyPassword: {
            method: "PATCH";
            body: z.ZodObject<{
                oldPassword: z.ZodString;
                newPassword: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                oldPassword: string;
                newPassword: string;
            }, {
                oldPassword: string;
                newPassword: string;
            }>;
            path: "/api/update-password";
            responses: {
                200: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
                401: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
            strictStatusCodes: true;
        };
        updateMyInfo: {
            method: "PATCH";
            body: z.ZodObject<Omit<{
                id: z.ZodOptional<z.ZodNumber>;
                username: z.ZodOptional<z.ZodString>;
                fullName: z.ZodOptional<z.ZodString>;
                role: z.ZodOptional<z.ZodEnum<["ADMIN", "USER"]>>;
                password: z.ZodOptional<z.ZodString>;
                createDate: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
                updatedDate: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
                lastLogin: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
                hashRefreshToken: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            }, "password" | "id" | "role" | "createDate" | "updatedDate" | "lastLogin" | "hashRefreshToken">, "strip", z.ZodTypeAny, {
                username?: string | undefined;
                fullName?: string | undefined;
            }, {
                username?: string | undefined;
                fullName?: string | undefined;
            }>;
            path: "/api/update-info";
            responses: {
                200: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
                401: z.ZodObject<{
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
    users: {
        getAll: {
            query: z.ZodObject<{
                role: z.ZodOptional<z.ZodEnum<["ADMIN", "USER"]>>;
                username: z.ZodOptional<z.ZodString>;
                fullName: z.ZodOptional<z.ZodString>;
                page: z.ZodOptional<z.ZodNumber>;
                perPage: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                username?: string | undefined;
                fullName?: string | undefined;
                role?: "ADMIN" | "USER" | undefined;
                page?: number | undefined;
                perPage?: number | undefined;
            }, {
                username?: string | undefined;
                fullName?: string | undefined;
                role?: "ADMIN" | "USER" | undefined;
                page?: number | undefined;
                perPage?: number | undefined;
            }>;
            method: "GET";
            path: "/api/users";
            responses: {
                200: z.ZodObject<{
                    data: z.ZodArray<z.ZodObject<Omit<{
                        id: z.ZodNumber;
                        username: z.ZodString;
                        fullName: z.ZodString;
                        role: z.ZodEnum<["ADMIN", "USER"]>;
                        password: z.ZodString;
                        createDate: z.ZodOptional<z.ZodDate>;
                        updatedDate: z.ZodOptional<z.ZodDate>;
                        lastLogin: z.ZodOptional<z.ZodDate>;
                        hashRefreshToken: z.ZodOptional<z.ZodString>;
                    }, "password">, "strip", z.ZodTypeAny, {
                        username: string;
                        id: number;
                        fullName: string;
                        role: "ADMIN" | "USER";
                        createDate?: Date | undefined;
                        updatedDate?: Date | undefined;
                        lastLogin?: Date | undefined;
                        hashRefreshToken?: string | undefined;
                    }, {
                        username: string;
                        id: number;
                        fullName: string;
                        role: "ADMIN" | "USER";
                        createDate?: Date | undefined;
                        updatedDate?: Date | undefined;
                        lastLogin?: Date | undefined;
                        hashRefreshToken?: string | undefined;
                    }>, "many">;
                    meta: z.ZodObject<{
                        total: z.ZodNumber;
                        lastPage: z.ZodNumber;
                        currentPage: z.ZodNumber;
                        perPage: z.ZodNumber;
                        prev: z.ZodNullable<z.ZodNumber>;
                        next: z.ZodNullable<z.ZodNumber>;
                    }, "strip", z.ZodTypeAny, {
                        perPage: number;
                        total: number;
                        lastPage: number;
                        currentPage: number;
                        prev: number | null;
                        next: number | null;
                    }, {
                        perPage: number;
                        total: number;
                        lastPage: number;
                        currentPage: number;
                        prev: number | null;
                        next: number | null;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    data: {
                        username: string;
                        id: number;
                        fullName: string;
                        role: "ADMIN" | "USER";
                        createDate?: Date | undefined;
                        updatedDate?: Date | undefined;
                        lastLogin?: Date | undefined;
                        hashRefreshToken?: string | undefined;
                    }[];
                    meta: {
                        perPage: number;
                        total: number;
                        lastPage: number;
                        currentPage: number;
                        prev: number | null;
                        next: number | null;
                    };
                }, {
                    data: {
                        username: string;
                        id: number;
                        fullName: string;
                        role: "ADMIN" | "USER";
                        createDate?: Date | undefined;
                        updatedDate?: Date | undefined;
                        lastLogin?: Date | undefined;
                        hashRefreshToken?: string | undefined;
                    }[];
                    meta: {
                        perPage: number;
                        total: number;
                        lastPage: number;
                        currentPage: number;
                        prev: number | null;
                        next: number | null;
                    };
                }>;
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
                    fullName: z.ZodString;
                    role: z.ZodEnum<["ADMIN", "USER"]>;
                    password: z.ZodString;
                    createDate: z.ZodOptional<z.ZodDate>;
                    updatedDate: z.ZodOptional<z.ZodDate>;
                    lastLogin: z.ZodOptional<z.ZodDate>;
                    hashRefreshToken: z.ZodOptional<z.ZodString>;
                }, "password">, "strip", z.ZodTypeAny, {
                    username: string;
                    id: number;
                    fullName: string;
                    role: "ADMIN" | "USER";
                    createDate?: Date | undefined;
                    updatedDate?: Date | undefined;
                    lastLogin?: Date | undefined;
                    hashRefreshToken?: string | undefined;
                }, {
                    username: string;
                    id: number;
                    fullName: string;
                    role: "ADMIN" | "USER";
                    createDate?: Date | undefined;
                    updatedDate?: Date | undefined;
                    lastLogin?: Date | undefined;
                    hashRefreshToken?: string | undefined;
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
                fullName: z.ZodString;
                username: z.ZodString;
                password: z.ZodString;
                role: z.ZodEnum<["ADMIN", "USER"]>;
            }, "strip", z.ZodTypeAny, {
                username: string;
                password: string;
                fullName: string;
                role: "ADMIN" | "USER";
            }, {
                username: string;
                password: string;
                fullName: string;
                role: "ADMIN" | "USER";
            }>;
            path: "/api/users";
            responses: {
                201: z.ZodObject<Omit<{
                    id: z.ZodNumber;
                    username: z.ZodString;
                    fullName: z.ZodString;
                    role: z.ZodEnum<["ADMIN", "USER"]>;
                    password: z.ZodString;
                    createDate: z.ZodOptional<z.ZodDate>;
                    updatedDate: z.ZodOptional<z.ZodDate>;
                    lastLogin: z.ZodOptional<z.ZodDate>;
                    hashRefreshToken: z.ZodOptional<z.ZodString>;
                }, "password">, "strip", z.ZodTypeAny, {
                    username: string;
                    id: number;
                    fullName: string;
                    role: "ADMIN" | "USER";
                    createDate?: Date | undefined;
                    updatedDate?: Date | undefined;
                    lastLogin?: Date | undefined;
                    hashRefreshToken?: string | undefined;
                }, {
                    username: string;
                    id: number;
                    fullName: string;
                    role: "ADMIN" | "USER";
                    createDate?: Date | undefined;
                    updatedDate?: Date | undefined;
                    lastLogin?: Date | undefined;
                    hashRefreshToken?: string | undefined;
                }>;
            };
            strictStatusCodes: true;
        };
        patch: {
            pathParams: z.ZodObject<{
                id: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            method: "PATCH";
            body: z.ZodObject<Omit<{
                id: z.ZodOptional<z.ZodNumber>;
                username: z.ZodOptional<z.ZodString>;
                fullName: z.ZodOptional<z.ZodString>;
                role: z.ZodOptional<z.ZodEnum<["ADMIN", "USER"]>>;
                password: z.ZodOptional<z.ZodString>;
                createDate: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
                updatedDate: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
                lastLogin: z.ZodOptional<z.ZodOptional<z.ZodDate>>;
                hashRefreshToken: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            }, "id">, "strip", z.ZodTypeAny, {
                username?: string | undefined;
                password?: string | undefined;
                fullName?: string | undefined;
                role?: "ADMIN" | "USER" | undefined;
                createDate?: Date | undefined;
                updatedDate?: Date | undefined;
                lastLogin?: Date | undefined;
                hashRefreshToken?: string | undefined;
            }, {
                username?: string | undefined;
                password?: string | undefined;
                fullName?: string | undefined;
                role?: "ADMIN" | "USER" | undefined;
                createDate?: Date | undefined;
                updatedDate?: Date | undefined;
                lastLogin?: Date | undefined;
                hashRefreshToken?: string | undefined;
            }>;
            path: "/api/users/:id";
            responses: {
                200: z.ZodObject<Omit<{
                    id: z.ZodNumber;
                    username: z.ZodString;
                    fullName: z.ZodString;
                    role: z.ZodEnum<["ADMIN", "USER"]>;
                    password: z.ZodString;
                    createDate: z.ZodOptional<z.ZodDate>;
                    updatedDate: z.ZodOptional<z.ZodDate>;
                    lastLogin: z.ZodOptional<z.ZodDate>;
                    hashRefreshToken: z.ZodOptional<z.ZodString>;
                }, "password">, "strip", z.ZodTypeAny, {
                    username: string;
                    id: number;
                    fullName: string;
                    role: "ADMIN" | "USER";
                    createDate?: Date | undefined;
                    updatedDate?: Date | undefined;
                    lastLogin?: Date | undefined;
                    hashRefreshToken?: string | undefined;
                }, {
                    username: string;
                    id: number;
                    fullName: string;
                    role: "ADMIN" | "USER";
                    createDate?: Date | undefined;
                    updatedDate?: Date | undefined;
                    lastLogin?: Date | undefined;
                    hashRefreshToken?: string | undefined;
                }>;
            };
            strictStatusCodes: true;
        };
        servicesStatus: {
            method: "GET";
            path: "/api/user-status";
            responses: {
                200: z.ZodObject<{
                    pricedServices: z.ZodNumber;
                    totalServices: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    pricedServices: number;
                    totalServices: number;
                }, {
                    pricedServices: number;
                    totalServices: number;
                }>;
            };
            strictStatusCodes: true;
        };
    };
    medServices: {
        create: {
            method: "POST";
            body: z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
                code: z.ZodString;
                dalilCode: z.ZodString;
                nationalCode: z.ZodString;
                price: z.ZodNumber;
                numberOfPricing: z.ZodDefault<z.ZodNumber>;
                limitNumberOfPricing: z.ZodDefault<z.ZodNumber>;
                unitSize: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                code: string;
                id: string;
                name: string;
                dalilCode: string;
                nationalCode: string;
                price: number;
                numberOfPricing: number;
                limitNumberOfPricing: number;
                unitSize: number;
            }, {
                code: string;
                id: string;
                name: string;
                dalilCode: string;
                nationalCode: string;
                price: number;
                unitSize: number;
                numberOfPricing?: number | undefined;
                limitNumberOfPricing?: number | undefined;
            }>;
            path: "/api/med-services";
            responses: {
                201: z.ZodObject<{
                    id: z.ZodString;
                    name: z.ZodString;
                    code: z.ZodString;
                    dalilCode: z.ZodString;
                    nationalCode: z.ZodString;
                    price: z.ZodNumber;
                    numberOfPricing: z.ZodDefault<z.ZodNumber>;
                    limitNumberOfPricing: z.ZodDefault<z.ZodNumber>;
                    unitSize: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    code: string;
                    id: string;
                    name: string;
                    dalilCode: string;
                    nationalCode: string;
                    price: number;
                    numberOfPricing: number;
                    limitNumberOfPricing: number;
                    unitSize: number;
                }, {
                    code: string;
                    id: string;
                    name: string;
                    dalilCode: string;
                    nationalCode: string;
                    price: number;
                    unitSize: number;
                    numberOfPricing?: number | undefined;
                    limitNumberOfPricing?: number | undefined;
                }>;
            };
            strictStatusCodes: true;
        };
        getAll: {
            query: z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                code: z.ZodOptional<z.ZodString>;
                dalilCode: z.ZodOptional<z.ZodString>;
                nationalCode: z.ZodOptional<z.ZodString>;
                orderBy: z.ZodOptional<z.ZodString>;
                orderDirection: z.ZodOptional<z.ZodString>;
                page: z.ZodDefault<z.ZodNumber>;
                perPage: z.ZodOptional<z.ZodNumber>;
                price: z.ZodOptional<z.ZodObject<{
                    equals: z.ZodOptional<z.ZodNumber>;
                    not: z.ZodOptional<z.ZodNumber>;
                    gt: z.ZodOptional<z.ZodNumber>;
                    gte: z.ZodOptional<z.ZodNumber>;
                    lt: z.ZodOptional<z.ZodNumber>;
                    lte: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    equals?: number | undefined;
                    not?: number | undefined;
                    gt?: number | undefined;
                    gte?: number | undefined;
                    lt?: number | undefined;
                    lte?: number | undefined;
                }, {
                    equals?: number | undefined;
                    not?: number | undefined;
                    gt?: number | undefined;
                    gte?: number | undefined;
                    lt?: number | undefined;
                    lte?: number | undefined;
                }>>;
                unitSize: z.ZodOptional<z.ZodObject<{
                    equals: z.ZodOptional<z.ZodNumber>;
                    not: z.ZodOptional<z.ZodNumber>;
                    gt: z.ZodOptional<z.ZodNumber>;
                    gte: z.ZodOptional<z.ZodNumber>;
                    lt: z.ZodOptional<z.ZodNumber>;
                    lte: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    equals?: number | undefined;
                    not?: number | undefined;
                    gt?: number | undefined;
                    gte?: number | undefined;
                    lt?: number | undefined;
                    lte?: number | undefined;
                }, {
                    equals?: number | undefined;
                    not?: number | undefined;
                    gt?: number | undefined;
                    gte?: number | undefined;
                    lt?: number | undefined;
                    lte?: number | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                page: number;
                code?: string | undefined;
                name?: string | undefined;
                dalilCode?: string | undefined;
                nationalCode?: string | undefined;
                price?: {
                    equals?: number | undefined;
                    not?: number | undefined;
                    gt?: number | undefined;
                    gte?: number | undefined;
                    lt?: number | undefined;
                    lte?: number | undefined;
                } | undefined;
                unitSize?: {
                    equals?: number | undefined;
                    not?: number | undefined;
                    gt?: number | undefined;
                    gte?: number | undefined;
                    lt?: number | undefined;
                    lte?: number | undefined;
                } | undefined;
                perPage?: number | undefined;
                orderBy?: string | undefined;
                orderDirection?: string | undefined;
            }, {
                code?: string | undefined;
                name?: string | undefined;
                dalilCode?: string | undefined;
                nationalCode?: string | undefined;
                price?: {
                    equals?: number | undefined;
                    not?: number | undefined;
                    gt?: number | undefined;
                    gte?: number | undefined;
                    lt?: number | undefined;
                    lte?: number | undefined;
                } | undefined;
                unitSize?: {
                    equals?: number | undefined;
                    not?: number | undefined;
                    gt?: number | undefined;
                    gte?: number | undefined;
                    lt?: number | undefined;
                    lte?: number | undefined;
                } | undefined;
                page?: number | undefined;
                perPage?: number | undefined;
                orderBy?: string | undefined;
                orderDirection?: string | undefined;
            }>;
            method: "GET";
            path: "/api/med-services";
            responses: {
                200: z.ZodObject<{
                    data: z.ZodArray<z.ZodObject<{
                        id: z.ZodString;
                        name: z.ZodString;
                        code: z.ZodString;
                        dalilCode: z.ZodString;
                        nationalCode: z.ZodString;
                        price: z.ZodNumber;
                        numberOfPricing: z.ZodDefault<z.ZodNumber>;
                        limitNumberOfPricing: z.ZodDefault<z.ZodNumber>;
                        unitSize: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        code: string;
                        id: string;
                        name: string;
                        dalilCode: string;
                        nationalCode: string;
                        price: number;
                        numberOfPricing: number;
                        limitNumberOfPricing: number;
                        unitSize: number;
                    }, {
                        code: string;
                        id: string;
                        name: string;
                        dalilCode: string;
                        nationalCode: string;
                        price: number;
                        unitSize: number;
                        numberOfPricing?: number | undefined;
                        limitNumberOfPricing?: number | undefined;
                    }>, "many">;
                    meta: z.ZodObject<{
                        total: z.ZodNumber;
                        lastPage: z.ZodNumber;
                        currentPage: z.ZodNumber;
                        perPage: z.ZodNumber;
                        prev: z.ZodNullable<z.ZodNumber>;
                        next: z.ZodNullable<z.ZodNumber>;
                    }, "strip", z.ZodTypeAny, {
                        perPage: number;
                        total: number;
                        lastPage: number;
                        currentPage: number;
                        prev: number | null;
                        next: number | null;
                    }, {
                        perPage: number;
                        total: number;
                        lastPage: number;
                        currentPage: number;
                        prev: number | null;
                        next: number | null;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    data: {
                        code: string;
                        id: string;
                        name: string;
                        dalilCode: string;
                        nationalCode: string;
                        price: number;
                        numberOfPricing: number;
                        limitNumberOfPricing: number;
                        unitSize: number;
                    }[];
                    meta: {
                        perPage: number;
                        total: number;
                        lastPage: number;
                        currentPage: number;
                        prev: number | null;
                        next: number | null;
                    };
                }, {
                    data: {
                        code: string;
                        id: string;
                        name: string;
                        dalilCode: string;
                        nationalCode: string;
                        price: number;
                        unitSize: number;
                        numberOfPricing?: number | undefined;
                        limitNumberOfPricing?: number | undefined;
                    }[];
                    meta: {
                        perPage: number;
                        total: number;
                        lastPage: number;
                        currentPage: number;
                        prev: number | null;
                        next: number | null;
                    };
                }>;
            };
            strictStatusCodes: true;
        };
        getAllByUser: {
            query: z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                code: z.ZodOptional<z.ZodString>;
                dalilCode: z.ZodOptional<z.ZodString>;
                nationalCode: z.ZodOptional<z.ZodString>;
                orderBy: z.ZodOptional<z.ZodString>;
                orderDirection: z.ZodOptional<z.ZodString>;
                page: z.ZodDefault<z.ZodNumber>;
                perPage: z.ZodOptional<z.ZodNumber>;
                price: z.ZodOptional<z.ZodObject<{
                    equals: z.ZodOptional<z.ZodNumber>;
                    not: z.ZodOptional<z.ZodNumber>;
                    gt: z.ZodOptional<z.ZodNumber>;
                    gte: z.ZodOptional<z.ZodNumber>;
                    lt: z.ZodOptional<z.ZodNumber>;
                    lte: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    equals?: number | undefined;
                    not?: number | undefined;
                    gt?: number | undefined;
                    gte?: number | undefined;
                    lt?: number | undefined;
                    lte?: number | undefined;
                }, {
                    equals?: number | undefined;
                    not?: number | undefined;
                    gt?: number | undefined;
                    gte?: number | undefined;
                    lt?: number | undefined;
                    lte?: number | undefined;
                }>>;
                unitSize: z.ZodOptional<z.ZodObject<{
                    equals: z.ZodOptional<z.ZodNumber>;
                    not: z.ZodOptional<z.ZodNumber>;
                    gt: z.ZodOptional<z.ZodNumber>;
                    gte: z.ZodOptional<z.ZodNumber>;
                    lt: z.ZodOptional<z.ZodNumber>;
                    lte: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    equals?: number | undefined;
                    not?: number | undefined;
                    gt?: number | undefined;
                    gte?: number | undefined;
                    lt?: number | undefined;
                    lte?: number | undefined;
                }, {
                    equals?: number | undefined;
                    not?: number | undefined;
                    gt?: number | undefined;
                    gte?: number | undefined;
                    lt?: number | undefined;
                    lte?: number | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                page: number;
                code?: string | undefined;
                name?: string | undefined;
                dalilCode?: string | undefined;
                nationalCode?: string | undefined;
                price?: {
                    equals?: number | undefined;
                    not?: number | undefined;
                    gt?: number | undefined;
                    gte?: number | undefined;
                    lt?: number | undefined;
                    lte?: number | undefined;
                } | undefined;
                unitSize?: {
                    equals?: number | undefined;
                    not?: number | undefined;
                    gt?: number | undefined;
                    gte?: number | undefined;
                    lt?: number | undefined;
                    lte?: number | undefined;
                } | undefined;
                perPage?: number | undefined;
                orderBy?: string | undefined;
                orderDirection?: string | undefined;
            }, {
                code?: string | undefined;
                name?: string | undefined;
                dalilCode?: string | undefined;
                nationalCode?: string | undefined;
                price?: {
                    equals?: number | undefined;
                    not?: number | undefined;
                    gt?: number | undefined;
                    gte?: number | undefined;
                    lt?: number | undefined;
                    lte?: number | undefined;
                } | undefined;
                unitSize?: {
                    equals?: number | undefined;
                    not?: number | undefined;
                    gt?: number | undefined;
                    gte?: number | undefined;
                    lt?: number | undefined;
                    lte?: number | undefined;
                } | undefined;
                page?: number | undefined;
                perPage?: number | undefined;
                orderBy?: string | undefined;
                orderDirection?: string | undefined;
            }>;
            method: "GET";
            path: "/api/med-services/user";
            responses: {
                200: z.ZodObject<{
                    data: z.ZodArray<z.ZodObject<{
                        id: z.ZodString;
                        name: z.ZodString;
                        code: z.ZodString;
                        dalilCode: z.ZodString;
                        nationalCode: z.ZodString;
                        price: z.ZodNumber;
                        numberOfPricing: z.ZodDefault<z.ZodNumber>;
                        limitNumberOfPricing: z.ZodDefault<z.ZodNumber>;
                        unitSize: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        code: string;
                        id: string;
                        name: string;
                        dalilCode: string;
                        nationalCode: string;
                        price: number;
                        numberOfPricing: number;
                        limitNumberOfPricing: number;
                        unitSize: number;
                    }, {
                        code: string;
                        id: string;
                        name: string;
                        dalilCode: string;
                        nationalCode: string;
                        price: number;
                        unitSize: number;
                        numberOfPricing?: number | undefined;
                        limitNumberOfPricing?: number | undefined;
                    }>, "many">;
                    meta: z.ZodObject<{
                        total: z.ZodNumber;
                        lastPage: z.ZodNumber;
                        currentPage: z.ZodNumber;
                        perPage: z.ZodNumber;
                        prev: z.ZodNullable<z.ZodNumber>;
                        next: z.ZodNullable<z.ZodNumber>;
                    }, "strip", z.ZodTypeAny, {
                        perPage: number;
                        total: number;
                        lastPage: number;
                        currentPage: number;
                        prev: number | null;
                        next: number | null;
                    }, {
                        perPage: number;
                        total: number;
                        lastPage: number;
                        currentPage: number;
                        prev: number | null;
                        next: number | null;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    data: {
                        code: string;
                        id: string;
                        name: string;
                        dalilCode: string;
                        nationalCode: string;
                        price: number;
                        numberOfPricing: number;
                        limitNumberOfPricing: number;
                        unitSize: number;
                    }[];
                    meta: {
                        perPage: number;
                        total: number;
                        lastPage: number;
                        currentPage: number;
                        prev: number | null;
                        next: number | null;
                    };
                }, {
                    data: {
                        code: string;
                        id: string;
                        name: string;
                        dalilCode: string;
                        nationalCode: string;
                        price: number;
                        unitSize: number;
                        numberOfPricing?: number | undefined;
                        limitNumberOfPricing?: number | undefined;
                    }[];
                    meta: {
                        perPage: number;
                        total: number;
                        lastPage: number;
                        currentPage: number;
                        prev: number | null;
                        next: number | null;
                    };
                }>;
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
                    dalilCode: z.ZodString;
                    nationalCode: z.ZodString;
                    price: z.ZodNumber;
                    numberOfPricing: z.ZodDefault<z.ZodNumber>;
                    limitNumberOfPricing: z.ZodDefault<z.ZodNumber>;
                    unitSize: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    code: string;
                    id: string;
                    name: string;
                    dalilCode: string;
                    nationalCode: string;
                    price: number;
                    numberOfPricing: number;
                    limitNumberOfPricing: number;
                    unitSize: number;
                }, {
                    code: string;
                    id: string;
                    name: string;
                    dalilCode: string;
                    nationalCode: string;
                    price: number;
                    unitSize: number;
                    numberOfPricing?: number | undefined;
                    limitNumberOfPricing?: number | undefined;
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
        numberOfPricing: {
            method: "GET";
            path: "/api/med-services/number-of-pricing";
            responses: {
                200: z.ZodNumber;
            };
            strictStatusCodes: true;
        };
        updateNumberOfPricing: {
            method: "PATCH";
            body: z.ZodObject<{
                limit: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                limit: number;
            }, {
                limit: number;
            }>;
            path: "/api/med-services-update-number-of-pricing";
            responses: {
                200: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
            strictStatusCodes: true;
        };
        getMedServicePrices: {
            pathParams: z.ZodObject<{
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
            }, {
                id: string;
            }>;
            method: "GET";
            path: "/api/get-med-service-prices/:id";
            responses: {
                200: z.ZodArray<z.ZodObject<{
                    user: z.ZodObject<{
                        id: z.ZodNumber;
                        username: z.ZodString;
                        fullName: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        username: string;
                        id: number;
                        fullName: string;
                    }, {
                        username: string;
                        id: number;
                        fullName: string;
                    }>;
                    price: z.ZodNumber;
                    unitSize: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    price: number;
                    unitSize: number;
                    user: {
                        username: string;
                        id: number;
                        fullName: string;
                    };
                }, {
                    price: number;
                    unitSize: number;
                    user: {
                        username: string;
                        id: number;
                        fullName: string;
                    };
                }>, "many">;
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
};
export {};
