import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  flag = true;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  nuevaOferta() {
    this.router.navigate(['new-offer'], {relativeTo: this.route});
  }

}
