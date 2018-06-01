import { IProduct } from '../product';
import { ProductService } from '../services/product.service';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './product-save.component.html',
  styleUrls: ['./product-save.component.css']
})
export class ProductSaveComponent implements OnInit {
  message: string;
  constructor(private _productService: ProductService , private _route: ActivatedRoute,
    private _router: Router) { }

  addProduct(form) {
    let product: IProduct = {
      _id: '',
      productId: form.value.productId,
      productName: form.value.productName,
      productCode: form.value.productCode,
      releaseDate: form.value.releaseDate,
      description: form.value.description,
      price: form.value.price,
      starRating: form.value.starRating,
      imageUrl: form.value.imageUrl
    };
    this._productService.addProduct(product)
        .subscribe(item => {
          this._router.navigate(['/products']);
        });
  }
  ngOnInit() {
  }

}
