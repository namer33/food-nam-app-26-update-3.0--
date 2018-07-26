import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { OrderService } from '../../service/order.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { Order, User } from '../../models/interface';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('btn') btn: ElementRef;
  @ViewChild('btn1') btn1: ElementRef;


  email = '';
  password = '';
  orders: Order[];
  isLoad: boolean;
  isdisabled = '';
  isNull = '';

  order: Order = {
    idOrder: '',
    date: null,
    foods: null, // รายการอาหาร
    count: null,  // จำนวนรายการอาหารทั้งหมด
    total: null,     // จำนวนเงินทั้งหมด
    payment: '',  // -- วิธีชำระเงิน
    idUser: '',
    statusOrder: ''
  };

  user: User = {
    idUser: '',
    email: '',
    password: '',
    fname: '',
    lname: '',
    address: '',
    tel: null,
    date_Signup: '',
    photoURL: '',
    landmarks: ''   ///  จุดสังเกต
  };

  telMask = ['(', /[0-9]/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  // totalMask = [/[0-9]/, ',', /\d/, /\d/, ',', /\d/, /\d/, /\d/];

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    public flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.cartService.loadCart();
  }


  _orders() {
    this.orderService.getAllOrders().
      subscribe(orders => this.orders = orders);
  }


  myConfirm() {
    this.isdisabled = 'true';
    if (this.user.fname === '' || this.user.lname === ''
      || this.user.tel == null || this.user.address === ''
      || this.user.landmarks === '') {
      console.log('01');
      this.isNull = 'true';
      setTimeout(() => {
        this.isNull = '';
        this.isdisabled = '';
      }, 2000);
      return;
    } else {
      console.log('02');
      this.btn.nativeElement.click();
      this.isdisabled = '';
    }
  }


  onClickAddOrder() {
    this.isLoad = true;
    this.order.idUser = this.userService.authState.uid;
    this.order.date = (new Date()).getTime();
    this.order.foods = this.cartService.items;
    this.order.count = this.cartService.countAll;
    this.order.total = this.cartService.total + this.cartService.delivery_charge;
    this.order.payment = 'เงินสด (จ่ายเมื่อรับสินค้า)';
    this.order.statusOrder = this.orderService.status[0];

    if (this.order.count > 0) {
      this.orderService.addOrder(this.order);
      this._orders();   //  addID
      this.cartService.removeAll();
      this.cartService.loadCart();
      setTimeout(() => {
        this.router.navigate(['/user/my-order']);
        this.isLoad = false;
      }, 2000);
    } else {
      console.log('ไม่มีรายการสั่งอาหาร! ');
      this.isLoad = false;
      return;
    }

  }


  onSignUp() {
    this.isdisabled = 'true';
    if (this.email === '' || this.password === '') {
      this.isLoad = false;
      this.flashMessages.show('โปรดใส่ข้อมูลให้ครบ!', { cssClass: 'alert-danger', timeout: 2000 });
      setTimeout(() => {
        this.isdisabled = '';
      }, 2100);
      return;
    }
    this.isLoad = true;
    this.userService.signUp(this.email, this.password)
      .then((res) => {
        this.closeBtn.nativeElement.click();
        this.isLoad = false;
        this.isdisabled = '';
      }).catch((err) => {
        this.isLoad = false;
        this.flashMessages.show(err, { cssClass: 'alert-danger', timeout: 2000 });
        setTimeout(() => {
          this.isdisabled = '';
        }, 2100);
      });
  }


  onSignIn() {
    this.isdisabled = 'true';
    if (this.email === '' || this.password === '') {
      this.isLoad = false;
      this.flashMessages.show('โปรดใส่ข้อมูลให้ครบ!', { cssClass: 'alert-danger', timeout: 2000 });
      setTimeout(() => {
        this.isdisabled = '';
      }, 2100);
      return;
    }
    this.isLoad = true;
    this.userService.signIn(this.email, this.password)
      .then((res) => {
        this.closeBtn.nativeElement.click();
        this.isLoad = false;
        this.isdisabled = '';
      }).catch((err) => {
        this.isLoad = false;
        this.flashMessages.show(err, { cssClass: 'alert-danger', timeout: 2000 });
        setTimeout(() => {
          this.isdisabled = '';
        }, 2100);
      });
  }


  onSignOut() {
    this.userService.signOut();
    this.userService.userState();
  }

}
