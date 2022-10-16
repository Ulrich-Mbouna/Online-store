import { Global, Module } from "@nestjs/common";
import { AppController } from './app.controller';
import {ProductsController} from "./products.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
const dbConfig = require('../ormconfig.json')
import { ProductsService } from "./models/products.service";
import { Product } from "./models/product.entity";
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { UsersService } from './models/users.service';
import { AuthModule } from './auth/auth.module';
import { User } from "./models/user.entity";
import { CartModule } from './cart/cart.module';
import { Order } from "./models/order.entity";
import { OrdersService } from "./models/orders.service";
import { AccountController } from './account/account.controller';
import { AccountModule } from './account/account.module';

@Global()
@Module({
  imports: [
      TypeOrmModule.forRoot(dbConfig),
    TypeOrmModule.forFeature([Product,User, Order]),
    AdminModule,
    AuthModule,
    CartModule,
    AccountModule
  ],
  controllers: [AppController, ProductsController, AdminController, AccountController],
  providers: [ProductsService, UsersService, OrdersService],
  exports: [ProductsService,UsersService, OrdersService]
})
export class AppModule {}
