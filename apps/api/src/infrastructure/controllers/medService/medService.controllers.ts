import { contract } from 'api-contract';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { Controller, Inject, Req, UseGuards } from '@nestjs/common';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { GetMedServiceUseCase } from 'src/usecases/medService/getMedService.usecase';
import { GetMedServicesUseCase } from 'src/usecases/medService/getMedServices.usecase';
import { AddMedServiceUseCase } from 'src/usecases/medService/addMedService.usecase';
import { DeleteMedServiceUseCase } from 'src/usecases/medService/deleteMedService.usecase';
import { UpdateMedServiceUseCase } from 'src/usecases/medService/updateMedService.usecase';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { GetUserMedServicesUseCase } from 'src/usecases/medService/getUserMedServices.usecase';
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
    @Inject(UsecasesProxyModule.UPDATE_MED_SERVICE_USECASES_PROXY)
    private readonly updateMedServiceUseCaseProxy: UseCaseProxy<UpdateMedServiceUseCase>,
    @Inject(UsecasesProxyModule.GET_MED_SERVICES_BY_USER_USECASES_PROXY)
    private readonly getUserMedServicesUseCaseProxy: UseCaseProxy<GetUserMedServicesUseCase>,
  ) {}

  @UseGuards(JwtAuthGuard)
  @TsRestHandler(contract.medServices.getAll)
  async getAll(@Req() request) {
    return tsRestHandler(
      contract.medServices.getAll,
      async ({ query: { name, code, dalilCode } }) => {
        const users = await this.getMedServicesUseCaseProxy
          .getInstance()
          .execute(request.user.id, name, code, dalilCode);
        return {
          status: 200,
          body: users,
        };
      },
    );
  }

  @UseGuards(JwtAuthGuard)
  @TsRestHandler(contract.medServices.getAllByUser)
  async getAllByUser(@Req() req) {
    return tsRestHandler(
      contract.medServices.getAllByUser,
      async ({ query: { name, code, dalilCode } }) => {
        const users = await this.getUserMedServicesUseCaseProxy
          .getInstance()
          .execute(req.user.id, name, code, dalilCode);
        return {
          status: 200,
          body: users,
        };
      },
    );
  }

  @TsRestHandler(contract.medServices.getOne)
  async getOne() {
    return tsRestHandler(
      contract.medServices.getOne,
      async ({ params: { id } }) => {
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
    );
  }

  @TsRestHandler(contract.medServices.create)
  async create() {
    return tsRestHandler(contract.medServices.create, async ({ body }) => {
      const service = await this.addMedServiceUseCaseProxy
        .getInstance()
        .execute(body);
      return {
        status: 201,
        body: service,
      };
    });
  }

  @TsRestHandler(contract.medServices.remove)
  async remove() {
    return tsRestHandler(
      contract.medServices.remove,
      async ({ params: { id } }) => {
        const service = await this.deleteMedServiceUseCaseProxy
          .getInstance()
          .execute(id);

        if (!service) {
          return {
            status: 404,
            body: { message: 'MedService not found' },
          };
        }

        return {
          status: 204,
          body: { message: 'The service deleted successfully' },
        };
      },
    );
  }

  @UseGuards(JwtAuthGuard)
  @TsRestHandler(contract.medServices.patchOne)
  async patchOne(@Req() req) {
    return tsRestHandler(
      contract.medServices.patchOne,
      async ({ params: { id }, body }) => {
        const updatedService = await this.updateMedServiceUseCaseProxy
          .getInstance()
          .execute(req.user.id, id, body);

        if (!updatedService) {
          return { status: 404, body: { message: 'MedService not found' } };
        }

        return {
          status: 200,
          body: { message: 'The service updated successfully' },
        };
      },
    );
  }
}
