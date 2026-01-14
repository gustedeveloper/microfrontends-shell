import { Component } from '@angular/core';
import { SharedLibService } from 'shared-lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private sharedLibService: SharedLibService) {}
}
