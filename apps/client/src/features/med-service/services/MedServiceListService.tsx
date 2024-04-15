import { apiClient } from "@/api/api-client";
import { createSignal } from "solid-js";

export const MedServiceListService = () => {
  const [name, setName] = createSignal("");
  const [code, setCode] = createSignal("");
  const [dalilCode, setDalilCode] = createSignal("");

  const nameFilter = (term: string) => {
    console.log("name", name());
    setName(term);
  };

  const codeFilter = (term: string) => {
    setCode(term);
  };

  const dalilCodeFilter = (term: string) => {
    setDalilCode(term);
  };

  const servicesQuery = apiClient.medServices.getAll.createQuery(
    () => ["medServices", code(), name(), dalilCode()],
    { query: { code: code(), name: name(), dalilCode: dalilCode() } }
  );

  return {
    nameFilter,
    codeFilter,
    dalilCodeFilter,
    name,
    code,
    dalilCode,
    servicesQuery,
  };
};
