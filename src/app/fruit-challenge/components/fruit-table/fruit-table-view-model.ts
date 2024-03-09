import {Injectable} from '@angular/core';
import {FruityViceService} from '../../services/fruity-vice-service';
import {BehaviorSubject, combineLatest, map} from 'rxjs';
import {Fruit} from '../../models/fruit';

@Injectable()
export class FruitTableViewModel {

  fruitData$ = new BehaviorSubject<Fruit[]>(null);
  loadingFruit$ = new BehaviorSubject<boolean>(false);
  filterText = '';
  selectedSortOption = 'nameAsc';
  

  constructor(private fruitService: FruityViceService) {
    this.loadingFruit$.next(true);
    this.fruitService.getAllFruits().subscribe(fruitResponse => {
      this.loadingFruit$.next(false);
      this.fruitData$.next(fruitResponse);
    });
  }

  get filteredFruits$() {
    return this.fruitData$.pipe(
      map(fruits => {
        if (!fruits) return []; // Return empty array if fruits data is null
        let filteredFruits = fruits.filter(fruit =>
          fruit.genus.toLowerCase().includes(this.filterText.toLowerCase()) ||
          fruit.name.toLowerCase().includes(this.filterText.toLowerCase()) ||
          fruit.family.toLowerCase().includes(this.filterText.toLowerCase()) ||
          fruit.order.toLowerCase().includes(this.filterText.toLowerCase())
        );
        filteredFruits = this.sortFruits(filteredFruits, this.selectedSortOption);
        return filteredFruits;
      })
    );
  }

  private sortFruits(fruits: Fruit[], sortOption: string): Fruit[] {
    switch (sortOption) {
      case 'nameAsc':
        return fruits.sort((a, b) => a.name.localeCompare(b.name));
      case 'nameDesc':
        return fruits.sort((a, b) => b.name.localeCompare(a.name));
      case 'carbAsc':
        return fruits.sort((a, b) => a.nutritions.carbohydrates - b.nutritions.carbohydrates);
      case 'carbDesc':
        return fruits.sort((a, b) => b.nutritions.carbohydrates - a.nutritions.carbohydrates);
      default:
        return fruits;
    }
  }
}
