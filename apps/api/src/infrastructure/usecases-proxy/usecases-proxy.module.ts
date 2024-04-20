import { DynamicModule, Module } from '@nestjs/common';
import { AddMedServiceUseCase } from '../../usecases/medService/addMedService.usecase';
import { DeleteMedServiceUseCase } from '../../usecases/medService/deleteMedService.usecase';
import { GetMedServiceUseCase } from '../../usecases/medService/getMedService.usecase';
import { GetMedServicesUseCase } from '../../usecases/medService/getMedServices.usecase';
import { IsAuthenticatedUseCases } from '../../usecases/auth/isAuthenticated.usecase';
import { LoginUseCases } from '../../usecases/auth/login.usecase';
import { LogoutUseCases } from '../../usecases/auth/logout.usecase';
import { AddNewUserUseCases } from '../../usecases/user/addNewUser.usecase';

import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtModule } from '../services/jwt/jwt.module';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { RepositoriesModule } from '../repositories/repositories.module';

import { DatabaseMedServiceRepository } from '../repositories/medService.repository';
import { DatabaseUserRepository } from '../repositories/user.repository';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { UseCaseProxy } from './usecases-proxy';
import { GetUsersUseCase } from '../../usecases/user/getUsers.usecase';
import { GetUserUseCase } from '../../usecases/user/getUser.usecase';
import { UpdateMedServiceUseCase } from 'src/usecases/medService/updateMedService.usecase';

@Module({
  imports: [
    LoggerModule,
    JwtModule,
    BcryptModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    ExceptionsModule,
  ],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';

  // User
  static ADD_NEW_USER_USECASES_PROXY = 'addNewUserUsecasesProxy';
  static GET_USERS_USECASES_PROXY = 'getUsersUsecasesProxy';
  static GET_USER_USECASES_PROXY = 'getUserUsecasesProxy';

  // MedService
  static GET_MED_SERVICE_USECASES_PROXY = 'getMedServiceUsecasesProxy';
  static GET_MED_SERVICES_USECASES_PROXY = 'getMedServicesUsecasesProxy';
  static POST_MED_SERVICE_USECASES_PROXY = 'postMedServiceUsecasesProxy';
  static DELETE_MED_SERVICE_USECASES_PROXY = 'deleteMedServiceUsecasesProxy';
  static UPDATE_MED_SERVICE_USEcASES_PROXY = 'updateMedServiceUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [LoggerService, DatabaseUserRepository, BcryptService],
          provide: UsecasesProxyModule.ADD_NEW_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new AddNewUserUseCases(logger, userRepository, bcryptService),
            ),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.GET_USERS_USECASES_PROXY,
          useFactory: (userRepository: DatabaseUserRepository) =>
            new UseCaseProxy(new GetUsersUseCase(userRepository)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.GET_USER_USECASES_PROXY,
          useFactory: (userRepository: DatabaseUserRepository) =>
            new UseCaseProxy(new GetUserUseCase(userRepository)),
        },
        {
          inject: [
            LoggerService,
            JwtTokenService,
            EnvironmentConfigService,
            DatabaseUserRepository,
            BcryptService,
          ],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new LoginUseCases(
                logger,
                jwtTokenService,
                config,
                userRepo,
                bcryptService,
              ),
            ),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) =>
            new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
        },
        {
          inject: [],
          provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
        {
          inject: [DatabaseMedServiceRepository],
          provide: UsecasesProxyModule.GET_MED_SERVICE_USECASES_PROXY,
          useFactory: (medServiceRepository: DatabaseMedServiceRepository) =>
            new UseCaseProxy(new GetMedServiceUseCase(medServiceRepository)),
        },
        {
          inject: [DatabaseMedServiceRepository],
          provide: UsecasesProxyModule.GET_MED_SERVICES_USECASES_PROXY,
          useFactory: (medServiceRepository: DatabaseMedServiceRepository) =>
            new UseCaseProxy(new GetMedServicesUseCase(medServiceRepository)),
        },
        {
          inject: [LoggerService, DatabaseMedServiceRepository],
          provide: UsecasesProxyModule.POST_MED_SERVICE_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            medServiceRepository: DatabaseMedServiceRepository,
          ) =>
            new UseCaseProxy(
              new AddMedServiceUseCase(logger, medServiceRepository),
            ),
        },
        {
          inject: [LoggerService, DatabaseMedServiceRepository],
          provide: UsecasesProxyModule.DELETE_MED_SERVICE_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            medServiceRepository: DatabaseMedServiceRepository,
          ) =>
            new UseCaseProxy(
              new DeleteMedServiceUseCase(logger, medServiceRepository),
            ),
        },
        {
          inject: [LoggerService, DatabaseMedServiceRepository],
          provide: UsecasesProxyModule.UPDATE_MED_SERVICE_USEcASES_PROXY,
          useFactory: (
            logger: LoggerService,
            medServiceRepository: DatabaseMedServiceRepository,
          ) =>
            new UseCaseProxy(
              new UpdateMedServiceUseCase(logger, medServiceRepository),
            ),
        },
      ],
      exports: [
        UsecasesProxyModule.GET_MED_SERVICE_USECASES_PROXY,
        UsecasesProxyModule.GET_MED_SERVICES_USECASES_PROXY,
        UsecasesProxyModule.POST_MED_SERVICE_USECASES_PROXY,
        UsecasesProxyModule.DELETE_MED_SERVICE_USECASES_PROXY,
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        UsecasesProxyModule.ADD_NEW_USER_USECASES_PROXY,
        UsecasesProxyModule.GET_USERS_USECASES_PROXY,
        UsecasesProxyModule.GET_USER_USECASES_PROXY,
        UsecasesProxyModule.UPDATE_MED_SERVICE_USEcASES_PROXY,
      ],
    };
  }
}
