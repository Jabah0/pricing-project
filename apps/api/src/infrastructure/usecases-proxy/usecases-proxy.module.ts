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
import { GetUserMedServicesUseCase } from 'src/usecases/medService/getUserMedServices.usecase';
import { UpdateUserUseCases } from 'src/usecases/user/updateUser.usecase';
import { GetUserInformationUseCase } from 'src/usecases/user/getUserInformation';
import { AccessControlModule } from '../services/role/access-control.module';
import { GetUserServicesStatusUseCase } from 'src/usecases/user/getUserServicesStatus.usecase';
import { GetServicesNumberOfPricingUseCase } from 'src/usecases/medService/getServicesNumberOfPricing';
import { UpdateNumberOfPricingUseCase } from 'src/usecases/medService/updateNumberOfPricing';
import { UpdateMyPasswordUseCases } from 'src/usecases/user/updateMyPassword.usecase';
import { UpdateMyInfoUseCases } from 'src/usecases/user/updateMyInfo.usecase';

@Module({
  imports: [
    LoggerModule,
    JwtModule,
    AccessControlModule,
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
  static UPDATE_USER_USECASES_PROXY = 'updateUserUsecasesProxy';
  static GET_USER_SERVICES_STATUS_USECASES_PROXY =
    'getUserServicesStatusUseCasesProxy';
  static GET_USER_INFORMATION_USECASES_PROXY =
    'getUserInformationUsecasesProxy';
  static UPDATE_MY_PASSWORD_USECASES_PROXY = 'updateMyPasswordUsecasesProxy';
  static UPDATE_MY_INFO_USECASES_PROXY = 'updateMyInfoUsecasesProxy';

  // MedService
  static GET_MED_SERVICE_USECASES_PROXY = 'getMedServiceUsecasesProxy';
  static GET_MED_SERVICES_USECASES_PROXY = 'getMedServicesUsecasesProxy';
  static POST_MED_SERVICE_USECASES_PROXY = 'postMedServiceUsecasesProxy';
  static DELETE_MED_SERVICE_USECASES_PROXY = 'deleteMedServiceUsecasesProxy';
  static UPDATE_MED_SERVICE_USECASES_PROXY = 'updateMedServiceUsecasesProxy';
  static GET_MED_SERVICES_BY_USER_USECASES_PROXY =
    'getMedServicesByUserUsecasesProxy';
  static GET_MED_SERVICES_NUMBER_OF_PRICING_USECASES_PROXY =
    'getMedServicesNumberOfPricing';
  static UPDATE_MED_SERVICES_NUMBER_OF_PRICING_USECASES_PROXY =
    'updateMedServicesNumberOfPricing';

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
          inject: [LoggerService, DatabaseUserRepository, BcryptService],
          provide: UsecasesProxyModule.UPDATE_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new UpdateUserUseCases(logger, userRepository, bcryptService),
            ),
        },
        {
          inject: [LoggerService, DatabaseUserRepository],
          provide: UsecasesProxyModule.GET_USER_SERVICES_STATUS_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: DatabaseUserRepository,
          ) =>
            new UseCaseProxy(
              new GetUserServicesStatusUseCase(logger, userRepository),
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
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.GET_USER_INFORMATION_USECASES_PROXY,
          useFactory: (userRepository: DatabaseUserRepository) =>
            new UseCaseProxy(new GetUserInformationUseCase(userRepository)),
        },
        {
          inject: [LoggerService, DatabaseUserRepository, BcryptService],
          provide: UsecasesProxyModule.UPDATE_MY_PASSWORD_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new UpdateMyPasswordUseCases(
                logger,
                userRepository,
                bcryptService,
              ),
            ),
        },
        {
          inject: [LoggerService, DatabaseUserRepository],
          provide: UsecasesProxyModule.UPDATE_MY_INFO_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: DatabaseUserRepository,
          ) =>
            new UseCaseProxy(new UpdateMyInfoUseCases(logger, userRepository)),
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
          inject: [DatabaseMedServiceRepository],
          provide: UsecasesProxyModule.GET_MED_SERVICES_BY_USER_USECASES_PROXY,
          useFactory: (medServiceRepository: DatabaseMedServiceRepository) =>
            new UseCaseProxy(
              new GetUserMedServicesUseCase(medServiceRepository),
            ),
        },
        {
          inject: [DatabaseMedServiceRepository],
          provide:
            UsecasesProxyModule.GET_MED_SERVICES_NUMBER_OF_PRICING_USECASES_PROXY,
          useFactory: (medServiceRepository: DatabaseMedServiceRepository) =>
            new UseCaseProxy(
              new GetServicesNumberOfPricingUseCase(medServiceRepository),
            ),
        },
        {
          inject: [LoggerService, DatabaseMedServiceRepository],
          provide:
            UsecasesProxyModule.UPDATE_MED_SERVICES_NUMBER_OF_PRICING_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            medServiceRepository: DatabaseMedServiceRepository,
          ) =>
            new UseCaseProxy(
              new UpdateNumberOfPricingUseCase(logger, medServiceRepository),
            ),
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
          provide: UsecasesProxyModule.UPDATE_MED_SERVICE_USECASES_PROXY,
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
        UsecasesProxyModule.GET_MED_SERVICES_BY_USER_USECASES_PROXY,
        UsecasesProxyModule.POST_MED_SERVICE_USECASES_PROXY,
        UsecasesProxyModule.GET_MED_SERVICES_NUMBER_OF_PRICING_USECASES_PROXY,
        UsecasesProxyModule.UPDATE_MED_SERVICES_NUMBER_OF_PRICING_USECASES_PROXY,
        UsecasesProxyModule.DELETE_MED_SERVICE_USECASES_PROXY,
        UsecasesProxyModule.UPDATE_MED_SERVICE_USECASES_PROXY,
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        UsecasesProxyModule.ADD_NEW_USER_USECASES_PROXY,
        UsecasesProxyModule.UPDATE_USER_USECASES_PROXY,
        UsecasesProxyModule.UPDATE_MY_PASSWORD_USECASES_PROXY,
        UsecasesProxyModule.UPDATE_MY_INFO_USECASES_PROXY,
        UsecasesProxyModule.GET_USERS_USECASES_PROXY,
        UsecasesProxyModule.GET_USER_USECASES_PROXY,
        UsecasesProxyModule.GET_USER_INFORMATION_USECASES_PROXY,
        UsecasesProxyModule.GET_USER_SERVICES_STATUS_USECASES_PROXY,
      ],
    };
  }
}
