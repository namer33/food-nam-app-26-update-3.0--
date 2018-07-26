import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Food } from '../../models/interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  @ViewChild('closeBtnDel') closeBtnDel: ElementRef;

  id;

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.cartService.loadCart();
  }



  up(food: Food) { // บวก 1 จำนวน
    console.log(food.idFood);
    this.cartService.addItem(food);
  }


  down(food: Food) {  // ลบ 1 จำนวน
    this.cartService.downCount(food.idFood);
    this.gotoFoodList();
  }


  // ยืนยันการลบ
  delConfirm(value: Food) {
    this.id = value.idFood;
  }


  delete() {  // ลบ 1 รายการ
    this.cartService.remove(this.id);
    this.closeBtnDel.nativeElement.click();
    this.gotoFoodList();
  }


  gotoFoodList() {
    if (this.cartService.countAll === 0) {
      setTimeout(() => {
        this.router.navigate(['/food-list']);
      }, 1000);
    }
  }


  gotoCheckout() {
    if (this.cartService.countAll === 0) {
      setTimeout(() => {
        this.router.navigate(['/food-list']);
      }, 1000);
    } else {
      this.router.navigate(['/#/checkout']);
    }
  }

}
