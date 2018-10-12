import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { HttpResponse, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, Loading, LoadingController, Alert, AlertController, NavController, NavParams } from 'ionic-angular';
import { Location } from '@angular/common';

import { AuthProvider, Account, NewPasswordContext, IdentityConfirmation, User } from '../../providers/auth/auth';
import { finalize } from 'rxjs/operators/finalize';

class ResponseConfirmation {
  title: string;
  message: string;
  nextViewState: number;
}
enum State {
  Login,
  Create,
  Confirm,
  Recover,
  ChangePassword,
  Authenticated
}
enum HttpStatus {
  Ok = 200,
  NoContent = 204,
  Unauthorized = 401,
  NotFound = 404,
  BadRequest = 400,
  UnprocessableEntity = 422
}

const ACTION_PARAM = 'action';
const UID_PARAM = 'uid';
const TOKEN_PARAM = 'token';
const ACCESS_TOKEN_PARAM = 'access_token';

const CONFIRM_ACTION = "confirm";
const SETPASSWORD_ACTION = "set-password";


@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  public user: User;

  public accountForm: FormGroup;

  public firstName: AbstractControl;
  public lastName: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;

  private loader:Loading;

  public State: any = State;
  
  public view: number;

  private urlParams: object = {};


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public location: Location,
              public authProvider: AuthProvider,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public fb: FormBuilder) {
  
    this.parseQueryString(this.location.path(true));

    const action = this.urlParams[ACTION_PARAM];

    if(action == CONFIRM_ACTION) {
      this.view = State.Confirm;

      this.confirmEmailAddress();
    } else if (action === SETPASSWORD_ACTION) {
      this.view = State.ChangePassword;
    } else {
      this.view = State.Login;
    }
  }

  public ngOnInit(): void {
    this.accountForm = this.fb.group({
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required])]
    });
    this.firstName = this.accountForm.controls['firstName'];
    this.lastName = this.accountForm.controls['lastName'];
    this.email = this.accountForm.controls['email'];
    this.password = this.accountForm.controls['password'];
  }
  public login(){
    if (!this.email.value || !this.password.value) {
      return;
  }
  const account: Account = {
    firstName: this.firstName.value,
    lastName: this.lastName.value,
    email: this.email.value,
    password: this.password.value
  }
  this.loader = this.loadingCtrl.create();
  this.loader.present();

  this 
  .authProvider
  .login(account)
  .pipe(
    finalize(()=> {
      this.loader.dismiss();
    })
  )

  .subscribe((res: HttpResponse<any>)=> {
    if (res.status === HttpStatus.Ok) {
      this.user = res.body
      this.view = State.Authenticated;
      this.navCtrl.setRoot(HomePage)
    } else {
      console.error('something went wrong', res);
    }
  }, (err: HttpErrorResponse) => {
    if (err.status === HttpStatus.Unauthorized){
      const confirm: ResponseConfirmation = {
        title: `Something went wrong`,
        message: `Sorry, your password or email address is incorrect. Please double-check both fields and try again.`,
        nextViewState: State.Login
    }
    this.handleResponse(confirm);
  }
    console.error('All Fields Are Required To Create An Account')
    return;
});
}
public createAccount() {
  if (!this.accountForm.valid) {
    console.error('All fields are required to create an account.');
    return;
  }

  const account: Account = {
      firstName: this.accountForm.controls['firstName'].value,
      lastName: this.accountForm.controls['lastName'].value,
      email: this.accountForm.controls['email'].value,
      password: this.accountForm.controls['password'].value
  }
    this.loader = this.loadingCtrl.create();
    this.loader.present();

    this
    .authProvider
    .createAccount(account)
    .pipe(
    finalize(() => {
      this.loader.dismiss();
    })
    )
    .subscribe((res: HttpResponse<any>)=> {
      if (res.status === HttpStatus.Ok) {

        const confirm: ResponseConfirmation = {
          title: `Account created`,
          message: `To complete your registration please follow the instructionss outlined in the email we just sent.`,
          nextViewState: State.Login
        }

        this.handleResponse(confirm);
      } else {
        console.error('something went wrong', res);
      }
    }, (err: HttpErrorResponse) => {
      if (err.status === HttpStatus.UnprocessableEntity) {
        console.error('Unable to create an account, an account with the same email address is already registered', err);
      } else {
        console.error('Something went wrong', err);
      }
      });
    }
  
    private confirmEmailAddress(){
      if (!this.urlParams[UID_PARAM] || !this.urlParams[TOKEN_PARAM]) {

      console.error('Missing query parameter to confirm email address.');
      return;
      }
    const identity: IdentityConfirmation = {
      uid: this.urlParams[UID_PARAM],
      token: this.urlParams[TOKEN_PARAM]
    }
    this.loader = this.loadingCtrl.create({
      content: 'Confirming Email Address'
    });
    this.loader.present();
    this
      .authProvider
      .confirm(identity)

      .subscribe((res: HttpResponse<any>) => {

        if (res.status === HttpStatus.NoContent) {
          setTimeout(()=> {
            this.loader.dismiss();
            
          const confirm: ResponseConfirmation = {
            title: 'Email address confirmed',
            message: 'Your email address is successfully confirmed.',
            nextViewState: State.Login
            }
          this.handleResponse(confirm);
          },2000);
        } else {
        console.error('Something went wrong', res);
        }
      }, (err: HttpErrorResponse) => {
        setTimeout(()=> {
          this.loader.dismiss();
        }, 2000);
      if(err.status === HttpStatus.NotFound) {
      console.error('Unable to find user to confirm email address for', err)
      }
      else if (err.status === HttpStatus.BadRequest) {
        console.error('Invalid token, email address is already confirmed or the token is expired', err);
      } else {
        console.error('Something went wrong', err);
      }
    });
  }
  
   
  public setPassword() {
    if (!this.urlParams[ACCESS_TOKEN_PARAM] || !this.password.valid) {
      console.error('An accesstoken and a new password are required complete the reset password flow');
      return;
  }
  const passwordContext: NewPasswordContext = {
    accessToken: this.urlParams[ACCESS_TOKEN_PARAM],
    newPassword: this.accountForm.controls['password'].value
  }
    this.loader = this.loadingCtrl.create();
    this.loader.present();

    this
      .authProvider
      .setPassword(passwordContext)
      .pipe(
      finalize(() => {
        this.loader.dismiss();
      })
      )
      .subscribe((res: HttpResponse<any>) => {

      if (res.status === HttpStatus.NoContent) {
        const confirm: ResponseConfirmation = {
          title: 'Password updated',
          message: 'You can login using your new password.',
          nextViewState: State.Login
        }
        this.handleResponse(confirm);

        } else {
          console.error('Something went wrong', res);
        }
      }, (err: HttpErrorResponse) => {
        if (err.status === HttpStatus.NotFound) {
          console.error('Unable to find user to confirm email address for', err)
        } else {
          console.error('Something went wrong', err);
        }

      });

  }
  public logout() {
    this.loader = this.loadingCtrl.create();
    this.loader.present();
    this
      .authProvider
      .logout(this.user.id)
      .pipe(
      finalize(() => {
        // always hide the loader
        this.loader.dismiss();
      })
      )
      .subscribe((res: HttpResponse<any>) => {

        if (res.status === HttpStatus.NoContent) {
          const confirm: ResponseConfirmation = {
            title: 'Sucessfull',
            message: 'You have successfully been logged out.',
            nextViewState: State.Login
        }
        this.handleResponse(confirm);
  } else {
    console.error('Something went wrong', res);
  }
}, (err: HttpErrorResponse) => {
  console.error('Something went wrong', err);
});

}
public signUp() {
  this.view = State.Create;
}
public back() {
  this.view = State.Login;
}
public recoverPassword() {
  this.view = State.Recover;
}
private handleResponse(confirm: ResponseConfirmation) {

  const alert: Alert = this.alertCtrl.create({

    title: confirm.title,
    message: confirm.message,
    buttons: ['OK']

  });

  alert.onDidDismiss(() => {
    if (this.view !== confirm.nextViewState) {
       this.view = confirm.nextViewState;
    }
    });
    alert.present();
  }
  private parseQueryString(url: string) {
    let match,
      pl = /\+/g,
      search = /([^&=]+)=?([^&]*)/g,
      query = url.split('?').slice(1).join('?'),
      decode = function (s) {
        return decodeURIComponent(s.replace(pl, ' '));
      };
      while (match = search.exec(query)) {
        this.urlParams[decode(match[1])] = decode(match[2]);
    }
  }
}
