import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
@Injectable()
export class CompaniesService {

  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>
  ){}
  create(createCompanyDto: CreateCompanyDto) {
    const addedCompany = this.companyRepository.create(createCompanyDto);
     this.companyRepository.save(addedCompany);
     return addedCompany;
  }

  findAll() {
    return this.companyRepository.find({relations:['galleries', 'service', 'event']});
  }

  findOne(id: number) {
    this.companyRepository.findOneBy({id});
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const updatedCompany = await this.companyRepository.update({ id }, updateCompanyDto);
    return updatedCompany;
  }

  remove(id: number) {
    return this.companyRepository.delete(id);
  }
}

