import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent } from './product-list.component';
import { ProductService } from './services/product.service';
import { ProductSaveComponent } from './product-save/product-save.component';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UtilitiesModule } from '../utilities/utilities.module';

@NgModule({
  imports: [
    RouterModule.forChild([
           { path: 'products', component: ProductListComponent },
           { path: 'addProduct', component: ProductSaveComponent },
           { path: 'products/:id', component: ProductDetailComponent }
    ]),
    UtilitiesModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductSaveComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
