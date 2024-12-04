import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VetementsComponent } from './vetements/vetements.component';
import { AddVetementsComponent } from './add-vetements/add-vetements.component';
import { UpdateVetementComponent } from './update-vetement/update-vetement.component';
import { RechercheParBoutiqueComponent } from './recherche-par-boutique/recherche-par-boutique.component';
import { RechercheParMarqueComponent } from './recherche-par-marque/recherche-par-marque.component';
import { ListeBoutiquesComponent } from './liste-boutiques/liste-boutiques.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { VetementGuard } from './vetement.guard';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';

const routes: Routes = [
  { path: 'vetements', component: VetementsComponent },
  {
    path: 'add-vetements',
    component: AddVetementsComponent,
    canActivate: [VetementGuard],
  },
  { path: 'update-vetement/:id', component: UpdateVetementComponent },
  { path: 'rechercheParBoutique', component: RechercheParBoutiqueComponent },
  { path: 'rechercheParMarque', component: RechercheParMarqueComponent },
  { path: 'listeBoutiques', component: ListeBoutiquesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verifEmail', component: VerifEmailComponent },
  { path: 'app-forbidden', component: ForbiddenComponent },
  { path: '', redirectTo: 'vetements', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
