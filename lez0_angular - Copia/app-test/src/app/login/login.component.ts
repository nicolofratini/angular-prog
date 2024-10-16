import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){

    this.myForm = this.fb.group({
      username: ['', Validators.required], //controllo per il nome
      password: ['', Validators.required], //controllo pw
    })
  }

  ngOnInit(){
    //per eseguire altre logiche di inizalizzazione se necessario
  }

  onSubmit(){

    const username = this.myForm.get('username')?.value;
    const password = this.myForm.get('password')?.value;

    this.authService.authenticate(username, password).subscribe({ //per gestire la sottoscrizione
      next: (user) => {
        if(user){
          sessionStorage.setItem('userId', user.id.toString());
          this.router.navigate(['/clienti'])
        } else {
          alert('Credenziali non valide');
        }
      },
      error: (err) => {
        console.error("Errore del server");
      }
    });

    /* if(this.myForm.valid){
      console.log(this.myForm.value); //visualizza i valori del form
    }
    else {
      console.log('Il form non è valido');
    } */
  }
}
