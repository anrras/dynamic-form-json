import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public formData: any;
  title = 'dynamic-form-json';
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('/assets/schema-json.json').subscribe((formData) => {
      this.formData = formData;
    });
  }
}
