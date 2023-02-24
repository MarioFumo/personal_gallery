import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, switchMap, timeout } from 'rxjs';
import { Album } from '../pages/gallery/om/album.model';
import { Photo } from '../pages/gallery/om/photo.model';
import { User } from '../pages/gallery/om/user.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  PREFIX: string = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getUser(idUser: number): Observable<User[]> {
    const user = this.getSessionUser();
    if (user)
      return of([user])
    let params = new HttpParams().set('id', idUser);
    return of('DUMMY').pipe(
      delay(5000),
      switchMap(()=>{
        return this.http.get<User[]>(this.PREFIX + "/users", { params })
      }) 
    )
  }

  getAlbums(idUser: number): Observable<Album[]> {
    let params = new HttpParams().set('userId', idUser);
    return this.http.get<Album[]>(this.PREFIX + "/albums", { params })
  }

  getPhotos(albumId: number): Observable<Photo[]> {
    let params = new HttpParams().set('albumId', albumId);
    return this.http.get<Photo[]>(this.PREFIX + "/photos", { params })
  }

  deletePhoto(photoId: number): Observable<void> {
    return this.http.delete<void>(this.PREFIX + "/photos/" + photoId)
  }



  saveSessionUser(user: User): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getSessionUser(): User | undefined {
    const user = sessionStorage.getItem('user')
    if (user)
      return JSON.parse(user);
    return undefined
  }

}
