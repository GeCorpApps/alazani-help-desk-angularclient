import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../datasource/api/api.service';
import ProductItem from '../item/item.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ProductListComponent implements OnInit {

  @ViewChild("product_element") public productElement: ElementRef<HTMLInputElement>;
  public product: ProductItem[];

  constructor(private ApiS: ApiService) {
    
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.ApiS.get("product/list").subscribe((response) => {
      console.log(response);
      if(response.status == true){
        this.product = response.result;
      }
    });
  }

  public deleteElements(): void {

  }

}
