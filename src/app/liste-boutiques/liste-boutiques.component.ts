import { Component, OnInit } from '@angular/core';
 import { VetementService } from '../services/vetement.service';
import { Boutique } from '../modele/boutique.model';

@Component({
  selector: 'app-liste-boutiques',
  templateUrl: './liste-boutiques.component.html',
  styles: ``,
})
export class ListeBoutiquesComponent implements OnInit {
  boutiques!: Boutique[];
  updatedbou: Boutique = { idBou: 0, nomBou: '', addressbou: '' };
  bou!: Boutique;
  ajout: boolean = true;

  constructor(private vetementService: VetementService) {}
  ngOnInit(): void {
    this.vetementService.listeBoutiques().subscribe((bous) => {
      this.boutiques = bous._embedded.boutiques;
      console.log(bous);
    });
  }
  chargerbouartemnts() {
    this.vetementService.listeBoutiques().subscribe((bous) => {
      this.boutiques = bous._embedded.boutiques;
      console.log(bous);
    });
  }
  boutiqueUpdated(bou: Boutique) {
    console.log('bou updated event', bou);
    this.vetementService
      .ajouterBoutique(bou)
      .subscribe(() => this.chargerbouartemnts());
  }
  updatebou(bou: Boutique) {
    this.updatedbou = bou;
    this.ajout = false;
  }
}
