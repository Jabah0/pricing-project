import { apiClient } from "@/api/api-client";
import { useLocale } from "@/features/locale/locale.context";
import { ErrorToast } from "@/toasts/ErrorToast";
import { SuccessToast } from "@/toasts/SuccessToast";
import { useQueryClient } from "@tanstack/solid-query";
import { ClientInferResponses } from "@ts-rest/core";
import { MedService, contract } from "api-contract";
import { createSignal } from "solid-js";
import toast from "solid-toast";

type MedServices = ClientInferResponses<typeof contract.medServices.getAll>;

export const MedServiceListService = () => {
  const locale = useLocale();

  const [isMy, setIsMy] = createSignal(false);

  const [serviceName, setServiceName] = createSignal<string>();
  const [serviceCode, setServiceCode] = createSignal<string>();

  const queryClient = useQueryClient();

  const myServicesQuery = apiClient.medServices.getAllByUser.createQuery(
    () => ["myServices", serviceName(), serviceCode()],
    {
      query: {
        get name() {
          return serviceName();
        },
        get code() {
          return serviceCode();
        },
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
        queryClient.setQueryData<MedServices>(
          ["services", serviceName(), serviceCode()],
          (old) => {
            if (!old) return undefined;

            const targetService = old.body.find(
              (item) => item.id === newService.params.id
            );

            if (targetService) {
              targetService.price =
                newService.body?.price || targetService.price;

              updatedService = targetService;
            }

            return {
              ...old,
              body: [...old.body],
            };
          }
        );

        queryClient.setQueryData<MedServices>(
          ["myServices", serviceName(), serviceCode()],
          (old) => {
            if (!old) return undefined;

            const targetService = old.body.find(
              (item) => item.id === newService.params.id
            );

            if (targetService) {
              targetService.price =
                newService.body?.price || targetService.price;
            } else {
              return {
                ...old,
                body: [...old.body, updatedService],
              };
            }

            return {
              ...old,
              body: [...old.body],
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

  const servicesQuery = apiClient.medServices.getAll.createQuery(
    () => ["services", serviceName(), serviceCode()],
    {
      query: {
        get name() {
          return serviceName();
        },
        get code() {
          return serviceCode();
        },
      },
    }
  );

  const services = () => {
    return isMy() ? myServicesQuery : servicesQuery;
  };

  return {
    onUpdateServicePrice,
    setServiceName,
    setServiceCode,
    serviceName,
    serviceCode,
    setIsMy,
    isMy,
    servicesQuery: services,
  };
};
