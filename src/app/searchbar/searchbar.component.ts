import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {debounce} from 'rxjs/operators';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  inputValue: string;
  debounceRetrieval;

  constructor(private http: HttpClient) {
    this.debounceRetrieval = this.debounce(this.retrieveDocsFromElastic, 1000);
}

  ngOnInit() {
    document.getElementById('input_field')
      .addEventListener('keypress', (event) => {
        this.inputValue = (document.getElementById('input_field') as HTMLInputElement).value;
        console.log('Input value: ', this.inputValue);
        this.debounceRetrieval(this.inputValue);
      });
  }

  retrieveDocsFromElastic() {
    console.log('After debounce function');
    this.http.post('http://localhost:3000/api/shakespeare', {queryValue : this.inputValue})
      .subscribe((response) => {
        console.log(response);
      });
  }

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  debounce(cb, interval) {
    // console.log('In debounce function: ', cb, interval, immediate);
    let timeout;
    return function() {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => cb.apply(this, [...arguments]), interval);
    };
  }
}
