import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClinicsService } from 'src/business/services/clinics.service';
import { CreateClinicDto } from 'src/common/dtos/create-clinics-dto';
import { JwtAuthGuard } from 'src/common/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ClinicDto } from 'src/common/dtos/clinic-dto';
import { UpdateClinicDto } from 'src/common/dtos/update-clinic-dto';

@Controller('/clinics')
export class ClinicController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createClinicDto: CreateClinicDto) {
    return this.clinicsService.create(createClinicDto);
  }

  @Get()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: ClinicDto, isArray: true })
  list() {
    return this.clinicsService.list();
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateClinicDto: UpdateClinicDto) {
    return this.clinicsService.update(id, updateClinicDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  delete(@Param('id') id: string) {
    return this.clinicsService.delete(id);
  }
}
