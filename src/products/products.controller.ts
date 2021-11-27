import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
  Param,
  Logger,
  Delete,
  Res,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { Response } from 'express';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { Public } from 'src/users/public.auth.decorator';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './interfaces/product.interface';
import { ProductQuery } from './interfaces/product.query.interface';
import { ProductsService } from './products.service';

@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  private readonly logger = new Logger(ProductsController.name);
  @Post()
  @UsePipes(ValidationPipe)
  async createProduct(
    @Body() createproductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productsService.createProduct(createproductDto);
  }

  @Public()
  @Get()
  async listProducts(@Query() query: ProductQuery): Promise<Product[]> {
    return await this.productsService.listAllProducts(query);
  }
  @Public()
  @Get('/:_id')
  async listProductById(
    @Param('_id', ValidacaoParametrosPipe) _id: string,
  ): Promise<Product> {
    const products = await this.productsService.listProductById(_id);
    this.logger.log(products);
    return products;
  }

  @Patch('/:_id')
  @UsePipes(ValidationPipe)
  async updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Param('_id', ValidacaoParametrosPipe) _id: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.productsService.updateProduct(_id, updateProductDto);
    res.status(HttpStatus.OK).send({
      message: `Product has been updated successfully!`,
      httpStatus: HttpStatus.OK,
    });
  }

  @Delete('/:_id')
  async deleteProduct(
    @Param('_id', ValidacaoParametrosPipe) _id: string,
    @Res() res: Response,
  ): Promise<void> {
    await this.productsService.deleteProduct(_id);
    res.status(HttpStatus.OK).send({
      message: `Product has been deleted successfully!`,
      httpStatus: HttpStatus.OK,
    });
  }
}
