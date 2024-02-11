import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: TabsComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'places/tabs/discover',
          },
          {
            path: 'auth',
            loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthPageModule),
          },
          {
            path: 'booking',
            loadChildren: () => import('./pages/booking/booking.module').then((m) => m.BookingPageModule),
          },
          {
            path: 'places/tabs/discover',
            loadChildren: () => import('./pages/places/tabs/discover/discover.module').then((m) => m.DiscoverPageModule),
          },
          {
            path: 'places/tabs/offers',
            loadChildren: () => import('./pages/places/tabs/offers/offers.module').then((m) => m.OffersPageModule),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}