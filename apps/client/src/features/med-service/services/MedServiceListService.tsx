import { createSignal } from "solid-js";
import toast from "solid-toast";
import { contract } from "api-contract";
import { apiClient } from "@/api/api-client";
import { useLocale } from "@/features/locale/locale.context";
import { ErrorToast } from "@/toasts/ErrorToast";
import { SuccessToast } from "@/toasts/SuccessToast";
import { useQueryClient, InfiniteData } from "@tanstack/solid-query";
import { ClientInferResponses } from "@ts-rest/core";

type MedServices = ClientInferResponses<typeof contract.medServices.getAll>;

export const MedServiceListService = () => {
  const locale = useLocale();

  const [isMy, setIsMy] = createSignal(false);

  const [serviceName, setServiceName] = createSignal<string>();
  const [serviceCode, setServiceCode] = createSignal<string>();
  const [dalilCode, setDalilCode] = createSignal<string>();
  const [nationalCode, setNationalCode] = createSignal<string>();
  const [orderBy, setOrderBy] = createSignal<string>();
  const [orderDirection, setOrderDirection] = createSignal<"asc" | "desc">();
  const [servicePrice, setServicePrice] = createSignal<{
    equal?: number;
    not?: number;
    gt?: number;
    gte?: number;
    lt?: number;
    lte?: number;
  }>();

  const ServiceQueryKey = () => [
    "services",
    serviceName(),
    serviceCode(),
    dalilCode(),
    nationalCode(),
    servicePrice(),
    orderBy(),
    orderDirection(),
  ];
  const MyServiceQueryKey = () => [
    "myServices",
    serviceName(),
    serviceCode(),
    dalilCode(),
    nationalCode(),
    servicePrice(),
    orderBy(),
    orderDirection(),
  ];

  const queryClient = useQueryClient();

  const myServicesQuery =
    apiClient.medServices.getAllByUser.createInfiniteQuery(
      MyServiceQueryKey,
      ({ pageParam = 1 }) => ({
        query: {
          get name() {
            return serviceName();
          },
          get code() {
            return serviceCode();
          },
          get dalilCode() {
            return dalilCode();
          },
          get nationalCode() {
            return nationalCode();
          },
          get price() {
            return servicePrice();
          },
          get orderBy() {
            return orderBy();
          },
          get orderDirection() {
            return orderDirection();
          },
          get page() {
            return pageParam;
          },
        },
      }),
      {
        getNextPageParam: (lastPage, _pages) => {
          if (lastPage.body.meta.next === null) return undefined;
          else return lastPage.body.meta.next;
        },
      }
    );

  const updateMedServiceMutation =
    apiClient.medServices.patchOne.createMutation({
      onMutate: async (
        newService
      ): Promise<{ previousData: MedServices | undefined }> => {
        await queryClient.cancelQueries({
          queryKey: ServiceQueryKey(),
        });

        const previousData =
          queryClient.getQueryData<MedServices>(ServiceQueryKey());

        queryClient.setQueryData<InfiniteData<MedServices>>(
          ServiceQueryKey(),
          (old) => {
            if (!old) return undefined;

            const outerFlatService = old.pages.flatMap((page) => page);

            const innerFlatService = outerFlatService.flatMap(
              (item) => item.body.data
            );

            const targetService = innerFlatService.find(
              (item) => item.id === newService.params.id
            );

            if (targetService) {
              targetService.price =
                newService.body?.price || targetService.price;
            }

            return {
              ...old,
            };
          }
        );

        queryClient.setQueryData<InfiniteData<MedServices>>(
          ServiceQueryKey(),
          (old) => {
            if (!old) return undefined;

            const outerFlatService = old.pages.flatMap((page) => page);

            const innerFlatService = outerFlatService.flatMap(
              (item) => item.body.data
            );

            const targetService = innerFlatService.find(
              (item) => item.id === newService.params.id
            );

            if (targetService) {
              targetService.price =
                newService.body?.price || targetService.price;
            }

            return {
              ...old,
            };
          }
        );

        return { previousData };
      },
      onError: (_, __, context) => {
        const typedContext = context as {
          previousData: MedServices | undefined;
        };

        queryClient.setQueryData(ServiceQueryKey(), typedContext.previousData);
        toast.custom((t) => (
          <ErrorToast
            onDismiss={() => toast.dismiss(t.id)}
            message={locale.t("servicePriceUpdatedUnSuccessfully")}
          />
        ));
      },
      onSuccess: () => {
        toast.custom((t) => (
          <SuccessToast
            onDismiss={() => toast.dismiss(t.id)}
            message={locale.t("servicePriceUpdatedSuccessfully")}
          />
        ));
      },
      onSettled: () => {
        queryClient.invalidateQueries(ServiceQueryKey());
        queryClient.invalidateQueries(MyServiceQueryKey());
      },
    });

  const onUpdateServicePrice = (id: string, price: number) => {
    updateMedServiceMutation.mutate({
      params: { id },
      body: { price },
    });
  };

  const onUpdateServiceUnit = (id: string, unitSize: number) => {
    updateMedServiceMutation.mutate({
      params: { id },
      body: { unitSize },
    });
  };

  const allServicesQuery = apiClient.medServices.getAll.createInfiniteQuery(
    ServiceQueryKey,
    ({ pageParam = 1 }) => ({
      query: {
        get name() {
          return serviceName();
        },
        get code() {
          return serviceCode();
        },
        get dalilCode() {
          return dalilCode();
        },
        get nationalCode() {
          return nationalCode();
        },
        get price() {
          return servicePrice();
        },
        get orderBy() {
          return orderBy();
        },
        get orderDirection() {
          return orderDirection();
        },
        get page() {
          return pageParam;
        },
      },
    }),
    {
      getNextPageParam: (lastPage, _pages) => {
        if (lastPage.body.meta.next === null) return undefined;
        else return lastPage.body.meta.next;
      },
    }
  );

  const myServicesData = () =>
    myServicesQuery.data?.pages.flatMap((page) => page.body.data) ?? [];

  const allServicesData = () =>
    allServicesQuery.data?.pages.flatMap((page) => page.body.data) ?? [];

  const servicesData = () => (isMy() ? myServicesData() : allServicesData());

  const servicesQuery = () => (isMy() ? myServicesQuery : allServicesQuery);

  return {
    onUpdateServicePrice,
    onUpdateServiceUnit,
    setServiceName,
    setServiceCode,
    serviceName,
    serviceCode,
    setDalilCode,
    setNationalCode,
    setOrderBy,
    setOrderDirection,
    setIsMy,
    isMy,
    servicePrice,
    setServicePrice,
    servicesQuery,
    servicesData,
  };
};
