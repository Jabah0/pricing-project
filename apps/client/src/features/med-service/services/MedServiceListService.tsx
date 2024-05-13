import { apiClient } from "@/api/api-client";
import { useLocale } from "@/features/locale/locale.context";
import { ErrorToast } from "@/toasts/ErrorToast";
import { SuccessToast } from "@/toasts/SuccessToast";
import { useQueryClient } from "@tanstack/solid-query";
import { ClientInferResponses } from "@ts-rest/core";
import { MedService, contract } from "api-contract";
import { createSignal } from "solid-js";
import toast from "solid-toast";
import { InfiniteData } from "@tanstack/solid-query";

type MedServices = ClientInferResponses<typeof contract.medServices.getAll>;

export const MedServiceListService = () => {
  const locale = useLocale();

  const [isMy, setIsMy] = createSignal(false);

  const [serviceName, setServiceName] = createSignal<string>();
  const [serviceCode, setServiceCode] = createSignal<string>();

  const queryClient = useQueryClient();

  const myServicesQuery =
    apiClient.medServices.getAllByUser.createInfiniteQuery(
      () => ["myServices", serviceName(), serviceCode()],
      ({ pageParam = 1 }) => ({
        query: {
          get name() {
            return serviceName();
          },
          get code() {
            return serviceCode();
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
        ]);

        let updatedService: MedService;
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

              updatedService = targetService;
            }

            return {
              ...old,
            };
          }
        );

        queryClient.setQueryData<InfiniteData<MedServices>>(
          ["myServices", serviceName(), serviceCode()],
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

              updatedService = targetService;
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
          ["services", serviceName(), serviceCode()],
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
        ]);
        queryClient.invalidateQueries([
          "myServices",
          serviceName(),
          serviceCode(),
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

  const servicesQuery = apiClient.medServices.getAll.createInfiniteQuery(
    () => ["services", serviceName(), serviceCode()],
    ({ pageParam = 1 }) => ({
      query: {
        get name() {
          return serviceName();
        },
        get code() {
          return serviceCode();
        },
        get page() {
          return pageParam;
        },
      },
    })
  );

  const myServicesData = () =>
    myServicesQuery.data?.pages.flatMap((page) => page.body.data) ?? [];

  const allServicesData = () =>
    servicesQuery.data?.pages.flatMap((page) => page.body.data) ?? [];

  const servicesData = () => (isMy() ? myServicesData() : allServicesData());

  const services = () => (isMy() ? myServicesQuery : servicesQuery);

  return {
    onUpdateServicePrice,
    onUpdateServiceUnit,
    setServiceName,
    setServiceCode,
    serviceName,
    serviceCode,
    setIsMy,
    isMy,
    servicesQuery: services,
    servicesData,
  };
};
