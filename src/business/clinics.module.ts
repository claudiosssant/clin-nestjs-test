import { Module } from '@nestjs/common';
import { ClinicsService } from './services/clinics.service';
import { ClinicController } from '../distribution/rest-api/clinic.controller';
import { ClinicsProviders } from 'src/common/providers';

@Module({
  providers: [ClinicsService, ...ClinicsProviders],
  controllers: [ClinicController],
  exports: [ClinicsService],
})
export class ClinicsModule {}