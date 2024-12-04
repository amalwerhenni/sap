import { Component, OnInit } from '@angular/core';
import { VetementService } from '../services/vetement.service';
import { Vetement } from '../modele/vetements.modele';

@Component({
  selector: 'app-recherche-par-marque',
  templateUrl: './recherche-par-marque.component.html',
  styles: ``,
})
export class RechercheParMarqueComponent implements OnInit {
  marqueVet!: string;
  vetements!: Vetement[];
  allVetements!: Vetement[];
  searchTerm!: string;

  constructor(private vetementService: VetementService) {}
  ngOnInit(): void {
    this.vetementService.listeVetement().subscribe((empls) => {
      console.log(empls);
      this.allVetements = empls;
    });
  }
  onKeyUp(filterText: string) {
    this.vetements = this.allVetements.filter((item) =>
      item.marqueVet?.toLowerCase().includes(filterText)
    );
  }
  rechercherVets() {
    this.vetementService
      .rechercherParMarque(this.marqueVet)
      .subscribe((vets) => {
        this.vetements = vets;
        console.log(vets);
      });
  }
}
