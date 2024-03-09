import { Component, OnInit } from '@angular/core';
import {FruitTableViewModel} from './fruit-table-view-model';
import { MatDialog } from '@angular/material/dialog';
import { Fruit } from '../../models/fruit';
import { FruitModalComponent } from '../fruit-modal/fruit-modal.component';

@Component({
  selector: 'app-fruit-table',
  templateUrl: './fruit-table.component.html',
  styleUrls: ['./fruit-table.component.scss'],
  providers: [FruitTableViewModel]
})
export class FruitTableComponent implements OnInit {
  columnsToDisplay = ['id', 'name', 'genus', 'calories', 'carbohydrates', 'sugar'];

  constructor(public viewModel: FruitTableViewModel, private dialog: MatDialog) {

  }


  ngOnInit(): void {
  }

  openFruitDetailsDialog(fruit: Fruit): void {
    this.dialog.open(FruitModalComponent, {
      data: fruit,
      width: '460px',
    });
}}
