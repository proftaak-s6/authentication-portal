import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { component: LoginComponent, path: "", data: { title: "Inloggen op Mijn Rekeningrijden" } },
  { component: RegisterComponent, path: "registreren", data: { title: "Registreren op Mijn Rekeningrijden" } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
