import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vetement } from '../modele/vetements.modele';
import { Boutique } from '../modele/boutique.model';
import { BoutiqueWrapper } from '../modele/BoutiqueWrapped.model';
import { AuthService } from '../auth.service';
import { Image } from '../modele/Image.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class VetementService {
  apiURL: string = 'http://localhost:8080/vetements/api';
  apiURLBou: string = 'http://localhost:8080/vetements/bou';
  vetement!: Vetement;
  vetements!: Vetement[]; //un tableau de chînes de caractères
  boutiques!: Boutique[];
  constructor(private http: HttpClient, private authService: AuthService) {}

  listeVetement(): Observable<Vetement[]> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<Vetement[]>(this.apiURL + '/all', {
      headers: httpHeaders,
    });
  }

  ajouterVetement(vet: Vetement): Observable<Vetement> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });

    return this.http.post<Vetement>(this.apiURL + '/addvet', vet, {
      headers: httpHeaders,
    });
  }

  supprimerVetement(id: number) {
    const url = `${this.apiURL}/delvet/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.delete(url, { headers: httpHeaders });
  }

  trierVetements() {
    this.vetements = this.vetements.sort((n1, n2) => {
      if (n1.idVet! > n2.idVet!) {
        return 1;
      }
      if (n1.idVet! < n2.idVet!) {
        return -1;
      }
      return 0;
    });
  }

  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }
  loadImage(id: number): Observable<Image> {
    const url = `${this.apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  consulterVetement(id: number): Observable<Vetement> {
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<Vetement>(url, { headers: httpHeaders });
  }

  updateVetement(prod: Vetement): Observable<Vetement> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.put<Vetement>(this.apiURL + '/updatevet', prod, {
      headers: httpHeaders,
    });
  }

  listeBoutique(): Observable<BoutiqueWrapper> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<BoutiqueWrapper>(this.apiURLBou, {
      headers: httpHeaders,
    });
  }
  listeBoutiques(): Observable<BoutiqueWrapper> {
    return this.http.get<BoutiqueWrapper>(this.apiURLBou);
  }
  rechercherParBoutique(idBou: number): Observable<Vetement[]> {
    const url = `${this.apiURL}/vetsbou/${idBou}`;
    return this.http.get<Vetement[]>(url);
  }

  rechercherParMarque(marque: string): Observable<Vetement[]> {
    const url = `${this.apiURL}/vetMarque/${marque}`;
    return this.http.get<Vetement[]>(url);
  }

  ajouterBoutique(bou: Boutique): Observable<Boutique> {
    return this.http.post<Boutique>(this.apiURLBou, bou, httpOptions);
  }

  uploadImageVet(file: File, filename: string, idVet: number): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/uplaodImageVet'}/${idVet}`;
    return this.http.post(url, imageFormData);
  }
  supprimerImage(id: number) {
    const url = `${this.apiURL}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }
  uploadImageFS(file: File, filename: string, idProd: number): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/uploadFS'}/${idProd}`;
    return this.http.post(url, imageFormData);
  }
}
