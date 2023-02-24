import { Component } from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { GalleryService } from 'src/app/services/gallery.service';
import { Album } from '../gallery/om/album.model';
import { User } from '../gallery/om/user.model';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent {

  album: Album | undefined;
  user: User | undefined;

  constructor(private router: Router, private galleryService: GalleryService) {
    this.user = this.galleryService.getSessionUser();
    const nav: Navigation | null = this.router.getCurrentNavigation();
    if (this.user && nav && nav.extras && nav.extras.state && nav.extras.state['album'])
      this.album = nav.extras.state['album'];
    else this.router.navigateByUrl('')
  }

  deletePhoto(photoId: number) {
    this.galleryService.deletePhoto(photoId).subscribe(() => {
      const index: number | undefined = this.album?.photos?.findIndex((photo) => photo.id == photoId);
      if (index != null && index != -1)
        this.album?.photos?.splice(index, 1);
    })
  }
}
