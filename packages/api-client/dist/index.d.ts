import { z } from "zod";
export declare const TodoSchema: z.ZodObject<{
    id: z.ZodNumber;
    title: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    title: string;
    description: string;
}, {
    id: number;
    title: string;
    description: string;
}>;
export type Todo = z.infer<typeof TodoSchema>;
export declare const contract: {
    todos: {
        create: {
            responses: {
                201: z.ZodObject<{
                    id: z.ZodNumber;
                    title: z.ZodString;
                    description: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    id: number;
                    title: string;
                    description: string;
                }, {
                    id: number;
                    title: string;
                    description: string;
                }>;
            };
            method: "POST";
            body: z.ZodObject<Omit<{
                id: z.ZodNumber;
                title: z.ZodString;
                description: z.ZodString;
            }, "id">, "strip", z.ZodTypeAny, {
                title: string;
                description: string;
            }, {
                title: string;
                description: string;
            }>;
            path: "/api/todos";
            strictStatusCodes: true;
        };
        getAll: {
            query: z.ZodObject<{
                title: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                title?: string | undefined;
            }, {
                title?: string | undefined;
            }>;
            responses: {
                200: z.ZodArray<z.ZodObject<{
                    id: z.ZodNumber;
                    title: z.ZodString;
                    description: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    id: number;
                    title: string;
                    description: string;
                }, {
                    id: number;
                    title: string;
                    description: string;
                }>, "many">;
            };
            method: "GET";
            path: "/api/todos";
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
            responses: {
                200: z.ZodObject<{
                    id: z.ZodNumber;
                    title: z.ZodString;
                    description: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    id: number;
                    title: string;
                    description: string;
                }, {
                    id: number;
                    title: string;
                    description: string;
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
            path: "/api/todos/:id";
            strictStatusCodes: true;
        };
        update: {
            pathParams: z.ZodObject<{
                id: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                id: number;
            }, {
                id: number;
            }>;
            responses: {
                200: z.ZodObject<{
                    id: z.ZodNumber;
                    title: z.ZodString;
                    description: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    id: number;
                    title: string;
                    description: string;
                }, {
                    id: number;
                    title: string;
                    description: string;
                }>;
                404: z.ZodObject<{
                    message: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    message: string;
                }, {
                    message: string;
                }>;
            };
            method: "PATCH";
            body: z.ZodObject<{
                title: z.ZodOptional<z.ZodString>;
                description: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                title?: string | undefined;
                description?: string | undefined;
            }, {
                title?: string | undefined;
                description?: string | undefined;
            }>;
            path: "/api/todos/:id";
            strictStatusCodes: true;
        };
        remove: {
            pathParams: z.ZodObject<{
                id: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                id: number;
            }, {
                id: number;
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
            path: "/api/todos/:id";
            strictStatusCodes: true;
        };
    };
};
