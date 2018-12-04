import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/Services/api-service.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private service: ApiServiceService,
    private Token:TokenService,
              private router: Router,
              private Auth:AuthService) { }

  ngOnInit() {
  }
  onSubmit () {
    this.service.signup(this.form).subscribe(
      data=>this.handleResponse(data),
      error=>console.log(error)
    );
    }
    handleResponse(data){
      this.Token.handle(data.token.access_token);
      this.Auth.changeAuthStatus(true);
      this.router.navigateByUrl('/profile');
      }


  public form = {
    email:null,
    password:null,
  };

  public error=[];


  handleError(error){
    this.error=error.error.errors;
  }

}
