import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    // username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),

  })
  isError:boolean = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  onLogin(){
    if(this.loginForm.valid){

      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      // this.authService.login(email, password);
      this.authService.login(email, password).subscribe({
        next: (res:any) => {
          console.log(res)
          // this.authService.setToken(res.token);
          this.router.navigate(['/dashboard']);
        },
        error: (error:any) => {
          console.error("login error", error)
          this.isError = true;
        }
      })
    }
  }
}
