import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  _filterText: string;
  errorMessage: string;
  toggleEditForm = false;
  selectedProduct: IProduct;
  selectedProductIdForEdit: string;

  get filterText(): string {
    return this._filterText;
  }
  set filterText(value: string) {
    this._filterText = value;
    this.filteredProducts = this.filterText ? this.performFilter(this.filterText) : this.products;
  }
  filteredProducts: IProduct[];
  products: IProduct[] = [];

   constructor(private _productService: ProductService, private _route: ActivatedRoute,
    private _router: Router) {

  }
  ngOnInit(): void {
    this._productService.getProducts()
          .subscribe(products => { this.products = products,
                      this.filteredProducts = this.products;
                      },
                     error => this.errorMessage = <any>error);

  }

  deleteProduct(id) {
    this._productService.deleteProduct(id)
        .subscribe(data => {
           for ( let i = 0; i < this.filteredProducts.length; i++) {
              if ( id === this.filteredProducts[i]._id) {
                this.filteredProducts.splice(i, 1);
              }
           }
          });
  }
  editProduct(form) {
    console.log('hello');
    console.log('ddddd' + form.value._id);
    let product: IProduct = {
      _id: this.selectedProduct._id,
      productId: form.value.productId,
      productName: form.value.productName,
      productCode: form.value.productCode,
      releaseDate: form.value.releaseDate,
      description: form.value.description,
      price: form.value.price,
      starRating: form.value.starRating,
      imageUrl: form.value.imageUrl
    };
    this._productService.editProduct(product)
          .subscribe( result => {
          console.log('updated successfully');
          this.ngOnInit();
        });
    this.toggleEditForm = !this.toggleEditForm;
  }

  showEditForm(product) {
    this.selectedProduct = product;
    this.toggleEditForm = !this.toggleEditForm;
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterText: string): IProduct[] {
    filterText = filterText.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterText) !== -1);
  }
  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
}
