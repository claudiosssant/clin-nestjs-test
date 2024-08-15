import { UsersProviders } from './../common/providers/users.providers';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { Clinics, Users } from 'src/common/entities';
import { ClinicsProviders } from 'src/common/providers';

@Module({
  imports: [SequelizeModule.forFeature([Users, Clinics])],
  exports: [SequelizeModule],
  providers: [...UsersProviders, ...ClinicsProviders],
})
export class DataAccessModule {}
