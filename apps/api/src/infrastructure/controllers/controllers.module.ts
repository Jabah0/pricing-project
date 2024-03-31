import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { MedServiceController } from './medService/medService.controllers';
import { UserController } from './user/user.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [MedServiceController, AuthController, UserController],
})
export class ControllersModule {}
