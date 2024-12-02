import { apiClient } from "@/api/api-client";
import { Table } from "@/components/Table";
import { Row } from "@tanstack/solid-table";
import { MedService } from "api-contract";
import { ServicePricesColumns } from "./ServicePricesColumn";
import { DotsRotateIcon } from "@/assets/icons";
import { Match, Switch } from "solid-js";
import { useLocale } from "@/features/locale/LocaleProvider";

export const MedServicePricesTable = ({ row }: { row: Row<MedService> }) => {
  const medServicePricesQuery =
    apiClient.medServices.getMedServicePrices.createQuery(
      () => ["medServicePrices", row.id],
      { params: { id: row.id } }
    );

  const locale = useLocale();

  return (
    <Switch>
      <Match when={medServicePricesQuery.isLoading}>
        <div class="flex justify-center items-center">
          <DotsRotateIcon class="animate-spin h-6 w-6" />
        </div>
      </Match>
      <Match when={!medServicePricesQuery.isLoading}>
        <Switch>
          <Match
            when={
              medServicePricesQuery.data?.body.length &&
              medServicePricesQuery.data?.body.length > 0
            }
          >
            <Table
              data={medServicePricesQuery.data?.body || []}
              columns={ServicePricesColumns}
            />
          </Match>
          <Match when={medServicePricesQuery.data?.body.length === 0}>
            <div class="flex justify-center items-center w-full p-2">
              <p>{locale.t("noServicePrices")}</p>
            </div>
          </Match>
        </Switch>
      </Match>
    </Switch>
  );
};
