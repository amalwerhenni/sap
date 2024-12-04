import { Component, OnInit } from '@angular/core';
import { VetementService } from '../services/vetement.service';
import { Router } from '@angular/router';
import { Boutique } from '../modele/boutique.model';
import { Vetement } from '../modele/vetements.modele';
@Component({
  selector: 'app-add-vetements',
  templateUrl: './add-vetements.component.html',
})
export class AddVetementsComponent implements OnInit {
  newVetement = new Vetement();
  message?: string;
  boutiques!: Boutique[];
  newIdBou!: number;
  newBoutique!: Boutique;
  uploadedImage!: File;
  imagePath: any;

  constructor(
    private vetementService: VetementService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.vetementService.listeBoutiques().subscribe((bouts) => {
      this.boutiques = bouts._embedded.boutiques;
      console.log(bouts);
    });
  }
  addVetement() {
    this.newVetement.boutique = this.boutiques.find(
      (bou) => bou.idBou == this.newIdBou
    )!;
    console.log(this.newVetement);
    this.vetementService.ajouterVetement(this.newVetement).subscribe((vet) => {
      this.vetementService
        .uploadImageVet(this.uploadedImage, this.uploadedImage.name, vet.idVet!)
        .subscribe((response: any) => {
          this.router.navigate(['vetements']).then(() => {
            window.location.reload();
          });
        });
    });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    };
  }
}
