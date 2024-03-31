import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { AddNewUserUseCases } from '../../../usecases/user/addNewUser.usecase';
import { AddUserDto } from './user-dto.class';
import { UserPresenters } from './user.presenters';
import { GetUsersUseCase } from 'src/usecases/user/getUsers.usecase';

@Controller('users')
@ApiTags('users')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels()
export class UserController {
  constructor(
    @Inject(UsecasesProxyModule.ADD_NEW_USER_USECASES_PROXY)
    private readonly addUserUsecaseProxy: UseCaseProxy<AddNewUserUseCases>,
    @Inject(UsecasesProxyModule.GET_USERS_USECASES_PROXY)
    private readonly getUsersUsecaseProxy: UseCaseProxy<GetUsersUseCase>,
  ) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ description: 'add new user' })
  async getUsers() {
    const users = await this.getUsersUsecaseProxy.getInstance().execute();

    return users.map((user) => new UserPresenters(user));
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: AddUserDto })
  @ApiOperation({ description: 'add new user' })
  async addUser(@Body() user: AddUserDto) {
    const newUser = await this.addUserUsecaseProxy
      .getInstance()
      .execute(user.username, user.password);

    return new UserPresenters(newUser);
  }
}
