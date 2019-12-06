import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'search-ui-elastic';

  constructor(private http: HttpClient) {}

  retrieveDocuments(fullTextQuery: string) {
    this.http.get(environment.elastic_url.concat(fullTextQuery));
  }
}
