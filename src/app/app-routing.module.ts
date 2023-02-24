import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PhotosComponent } from './pages/photos/photos.component';

const routes: Routes = [
  { path: "", redirectTo: 'albums', pathMatch: 'full' },
  { path: "albums", component: GalleryComponent },
  { path: "photos", component: PhotosComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
