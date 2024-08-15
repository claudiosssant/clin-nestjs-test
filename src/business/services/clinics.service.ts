import { ErrorMessages } from './../../common/enums/error-messages.enum';
import { CreateClinicDto } from './../../common/dtos/create-clinics-dto';
import { Clinics } from './../../common/entities';
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateClinicDto } from 'src/common/dtos/update-clinic-dto';
import { ClinicsPaginationDto } from 'src/common/dtos/clinic-pagination-dto';

@Injectable()
export class ClinicsService {
  constructor(
    @Inject('CLINICS_REPOSITORY')
    private clinicsRepository: typeof Clinics
  ) {}

  async create(createClinicDto: CreateClinicDto) {
    await this.checkClinicAlreadyRegistered(createClinicDto.name);
    return this.createClinic(createClinicDto);
  }

  async list() {
    const clinics = await this.clinicsRepository.findAll();
    return clinics.map((clinic: Clinics) => ({
      id: clinic.id,
      name: clinic.name,
      phone: clinic.phone,
      ownerName: clinic.ownerName,
      cep: clinic.cep,
      city: clinic.city,
      uf: clinic.uf,
      street: clinic.street,
      number: clinic.number,
      neighborhood: clinic.neighborhood,
      complement: clinic.complement,
    }));
  }

  async update(id: string, updateClinicDto: UpdateClinicDto): Promise<Clinics> {
    const clinic = await this.clinicById(id);
    if (!clinic) {
      throw new NotFoundException(ErrorMessages.CLINIC_NOT_FOUND);
    }
    await clinic.update(updateClinicDto);
    return clinic;
  }

  async delete(id: string): Promise<void> {
    const clinic = await this.clinicsRepository.findByPk(id);
    if (!clinic) {
      throw new NotFoundException(ErrorMessages.CLINIC_NOT_FOUND);
    }
    await clinic.destroy();
  }

  async paginate(paginationDto: ClinicsPaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const offset = (page - 1) * limit;

    const { rows, count } = await this.clinicsRepository.findAndCountAll({
      offset,
      limit,
    });

    return {
      results: rows,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    };
  }

  private async createClinic(createClinicDto: CreateClinicDto) {
    try {
      return await this.clinicsRepository.create<Clinics>({
        name: createClinicDto.name,
        ownerName: createClinicDto.ownerName,
        phone: createClinicDto.phone,
        cep: createClinicDto.cep,
        city: createClinicDto.city,
        uf: createClinicDto.uf,
        street: createClinicDto.street,
        number: createClinicDto.number,
        neighborhood: createClinicDto.neighborhood,
        complement: createClinicDto.complement,
      });
    } catch (error) {
      throw new ConflictException('Erro ao criar clínica. Verifique os dados fornecidos.');
    }
  }

  async findAll(): Promise<Clinics[]> {
    return this.clinicsRepository.findAll<Clinics>();
  }

  findOne(id: number) {
    return this.clinicsRepository.findOne<Clinics>({
      where: {
        id,
      },
    });
  }

  findByCEP(cep: string) {
    return this.clinicsRepository.findOne<Clinics>({
      where: {
        cep,
      },
    });
  }

  validateLogin(document: string) {
    return !!this.findByCEP(document);
  }

  private async clinicById(id: string) {
    return this.clinicsRepository.findOne({
      where: { id },
    });
  }

  private async clinicExists(name: string) {
    return this.clinicsRepository.findOne({
      where: { name },
    });
  }

  private async checkClinicAlreadyRegistered(name: string) {
    const clinic = await this.clinicExists(name);
    if (clinic) {
      throw new ConflictException(ErrorMessages.CLINIC_ALREADY_REGISTERED);
    }
  }
}
