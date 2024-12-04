import { Component, OnInit } from '@angular/core';
import { VetementService } from '../services/vetement.service';
import { Vetement } from '../modele/vetements.modele';
import { Boutique } from '../modele/boutique.model';

@Component({
  selector: 'app-recherche-par-boutique',
  templateUrl: './recherche-par-boutique.component.html',
  styles: [],
})
export class RechercheParBoutiqueComponent implements OnInit {
  vetements!: Vetement[];
  IdBoutique!: number;
  boutiques!: Boutique[];
  SelectBoutique!: Boutique;

  constructor(private vetementService: VetementService) {}

  ngOnInit(): void {
    this.vetementService.listeBoutiques().subscribe((bouts) => {
      this.boutiques = bouts._embedded.boutiques;
      console.log(bouts);
    });
  }

  onChange() {
    this.vetementService.rechercherParBoutique(this.IdBoutique).subscribe((vets) => {
      this.vetements = vets;
    });
  }
}