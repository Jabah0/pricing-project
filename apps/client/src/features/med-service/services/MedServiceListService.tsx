import { apiClient } from "@/api/api-client";
import { useLocale } from "@/features/locale/locale.context";
import { ErrorToast } from "@/toasts/ErrorToast";
import { SuccessToast } from "@/toasts/SuccessToast";
import { useQueryClient } from "@tanstack/solid-query";
import { ClientInferResponses } from "@ts-rest/core";
import { contract } from "api-contract";
import { createSignal } from "solid-js";
import toast from "solid-toast";
import { InfiniteData } from "@tanstack/solid-query";

type MedServices = ClientInferResponses<typeof contract.medServices.getAll>;

export const MedServiceListService = () => {
  const locale = useLocale();

  const [isMy, setIsMy] = createSignal(false);

  const [serviceName, setServiceName] = createSignal<string>("");
  const [serviceCode, setServiceCode] = createSignal<string>("");
  const [orderBy, setOrderBy] = createSignal<string>();
  const [orderDirection, setOrderDirection] = createSignal<"asc" | "desc">();
  const [servicePrice, setServicePrice] = createSignal<{
    gt?: number;
    lt?: number;
  }>();

  const queryClient = useQueryClient();

  const myServicesQuery =
    apiClient.medServices.getAllByUser.createInfiniteQuery(
      () => [
        "myServices",
        serviceName(),
        serviceCode(),
        servicePrice(),
        orderBy(),
        orderDirection(),
      ],
      ({ pageParam = 1 }) => ({
        query: {
          get name() {
            return serviceName() || "";
          },
          get code() {
            return serviceCode() || "";
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
          queryKey: ["services", serviceName(), serviceCode()],
        });

        const previousData = queryClient.getQueryData<MedServices>([
          "services",
          serviceName(),
          serviceCode(),
          orderBy(),
          orderDirection(),
        ]);

        queryClient.setQueryData<InfiniteData<MedServices>>(
          ["services", serviceName(), serviceCode()],
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
          [
            "myServices",
            serviceName(),
            serviceCode(),
            orderBy(),
            orderDirection(),
          ],
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

        queryClient.setQueryData(
          [
            "services",
            serviceName(),
            serviceCode(),
            orderBy(),
            orderDirection(),
          ],
          typedContext.previousData
        );
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
        queryClient.invalidateQueries([
          "services",
          serviceName(),
          serviceCode(),
          orderBy(),
          orderDirection(),
        ]);
        queryClient.invalidateQueries([
          "myServices",
          serviceName(),
          serviceCode(),
          orderBy(),
          orderDirection(),
        ]);
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
    () => [
      "services",
      serviceName(),
      serviceCode(),
      servicePrice(),
      orderBy(),
      orderDirection(),
    ],
    ({ pageParam = 1 }) => ({
      query: {
        get name() {
          return serviceName() || "";
        },
        get code() {
          return serviceCode() || "";
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
