import { Body, Controller, Get,Response,Post } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService:CategoriesService){}
    @Post('/create')
    async create(@Body() data,@Response() res){
        const category=await this.categoriesService.create(data)
        return res.json({
            status:'success',
            category
        })
    }
}
