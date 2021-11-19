import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './interfaces/product.interface';
import { Logger } from '@nestjs/common';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductQuery } from './interfaces/product.query.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  private readonly logger = new Logger(ProductsService.name);

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name } = createProductDto;
    const productExists = await this.productModel.findOne({ name }).exec();

    if (productExists) {
      throw new BadRequestException(`${name} exists in DB`);
    }

    const createdProduct = new this.productModel(createProductDto);
    return await createdProduct.save();
  }

  async listAllProducts(query?: ProductQuery): Promise<Product[]> {
    let products: Product[];
    let filteringBy: { $gte?: number; $lte?: number };

    if (query.minvalue || query.maxvalue) {
      const { minvalue, maxvalue } = query;
      if (minvalue && !maxvalue) {
        filteringBy = { $gte: minvalue };
      } else if (minvalue && maxvalue) {
        filteringBy = { $gte: minvalue, $lte: maxvalue };
      } else if (!minvalue && maxvalue) {
        filteringBy = { $lte: maxvalue };
      }
    }
    !filteringBy
      ? (products = await this.productModel.find().exec())
      : (products = await this.productModel
          .find({ sellingPrice: filteringBy })
          .exec());

    return products;
  }

  async listProductById(_id: string): Promise<Product> {
    const productFound = await this.productModel.findById({ _id }).exec();

    if (!productFound) {
      throw new NotFoundException(`Product with ID ${_id} not found!`);
    }

    return productFound;
  }

  async updateProduct(
    _id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<void> {
    const productFound = await this.productModel.findById({ _id }).exec();
    if (!productFound) throw new NotFoundException(`Product not found`);
    await this.productModel
      .findByIdAndUpdate({ _id }, { $set: updateProductDto })
      .exec();
  }

  async deleteProduct(_id: string): Promise<void> {
    const productDeleted = await this.productModel
      .findByIdAndDelete({ _id })
      .exec();
    if (!productDeleted)
      throw new BadRequestException(`Product with ID: ${_id} was not found`);
  }
}
