import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/Services/api-service.service';
import {  SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  constructor(private Api:ApiServiceService,
    private notify: SnotifyService,
    private Notfiy:SnotifyService) { }
public form={
  email:null
}
  ngOnInit() {
  }

  onSubmit(){
    this.Notfiy.info('Wait...' ,{timeout:5000})
    this.Api.sendResetPassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.notify.error(error.error.error)
    );
  }

  handleResponse(res) {
    this.Notfiy.success(res.data,{timeout:0});
    this.form.email = null;
  }
}
