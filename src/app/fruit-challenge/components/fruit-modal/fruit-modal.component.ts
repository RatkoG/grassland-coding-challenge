import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Fruit } from '../../models/fruit';

@Component({
  selector: 'app-fruit-modal',
  templateUrl: './fruit-modal.component.html',
  styleUrls: ['./fruit-modal.component.scss']
})
export class FruitModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Fruit) {}
}
