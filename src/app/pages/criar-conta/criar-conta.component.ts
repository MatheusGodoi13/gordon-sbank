import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContaService } from '../../services/conta.service';
import { CriarContaRequest } from '../../models/conta.model';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.scss']
})
export class CriarContaComponent {
  contaForm: FormGroup;
  mensagemSucesso: string = '';
  mensagemErro: string = '';
  carregando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService
  ) {
    this.contaForm = this.fb.group({
      numeroConta: ['', [Validators.required, Validators.minLength(6)]],
      agencia: ['', [Validators.required, Validators.minLength(4)]],
      tipoConta: ['CORRENTE', [Validators.required]],
      titular: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      saldoInicial: [0, [Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.contaForm.valid) {
      this.carregando = true;
      this.mensagemErro = '';
      this.mensagemSucesso = '';

      const contaRequest: CriarContaRequest = this.contaForm.value;

      this.contaService.criarConta(contaRequest).subscribe({
        next: (conta) => {
          this.mensagemSucesso = `Conta criada com sucesso! Número: ${conta.numeroConta}`;
          this.contaForm.reset({
            tipoConta: 'CORRENTE',
            saldoInicial: 0
          });
          this.carregando = false;
        },
        error: (erro) => {
          this.mensagemErro = erro.error?.message || 'Erro ao criar conta. Tente novamente.';
          this.carregando = false;
        }
      });
    } else {
      this.mensagemErro = 'Por favor, preencha todos os campos obrigatórios corretamente.';
    }
  }
}

