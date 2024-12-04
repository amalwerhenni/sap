import { Component, OnInit } from '@angular/core';
import { Vetement } from '../modele/vetements.modele';
import { VetementService } from '../services/vetement.service';

import { AuthService } from '../auth.service';
import { Boutique } from '../modele/boutique.model';

@Component({
  selector: 'app-vetements',
  templateUrl: './vetements.component.html',
})
export class VetementsComponent implements OnInit {
  vetements?: Vetement[];
  boutiques?: Boutique[];
  apiurl: string = 'http://localhost:8080/vetements/api';
  constructor(
    private vetementService: VetementService,
    public authService: AuthService
  ) {}
  supprimerVetement(v: Vetement) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf)
      this.vetementService.supprimerVetement(v.idVet!).subscribe(() => {
        console.log('Vetement supprimé');
        this.chargerVetements();
      });
  }
  ngOnInit(): void {
    this.chargerVetements();
  }
  chargerVetements() {
    this.vetementService.listeVetement().subscribe((vets) => {
      console.log(vets);
      this.vetements = vets;
      console.log('aaaa', this.vetements);
      this.vetements.forEach((prod) => {
        prod.imageStr =
          'data:' + prod.images[0].type + ';base64,' + prod.images[0].image;
      });
    });
  }
}
