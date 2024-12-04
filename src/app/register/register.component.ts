import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../modele/user.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  public user = new User();
  confirmPassword?: string;
  loading = false;
  myForm!: FormGroup;
  err?: string;
  constructor(
    private formBuilder: FormBuilder,
    private authSerice: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }
  onRegister() {
    console.log(this.user);
    this.loading = true;
    this.authSerice.registerUser(this.user).subscribe({
      next: (res) => {
        this.authSerice.setRegistredUser(this.user);
        this.loading = false;
        this.toastr.success('veillez confirmer votre email', 'Confirmation');
        
        this.router.navigate(['/verifEmail']);
      },
      error: (err: any) => {
        if(err.error.errorCode=="USER_EMAIL_ALREADY_EXISTS"){
          this.err= "Email already used";
        }
      },
    });
  }
}
