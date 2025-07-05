import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VNPayService } from '../../service/vnpay.service';

@Component({
  selector: 'app-vnpay',
  templateUrl: './vnpay.component.html',
  styleUrl: './vnpay.component.scss'
})
export class VNPayComponent implements OnInit {
  constructor(private router: Router,
              private vnpayService: VNPayService,
              private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const status = params['vnp_ResponseCode'];
      const trackingNumber = params['vnp_TxnRef'];
      if (status && trackingNumber) {
        this.vnpayService.callbackVNPayUrl(status, trackingNumber).subscribe({
          next: (response: any) => {
            window.alert(response.message);
            this.router.navigate(['']);
          },
          error: (error) => {
            console.error(error);
          }
        });
      } else {
        console.error('Invalid status or tracking number');
      }
    });
  }
}
