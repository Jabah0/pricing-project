import { initQueryClient } from "@ts-rest/solid-query";
import { contract } from "api-contract";

export const apiClient = initQueryClient(contract, {
  baseHeaders: {},
  baseUrl: "",
});
