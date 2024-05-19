import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { NavigationComponent } from '../../../shared/components/navigation/navigation.component';
import { ChartDisplayComponent } from '../../../shared/components/chart-display/chart-display.component';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NavigationComponent, ChartDisplayComponent, SidebarComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup = new FormGroup({
    // username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    employee_number: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    is_admin: new FormControl(false, Validators.required),

  })
  findEmployeeForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  })
  updateProfileForm: FormGroup = new FormGroup({

    employee_number: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    is_admin: new FormControl(false, Validators.required),
  })
  checkSidebar(): boolean{
    return this.sidebar.isSidebarVisible
  }
  isError:boolean = false;
  name = "admin";

  constructor(private router:Router, private authService:AuthenticationService, private sidebar:SidebarService) { }

  onSignup() {
    if (this.signupForm.valid){
      const username = this.signupForm.value.username;
      const password = this.signupForm.value.password;
      const email = this.signupForm.value.email;
      const employee_number = this.signupForm.value.employee_number;
      const first_name = this.signupForm.value.first_name;
      const last_name = this.signupForm.value.last_name;
      const is_admin = this.signupForm.value.is_admin
      this.authService.signup(email, password, username).subscribe({
        next: (res: any) => {
          console.log('Signup successful:', res);
          console.log("User id", res.data.id)
          const user_id = res.data.id;
          console.log('Creating profile with:', { employee_number, first_name, last_name, user_id, is_admin });
          this.authService.createProfile(employee_number, first_name, last_name, user_id, is_admin).subscribe({
            next: (profileRes: any) => {
              console.log('Profile created successfully:',profileRes)

            },
            error: (profileError: any) => {
              console.error('Profile creation error:', profileError);
            }
          })

          // this.authService.login(email, password).subscribe({
          //   next: (loginRes:any) => {
          //     console.log(loginRes);
          //     this.router.navigate(['/dashboard'])
          //     let text: string | null = loginRes.headers.get('authorization')
          //     if (text !== null){
          //       const tokenArray = text.split(' ')
          //       let token = tokenArray[1]
          //       this.authService.setToken(token)
          //       console.log(this.authService.getToken())
          //     }
          //   },
          //   error: (loginError: any) => {
          //     console.error("login error", loginError);
          //   }
          // });

        },
        error: (error:any) => {
          console.error("signup error", error)
          this.isError = true;
        }
      });
      this.isError = false;
      this.signupForm.reset();


    }

  }
  onFind(name: string){
    if (this.name.length > 0){
      this.name = this.findEmployeeForm.value.name;
      this.authService.adminGetProfile(name).subscribe({
        next: (res:any) => {
          console.log(res);
        },
        error: (error:any) => {
          console.error("onFind error", error)
        }
      })
    }
  }

  onUpdateProfile() {}
}
