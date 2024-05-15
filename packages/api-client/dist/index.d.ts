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
    createDate: z.ZodDate;
    updatedDate: z.ZodDate;
    lastLogin: z.ZodDate;
    hashRefreshToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    id: number;
    fullName: string;
    role: "ADMIN" | "USER";
    createDate: Date;
    updatedDate: Date;
    lastLogin: Date;
    hashRefreshToken: string;
}, {
    username: string;
    password: string;
    id: number;
    fullName: string;
    role: "ADMIN" | "USER";
    createDate: Date;
    updatedDate: Date;
    lastLogin: Date;
    hashRefreshToken: string;
}>;
declare const UserWithoutPasswordSchema: z.ZodObject<Omit<{
    id: z.ZodNumber;
    username: z.ZodString;
    fullName: z.ZodString;
    role: z.ZodEnum<["ADMIN", "USER"]>;
    password: z.ZodString;
    createDate: z.ZodDate;
    updatedDate: z.ZodDate;
    lastLogin: z.ZodDate;
    hashRefreshToken: z.ZodString;
}, "password">, "strip", z.ZodTypeAny, {
    username: string;
    id: number;
    fullName: string;
    role: "ADMIN" | "USER";
    createDate: Date;
    updatedDate: Date;
    lastLogin: Date;
    hashRefreshToken: string;
}, {
    username: string;
    id: number;
    fullName: string;
    role: "ADMIN" | "USER";
    createDate: Date;
    updatedDate: Date;
    lastLogin: Date;
    hashRefreshToken: string;
}>;
export type User = z.infer<typeof UserWithoutPasswordSchema>;
export declare const MedServiceSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    code: z.ZodString;
    dalilName: z.ZodString;
    nationalCode: z.ZodString;
    price: z.ZodNumber;
    numberOfPricing: z.ZodDefault<z.ZodNumber>;
    limitNumberOfPricing: z.ZodDefault<z.ZodNumber>;
    unitSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    code: string;
    id: string;
    name: string;
    dalilName: string;
    nationalCode: string;
    price: number;
    numberOfPricing: number;
    limitNumberOfPricing: number;
    unitSize: number;
}, {
    code: string;
    id: string;
    name: string;
    dalilName: string;
    nationalCode: string;
    price: number;
    unitSize: number;
    numberOfPricing?: number | undefined;
    limitNumberOfPricing?: number | undefined;
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
    };
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
                numberOfPricing: z.ZodDefault<z.ZodNumber>;
                limitNumberOfPricing: z.ZodDefault<z.ZodNumber>;
                unitSize: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                code: string;
                id: string;
                name: string;
                dalilName: string;
                nationalCode: string;
                price: number;
                numberOfPricing: number;
                limitNumberOfPricing: number;
                unitSize: number;
            }, {
                code: string;
                id: string;
                name: string;
                dalilName: string;
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
                    dalilName: z.ZodString;
                    nationalCode: z.ZodString;
                    price: z.ZodNumber;
                    numberOfPricing: z.ZodDefault<z.ZodNumber>;
                    limitNumberOfPricing: z.ZodDefault<z.ZodNumber>;
                    unitSize: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    code: string;
                    id: string;
                    name: string;
                    dalilName: string;
                    nationalCode: string;
                    price: number;
                    numberOfPricing: number;
                    limitNumberOfPricing: number;
                    unitSize: number;
                }, {
                    code: string;
                    id: string;
                    name: string;
                    dalilName: string;
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
                orderBy: z.ZodOptional<z.ZodString>;
                orderDirection: z.ZodOptional<z.ZodString>;
                page: z.ZodNumber;
                perPage: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                page: number;
                code?: string | undefined;
                name?: string | undefined;
                dalilCode?: string | undefined;
                orderBy?: string | undefined;
                orderDirection?: string | undefined;
                perPage?: number | undefined;
            }, {
                page: number;
                code?: string | undefined;
                name?: string | undefined;
                dalilCode?: string | undefined;
                orderBy?: string | undefined;
                orderDirection?: string | undefined;
                perPage?: number | undefined;
            }>;
            method: "GET";
            path: "/api/med-services";
            responses: {
                200: z.ZodObject<{
                    data: z.ZodArray<z.ZodObject<{
                        id: z.ZodString;
                        name: z.ZodString;
                        code: z.ZodString;
                        dalilName: z.ZodString;
                        nationalCode: z.ZodString;
                        price: z.ZodNumber;
                        numberOfPricing: z.ZodDefault<z.ZodNumber>;
                        limitNumberOfPricing: z.ZodDefault<z.ZodNumber>;
                        unitSize: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        code: string;
                        id: string;
                        name: string;
                        dalilName: string;
                        nationalCode: string;
                        price: number;
                        numberOfPricing: number;
                        limitNumberOfPricing: number;
                        unitSize: number;
                    }, {
                        code: string;
                        id: string;
                        name: string;
                        dalilName: string;
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
                        dalilName: string;
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
                        dalilName: string;
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
                orderBy: z.ZodOptional<z.ZodString>;
                orderDirection: z.ZodOptional<z.ZodString>;
                page: z.ZodNumber;
                perPage: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                page: number;
                code?: string | undefined;
                name?: string | undefined;
                dalilCode?: string | undefined;
                orderBy?: string | undefined;
                orderDirection?: string | undefined;
                perPage?: number | undefined;
            }, {
                page: number;
                code?: string | undefined;
                name?: string | undefined;
                dalilCode?: string | undefined;
                orderBy?: string | undefined;
                orderDirection?: string | undefined;
                perPage?: number | undefined;
            }>;
            method: "GET";
            path: "/api/med-services/user";
            responses: {
                200: z.ZodObject<{
                    data: z.ZodArray<z.ZodObject<{
                        id: z.ZodString;
                        name: z.ZodString;
                        code: z.ZodString;
                        dalilName: z.ZodString;
                        nationalCode: z.ZodString;
                        price: z.ZodNumber;
                        numberOfPricing: z.ZodDefault<z.ZodNumber>;
                        limitNumberOfPricing: z.ZodDefault<z.ZodNumber>;
                        unitSize: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        code: string;
                        id: string;
                        name: string;
                        dalilName: string;
                        nationalCode: string;
                        price: number;
                        numberOfPricing: number;
                        limitNumberOfPricing: number;
                        unitSize: number;
                    }, {
                        code: string;
                        id: string;
                        name: string;
                        dalilName: string;
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
                        dalilName: string;
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
                        dalilName: string;
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
                    dalilName: z.ZodString;
                    nationalCode: z.ZodString;
                    price: z.ZodNumber;
                    numberOfPricing: z.ZodDefault<z.ZodNumber>;
                    limitNumberOfPricing: z.ZodDefault<z.ZodNumber>;
                    unitSize: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    code: string;
                    id: string;
                    name: string;
                    dalilName: string;
                    nationalCode: string;
                    price: number;
                    numberOfPricing: number;
                    limitNumberOfPricing: number;
                    unitSize: number;
                }, {
                    code: string;
                    id: string;
                    name: string;
                    dalilName: string;
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
    };
    users: {
        getAll: {
            query: z.ZodObject<{
                page: z.ZodOptional<z.ZodNumber>;
                perPage: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                page?: number | undefined;
                perPage?: number | undefined;
            }, {
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
                        createDate: z.ZodDate;
                        updatedDate: z.ZodDate;
                        lastLogin: z.ZodDate;
                        hashRefreshToken: z.ZodString;
                    }, "password">, "strip", z.ZodTypeAny, {
                        username: string;
                        id: number;
                        fullName: string;
                        role: "ADMIN" | "USER";
                        createDate: Date;
                        updatedDate: Date;
                        lastLogin: Date;
                        hashRefreshToken: string;
                    }, {
                        username: string;
                        id: number;
                        fullName: string;
                        role: "ADMIN" | "USER";
                        createDate: Date;
                        updatedDate: Date;
                        lastLogin: Date;
                        hashRefreshToken: string;
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
                        createDate: Date;
                        updatedDate: Date;
                        lastLogin: Date;
                        hashRefreshToken: string;
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
                        createDate: Date;
                        updatedDate: Date;
                        lastLogin: Date;
                        hashRefreshToken: string;
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
                    createDate: z.ZodDate;
                    updatedDate: z.ZodDate;
                    lastLogin: z.ZodDate;
                    hashRefreshToken: z.ZodString;
                }, "password">, "strip", z.ZodTypeAny, {
                    username: string;
                    id: number;
                    fullName: string;
                    role: "ADMIN" | "USER";
                    createDate: Date;
                    updatedDate: Date;
                    lastLogin: Date;
                    hashRefreshToken: string;
                }, {
                    username: string;
                    id: number;
                    fullName: string;
                    role: "ADMIN" | "USER";
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
                    createDate: z.ZodDate;
                    updatedDate: z.ZodDate;
                    lastLogin: z.ZodDate;
                    hashRefreshToken: z.ZodString;
                }, "password">, "strip", z.ZodTypeAny, {
                    username: string;
                    id: number;
                    fullName: string;
                    role: "ADMIN" | "USER";
                    createDate: Date;
                    updatedDate: Date;
                    lastLogin: Date;
                    hashRefreshToken: string;
                }, {
                    username: string;
                    id: number;
                    fullName: string;
                    role: "ADMIN" | "USER";
                    createDate: Date;
                    updatedDate: Date;
                    lastLogin: Date;
                    hashRefreshToken: string;
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
                createDate: z.ZodOptional<z.ZodDate>;
                updatedDate: z.ZodOptional<z.ZodDate>;
                lastLogin: z.ZodOptional<z.ZodDate>;
                hashRefreshToken: z.ZodOptional<z.ZodString>;
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
                    createDate: z.ZodDate;
                    updatedDate: z.ZodDate;
                    lastLogin: z.ZodDate;
                    hashRefreshToken: z.ZodString;
                }, "password">, "strip", z.ZodTypeAny, {
                    username: string;
                    id: number;
                    fullName: string;
                    role: "ADMIN" | "USER";
                    createDate: Date;
                    updatedDate: Date;
                    lastLogin: Date;
                    hashRefreshToken: string;
                }, {
                    username: string;
                    id: number;
                    fullName: string;
                    role: "ADMIN" | "USER";
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
export {};
