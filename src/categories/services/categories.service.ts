import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/utils/entity/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Categories) private categoriesRepository:Repository<Categories>
    ){}

    async create(data){
        const newCategory= await this.categoriesRepository.create(data)
        return this.categoriesRepository.save(newCategory)
    }
}
