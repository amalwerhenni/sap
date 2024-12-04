import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../modele/user.model';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html',
  styleUrl: './verif-email.component.css',
})
export class VerifEmailComponent implements OnInit {
  code: string = '';
  user: User = new User();
  err = '';
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.user = this.authService.regitredUser;
  }
  onValidateEmail() {
    this.authService.validateEmail(this.code).subscribe({
      next: (res) => {
        alert('');
        this.toastr.success('Login successful', 'successful');

        this.authService.login(this.user).subscribe({
          next: (data) => {
            let jwToken = data.headers.get('Authorization')!;
            this.authService.saveToken(jwToken);
            this.router.navigate(['/']);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      },
      error: (err: any) => {
        if (err.error.errorCode == 'INVALID_TOKEN')
          this.err = "Votre code n'est pas valide !";

        if (err.error.errorCode == 'EXPIRED_TOKEN')
          this.err = 'Votre code a expiré !';
      },
    });
  }
}
