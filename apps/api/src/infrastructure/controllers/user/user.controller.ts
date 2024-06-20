import { contract } from 'api-contract';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { Body, Controller, Inject, Req, UseGuards } from '@nestjs/common';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { AddNewUserUseCases } from '../../../usecases/user/addNewUser.usecase';
import { AddUserDto } from './user-dto.class';
import { GetUsersUseCase } from 'src/usecases/user/getUsers.usecase';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { GetUserUseCase } from 'src/usecases/user/getUser.usecase';
import { UpdateUserUseCases } from 'src/usecases/user/updateUser.usecase';
import { Roles } from 'src/infrastructure/common/decorators/roles.decorator';
import { Roles as RolesEnum } from 'src/infrastructure/common/enums/role.enum';
import { RoleGuard } from 'src/infrastructure/common/guards/role.guard';
import { GetUserServicesStatusUseCase } from 'src/usecases/user/getUserServicesStatus.usecase';

@Controller()
export class UserController {
  constructor(
    @Inject(UsecasesProxyModule.ADD_NEW_USER_USECASES_PROXY)
    private readonly addUserUsecaseProxy: UseCaseProxy<AddNewUserUseCases>,
    @Inject(UsecasesProxyModule.GET_USERS_USECASES_PROXY)
    private readonly getUsersUsecaseProxy: UseCaseProxy<GetUsersUseCase>,
    @Inject(UsecasesProxyModule.GET_USER_USECASES_PROXY)
    private readonly getUserUsecaseProxy: UseCaseProxy<GetUserUseCase>,
    @Inject(UsecasesProxyModule.UPDATE_USER_USECASES_PROXY)
    private readonly updateUserUsecaseProxy: UseCaseProxy<UpdateUserUseCases>,
    @Inject(UsecasesProxyModule.GET_USER_SERVICES_STATUS_USECASES_PROXY)
    private readonly getUserServicesStatusProxy: UseCaseProxy<GetUserServicesStatusUseCase>,
  ) {}

  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @TsRestHandler(contract.users.create)
  async addNewUser(@Body() user: AddUserDto) {
    return tsRestHandler(contract.users.create, async () => {
      const newUser = await this.addUserUsecaseProxy
        .getInstance()
        .execute(user.fullName, user.username, user.password, user.role);
      return { status: 201, body: newUser };
    });
  }

  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @TsRestHandler(contract.users.getAll)
  async getUsers() {
    return tsRestHandler(
      contract.users.getAll,
      async ({ query: { page, perPage, role, username, fullName } }) => {
        const users = await this.getUsersUsecaseProxy
          .getInstance()
          .execute(page, perPage, role, username, fullName);
        return { status: 200, body: users };
      },
    );
  }

  @UseGuards(JwtAuthGuard)
  @TsRestHandler(contract.users.servicesStatus)
  async userServicesStatus(@Req() request: any) {
    return tsRestHandler(contract.users.servicesStatus, async () => {
      const result = await this.getUserServicesStatusProxy
        .getInstance()
        .execute(request.user.id);
      return { status: 200, body: result };
    });
  }

  @UseGuards(JwtAuthGuard)
  @TsRestHandler(contract.users.getOne)
  async getUser() {
    return tsRestHandler(contract.users.getOne, async ({ params: { id } }) => {
      const user = await this.getUserUsecaseProxy.getInstance().execute(id);

      return { status: 200, body: user };
    });
  }

  @UseGuards(JwtAuthGuard)
  @TsRestHandler(contract.users.patch)
  async patchUser() {
    return tsRestHandler(
      contract.users.patch,
      async ({ body, params: { id } }) => {
        const user = await this.updateUserUsecaseProxy
          .getInstance()
          .execute(id, body);
        return { status: 200, body: user };
      },
    );
  }
}
