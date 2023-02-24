import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { concatMap, delay, map, mergeMap, switchMap, tap } from 'rxjs/operators';
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
    return this.galleryService.getUser(idUser).pipe(
      map((users) => users[0]),
      tap((user) => {
        this.galleryService.saveSessionUser(user);
        this.user = user;
      }),
      switchMap((user) => {
        return this.galleryService.getAlbums(user.id)
      }),
      switchMap((albums) => {
        return from(albums).pipe(
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
