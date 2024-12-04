import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Boutique } from '../modele/boutique.model';

@Component({
  selector: 'app-update-boutique',
  templateUrl: './update-boutique.component.html',
  styles: ``,
})
export class UpdateBoutiqueComponent implements OnInit {
  @Input()
  ajout!: boolean;
  @Input() boutique!: Boutique;
  @Output()
  boutiqueUpdated = new EventEmitter<Boutique>();
  idBou = 1;
  nomBou: string = 'Hm';
  ngOnInit(): void {
    console.log('ngOnInit du composant UpdateBoutique ', this.boutique);
  }
  saveBoutique() {
    this.boutiqueUpdated.emit(this.boutique);
  }
}
