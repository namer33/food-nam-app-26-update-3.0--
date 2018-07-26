import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { Router } from '@angular/router';
import { Order } from '../../models/interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @ViewChild('closeBtnDel') closeBtnDel: ElementRef;

  orders: Order[];
  order: Order;
  constructor(
    private orderService: OrderService,
    private router: Router,
  ) { }
  ngOnInit() {
    this._orders();
  }

  _orders() {
    this.orderService.getAllOrders().
      subscribe(orders => this.orders = orders);
  }


    // ยืนยันการลบ
    delConfirm(value: Order) {
      console.log('value.uid: ' + value.idOrder);
      this.order = value;
    }


  deleteOrder() {
    this.orderService.deleteOrder(this.order);
    this.closeBtnDel.nativeElement.click();
  }

  viewOrder(order) {
   // this.router.navigate(['./details/' + order.id]);
    this.router.navigate(['./details/' + order.idOrder]);

  }


}
