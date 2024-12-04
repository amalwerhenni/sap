import { Component, OnInit } from '@angular/core';
import { VetementService } from '../services/vetement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Vetement } from '../modele/vetements.modele';
import { Boutique } from '../modele/boutique.model';

import { Image } from '../modele/Image.model';

@Component({
  selector: 'app-update-vetement',
  templateUrl: './update-vetement.component.html',
  styles: ``,
})
export class UpdateVetementComponent implements OnInit {
  currentVetement = new Vetement();
  boutiques!: Boutique[];
  updatedBouId?: number;
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,

    private vetementService: VetementService
  ) {}
  ngOnInit(): void {
    this.vetementService.listeBoutiques().subscribe((bouts) => {
      console.log(bouts);
      this.boutiques = bouts._embedded.boutiques;
    });

    this.vetementService
      .consulterVetement(this.activatedRoute.snapshot.params['id'])
      .subscribe((vet) => {
        this.currentVetement = vet;
        this.updatedBouId = this.currentVetement.boutique?.idBou;
      });
  }

  onAddImageVetement() {
    this.vetementService
      .uploadImageVet(
        this.uploadedImage,
        this.uploadedImage.name,
        this.currentVetement.idVet!
      )
      .subscribe((img: Image) => {
        this.currentVetement.images.push(img);
      });
  }

  supprimerImage(img: Image) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf)
      this.vetementService.supprimerImage(img.idImage).subscribe(() => {
        //supprimer image du tableau currentProduit.images
        const index = this.currentVetement.images.indexOf(img, 0);
        if (index > -1) {
          this.currentVetement.images.splice(index, 1);
        }
      });
  }

  updateVetement() {
    this.currentVetement.boutique = this.boutiques.find(
      (bou) => bou.idBou == this.updatedBouId
    )!;

    this.vetementService
      .updateVetement(this.currentVetement)
      .subscribe((vet) => {
        console.log(vet);
        this.router.navigate(['vetements']);
      });
  }

  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }
}
