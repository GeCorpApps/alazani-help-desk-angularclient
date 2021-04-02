import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/datasource/api/api.service';
import ProductItem from "./item.interface";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ProductItemComponent implements OnInit {
  public product: ProductItem;  
  
  constructor(private ApiS: ApiService) { }

  ngOnInit(): void {
  }

  private loadProduct(pId) {
    this.ApiS.get("product/view/" + pId).subscribe((response) => {
      console.log(response);
      if(response.status == true){
        this.product=response.result;
      }
    })
  }

  public deleteElements(){
    
  }

}
