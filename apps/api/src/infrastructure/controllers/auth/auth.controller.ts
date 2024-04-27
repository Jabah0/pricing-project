import { Controller, Inject, Req, Request, UseGuards } from '@nestjs/common';

import JwtRefreshGuard from '../../common/guards/jwtRefresh.guard';
import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';
import { LoginGuard } from '../../common/guards/login.guard';

import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { LoginUseCases } from '../../../usecases/auth/login.usecase';
import { IsAuthenticatedUseCases } from '../../../usecases/auth/isAuthenticated.usecase';
import { LogoutUseCases } from '../../../usecases/auth/logout.usecase';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from 'api-contract';

@Controller()
export class AuthController {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
    @Inject(UsecasesProxyModule.LOGOUT_USECASES_PROXY)
    private readonly logoutUsecaseProxy: UseCaseProxy<LogoutUseCases>,
    @Inject(UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY)
    private readonly isAuthUsecaseProxy: UseCaseProxy<IsAuthenticatedUseCases>,
  ) {}

  @UseGuards(LoginGuard)
  @TsRestHandler(contract.auth.login)
  async login(@Request() request: any) {
    return tsRestHandler(contract.auth.login, async ({ body }) => {
      const accessTokenCookie = await this.loginUsecaseProxy
        .getInstance()
        .getCookieWithJwtToken(body.username);
      console.log('accessTokenCookie executed successfully');
      const refreshTokenCookie = await this.loginUsecaseProxy
        .getInstance()
        .getCookieWithJwtRefreshToken(body.username);
      request.res.setHeader('Set-Cookie', [
        accessTokenCookie,
        refreshTokenCookie,
      ]);

      return { status: 200, body: 'Login successful' };
    });
  }

  @UseGuards(JwtAuthGuard)
  @TsRestHandler(contract.auth.logout)
  async logout(@Req() request: any) {
    return tsRestHandler(contract.auth.logout, async () => {
      const cookie = await this.logoutUsecaseProxy.getInstance().execute();
      request.res.setHeader('Set-Cookie', cookie);
      return { status: 200, body: 'Logout successful' };
    });
  }

  @UseGuards(JwtAuthGuard)
  @TsRestHandler(contract.auth.isAuthenticated)
  async isAuthenticated(@Req() request: any) {
    return tsRestHandler(contract.auth.isAuthenticated, async () => {
      const user = await this.isAuthUsecaseProxy
        .getInstance()
        .execute(request.user.username);
      return { status: 200, body: user.username };
    });
  }

  @UseGuards(JwtRefreshGuard)
  @TsRestHandler(contract.auth.refresh)
  async refresh(@Req() request: any) {
    return tsRestHandler(contract.auth.refresh, async () => {
      const accessTokenCookie = await this.loginUsecaseProxy
        .getInstance()
        .getCookieWithJwtToken(request.user.username);
      request.res.setHeader('Set-Cookie', accessTokenCookie);
      return { status: 200, body: 'Refresh successful' };
    });
  }
}
