import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  { component: LoginComponent, path: "", data: { title: "Inloggen op Rekeningrijden" } },
  { component: RegisterComponent, path: "registreren", data: { title: "Registreren op Rekeningrijden" } },
  { component: AdminComponent, path: "admin", data: { title: "Beheer de Rekeningrijden applicaties" } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
