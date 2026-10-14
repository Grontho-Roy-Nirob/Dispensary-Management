import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module.js';
import { MedicineModule } from './medicine/medicine.module.js';
import { SalesModule } from './sales/sales.module.js';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.DB_PASSWORD,
      database: 'MedicineDB',
      autoLoadEntities: true,
      synchronize: true,
    }),

    UserModule,
    MedicineModule,
    SalesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
