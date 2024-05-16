import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup = new FormGroup({
    // username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required)

  })
  isError:boolean = false;

  constructor(private router:Router, private authService:AuthenticationService){}

  onSignup() {
    if(this.signupForm.valid){
      const username = this.signupForm.value.username;
      const password = this.signupForm.value.password;
      const email = this.signupForm.value.email;
      this.authService.signup(email, password, username).subscribe({
        next: (res:any) => {
          console.log(res)
          this.authService.login(email, password).subscribe({
            next: (loginRes:any) => {
              console.log(loginRes);
              this.router.navigate(['/dashboard'])
              let text: string | null = loginRes.headers.get('authorization')
              if (text !== null){
                const tokenArray = text.split(' ')
                let token = tokenArray[1]
                this.authService.setToken(token)
                console.log(this.authService.getToken())
              }
            },
            error: (loginError: any) => {
              console.error("login error", loginError);
            }
          });

        },
        error: (error:any) => {
          console.error("signup error", error)
          this.isError = true;
        }
      })

    }
  }
}
