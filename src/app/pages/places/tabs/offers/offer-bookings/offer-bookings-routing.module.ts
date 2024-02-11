import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferBookingsPage } from './offer-bookings.page';

const routes: Routes = [
  {
    path: '',
    component: OfferBookingsPage
  },
  {
    path: 'edit-offer',
    loadChildren: () => import('./edit-offer/edit-offer.module').then( m => m.EditOfferPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfferBookingsPageRoutingModule {}
