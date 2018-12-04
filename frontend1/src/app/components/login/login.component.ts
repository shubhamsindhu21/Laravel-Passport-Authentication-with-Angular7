import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/Services/api-service.service';
import { TokenService } from 'src/app/Services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:ApiServiceService,
              private Token:TokenService,
              private router: Router,
              private Auth:AuthService

              ) { }

  ngOnInit() {
    // this.Token.call().subscribe(
    //   data=>this.handleResponse(data),
    //   // data=>console.log(data.token.access_token),
    //   error=>console.log(error)
    // );
  }
  onSubmit () {
    this.service.login(this.form).subscribe(
      data=>this.handleResponse(data),
      // data=>console.log(data.token.access_token),
      error=>console.log(error)
    );
}
handleResponse(data){
  console.log(data);
this.Token.handle(data.token.access_token);

this.Auth.changeAuthStatus(true);
this.router.navigateByUrl('/profile');
}

  public form = {
    email:null,
    password:null,
  };

  public error=null;


  handleError(error){
    this.error=error.error.error;
  }

}
