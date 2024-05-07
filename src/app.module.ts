import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ErrorInterceptor } from './error.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerService } from './logger.service';
import { SecurityMiddleware } from './security.middleware';
import { PrismaModule } from './prisma.module';
import { PrismaService } from './prisma.service';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LocationsModule } from './locations/locations.module';
import { CompaniesModule } from './companies/companies.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PrismaModule,
    UploadModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: `${process.env.jwt_secret}`,
      signOptions: { expiresIn: '45m' },
    }),
    LocationsModule,
    CompaniesModule,
    JobsModule,
  ],
  providers: [
    LoggerService,
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
  exports: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SecurityMiddleware).forRoutes('*');
  }
}
