import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContaService } from '../../services/conta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  mensagemErro: string = '';
  carregando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.carregando = true;
      this.mensagemErro = '';

      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      // Busca todas as contas e verifica se existe uma com o email informado
      this.contaService.listarContas().subscribe({
        next: (contas) => {
          const conta = contas.find(c => c.email === email);
          
          if (conta) {
            // Login bem-sucedido - redireciona para home
            // Em uma aplicação real, você salvaria o token/sessão aqui
            localStorage.setItem('contaLogada', JSON.stringify(conta));
            this.router.navigate(['/']);
          } else {
            this.mensagemErro = 'Email ou senha inválidos.';
            this.carregando = false;
          }
        },
        error: (erro) => {
          this.mensagemErro = erro.error?.message || 'Erro ao fazer login. Tente novamente.';
          this.carregando = false;
        }
      });
    } else {
      this.mensagemErro = 'Por favor, preencha todos os campos corretamente.';
    }
  }
}
