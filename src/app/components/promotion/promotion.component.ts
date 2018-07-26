import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../service/food.service';
import { CartService } from '../../service/cart.service';
import { Food } from '../../models/interface';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  food: Food;
  nameFood = [  //  เมนูอาหารแนะนำ // => (name)
    '11155555',
    'ข้าวหมูแดง',
    '9999',
    'ข้าวผัด',
    '9'
  ];

  constructor(
    private foodService: FoodService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this._getFood();
  }


  _getFood() {
    localStorage.setItem('foods', JSON.stringify([]));
    for (let i = 0; i < this.nameFood.length; i++) {
  //    console.log('i: ' + i);
 //     console.log('this.nameFood[i]: ' + this.nameFood[i]);
      this.foodService.getNameFood(this.nameFood[i]);
    }
 //   console.log('nnnnnnnnnnn ');
    this.foodService.loadFood();
  }


  addItem(value: Food) {
//    console.log(value.id);
    this.cartService.addItem(value);
  }


}
