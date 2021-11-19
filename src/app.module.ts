import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'url_mongodb', // Substituia para uma URL válida de uma aplicação MONGODB
      { useNewUrlParser: true, useUnifiedTopology: true },
    ),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
