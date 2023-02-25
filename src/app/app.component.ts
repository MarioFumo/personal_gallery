import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PersonalGallery';

  deleteCache(){
    sessionStorage.removeItem('user');
    window.alert('Cache deleted');
  }
}
