import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  decksize = [3, 4, 5, 6, 7, 8, 9, 10];
  form = new FormGroup({
    deck: new FormControl('', Validators.required)
  });

  constructor(private router: Router) {

  }

  submit() {
    this.router.navigateByUrl('gamepage/' + this.form.value.deck);
  }
}
