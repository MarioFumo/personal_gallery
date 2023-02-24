import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, from, Observable } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { GalleryService } from 'src/app/services/gallery.service';
import { Album } from './om/album.model';
import { User } from './om/user.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {

  idUser: number = 2;
  user: User | undefined;
  albums: Album[] = [];

  constructor(private galleryService: GalleryService, private router: Router) {
    this.getCover(this.idUser).subscribe((album) => this.albums.push(album))
  }

  getCover(idUser: number): Observable<Album> {
    return forkJoin([this.galleryService.getUser(idUser), this.galleryService.getAlbums(idUser)]).pipe(
      map((response) => {
        return { user: response[0][0], albums: response[1] }
      }),
      tap((response) => {
        this.galleryService.saveSessionUser(response.user);
        this.user = response.user;
      }),
      switchMap((response) => {
        return from(response.albums).pipe(
          mergeMap((album) => {
            return this.galleryService.getPhotos(album.id).pipe(
              map((photos) => {
                album.photos = photos;
                return album;
              })
            )
          }),
        )
      }),
    )
  }

  openAlbum(album: Album) {
    this.router.navigateByUrl('photos', { state: { album } });
  }

}
