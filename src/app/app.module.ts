import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CriarContaComponent } from './pages/criar-conta/criar-conta.component';
import { ExcluirContaComponent } from './pages/excluir-conta/excluir-conta.component';
import { TransferenciaComponent } from './pages/transferencia/transferencia.component';
import { DepositoComponent } from './pages/deposito/deposito.component';
import { EmprestimoComponent } from './pages/emprestimo/emprestimo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'criar-conta', component: CriarContaComponent },
  { path: 'excluir-conta', component: ExcluirContaComponent },
  { path: 'transferencia', component: TransferenciaComponent },
  { path: 'deposito', component: DepositoComponent },
  { path: 'emprestimo', component: EmprestimoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CriarContaComponent,
    ExcluirContaComponent,
    TransferenciaComponent,
    DepositoComponent,
    EmprestimoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
