import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { jwtConstants } from './constants';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(jwtConstants.mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    ProductsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
