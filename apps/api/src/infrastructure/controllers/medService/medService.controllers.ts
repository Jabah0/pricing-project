import { contract } from 'api-contract';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { Controller, Inject } from '@nestjs/common';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { GetMedServiceUseCase } from 'src/usecases/medService/getMedService.usecase';
import { GetMedServicesUseCase } from 'src/usecases/medService/getMedServices.usecase';
import { AddMedServiceUseCase } from 'src/usecases/medService/addMedService.usecase';
import { DeleteMedServiceUseCase } from 'src/usecases/medService/deleteMedService.usecase';

@Controller()
export class MedServiceController {
  constructor(
    @Inject(UsecasesProxyModule.GET_MED_SERVICE_USECASES_PROXY)
    private readonly getMedServiceUseCaseProxy: UseCaseProxy<GetMedServiceUseCase>,
    @Inject(UsecasesProxyModule.GET_MED_SERVICES_USECASES_PROXY)
    private readonly getMedServicesUseCaseProxy: UseCaseProxy<GetMedServicesUseCase>,
    @Inject(UsecasesProxyModule.POST_MED_SERVICE_USECASES_PROXY)
    private readonly addMedServiceUseCaseProxy: UseCaseProxy<AddMedServiceUseCase>,
    @Inject(UsecasesProxyModule.DELETE_MED_SERVICE_USECASES_PROXY)
    private readonly deleteMedServiceUseCaseProxy: UseCaseProxy<DeleteMedServiceUseCase>,
  ) {}

  @TsRestHandler(contract.medServices)
  async handler() {
    return tsRestHandler(contract.medServices, {
      getAll: async () => {
        return {
          status: 200,
          body: await this.getMedServicesUseCaseProxy.getInstance().execute(),
        };
      },
      getOne: async ({ params: { id } }) => {
        const service = await this.getMedServiceUseCaseProxy
          .getInstance()
          .execute(id);

        if (!service) {
          return {
            status: 404,
            body: {
              message: 'MedService not found',
            },
          };
        }

        return {
          status: 200,
          body: service,
        };
      },

      create: async ({ body }) => {
        const service = await this.addMedServiceUseCaseProxy
          .getInstance()
          .execute(body);
        return {
          status: 201,
          body: service,
        };
      },

      remove: async ({ params: { id } }) => {
        const service = await this.deleteMedServiceUseCaseProxy
          .getInstance()
          .execute(id);

        if (!service) {
          return {
            status: 404,
            body: { message: 'MedService not found' },
          };
        }
      },
    });
  }
}
