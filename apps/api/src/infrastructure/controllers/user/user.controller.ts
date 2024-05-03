import { contract } from 'api-contract';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { Body, Controller, Inject, UseGuards } from '@nestjs/common';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { AddNewUserUseCases } from '../../../usecases/user/addNewUser.usecase';
import { AddUserDto } from './user-dto.class';
import { GetUsersUseCase } from 'src/usecases/user/getUsers.usecase';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { GetUserUseCase } from 'src/usecases/user/getUser.usecase';
import { UpdateUserUseCases } from 'src/usecases/user/updateUser.usecase';
import { Roles } from 'src/infrastructure/common/decorators/roles.decorator';
import { Role } from 'src/infrastructure/common/enums/role.enum';
import { RoleGuard } from 'src/infrastructure/common/guards/role.guard';

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
  ) {}

  //@UseGuards(JwtAuthGuard)
  @TsRestHandler(contract.users.create)
  async addNewUser(@Body() user: AddUserDto) {
    return tsRestHandler(contract.users.create, async () => {
      const newUser = await this.addUserUsecaseProxy
        .getInstance()
        .execute(user.fullName, user.username, user.password, user.role);
      return { status: 201, body: newUser };
    });
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @TsRestHandler(contract.users.getAll)
  async getUsers() {
    return tsRestHandler(contract.users.getAll, async () => {
      const users = await this.getUsersUsecaseProxy.getInstance().execute();
      return { status: 200, body: users };
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
