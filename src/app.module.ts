import { Module } from '@nestjs/common';
import { CategoriesModule } from 'modules/categories/categories.module';
import { ProductOrderModule } from 'modules/product-order/product-order.module';
import { ProductModule } from 'modules/product/product.module';
import { PurchaseModule } from 'modules/purchase/purchase.module';
import { SizeMeasureModule } from 'modules/size-measure/size-measure.module';
import { StoreModule } from 'modules/store/store.module';
import { UserModule } from 'modules/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    CategoriesModule,
    UserModule,
    StoreModule,
    SizeMeasureModule,
    PurchaseModule,
    ProductOrderModule,
    ProductModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
