import { IProduct } from '../product';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { map, tap, catchError } from 'rxjs/operators';


@Injectable()
export class ProductService {

  private _productsUrl = 'http://localhost:4000/api/products';

  constructor(private _http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(this._productsUrl)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

   getProduct(id: number): Observable<IProduct> {
    return this.getProducts().pipe(
      map((products: IProduct[]) => products.find(p => p.productId === id)));
  }

  addProduct(product: IProduct) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:4000/api/insertProduct', product, { headers: headers});
  }

  editProduct(product) {
    console.log('id'+ product._id);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._http.put('http://localhost:4000/api/editProduct/' + product._id, product, { headers: headers});
  }

  deleteProduct(id) {
    return this._http.delete('http://localhost:4000/api/deleteProduct/' + id );
  }

  private handleError(err) {
    let errorMessage = '';
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return Observable.throw(err.message);
  }
}
