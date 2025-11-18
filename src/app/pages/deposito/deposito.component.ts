import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepositoService } from '../../services/deposito.service';
import { DepositoRequest } from '../../models/deposito.model';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.scss']
})
export class DepositoComponent {
  depositoForm: FormGroup;
  mensagemSucesso: string = '';
  mensagemErro: string = '';
  carregando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private depositoService: DepositoService
  ) {
    this.depositoForm = this.fb.group({
      numeroConta: ['', [Validators.required]],
      valor: ['', [Validators.required, Validators.min(0.01)]],
      descricao: ['']
    });
  }

  onSubmit() {
    if (this.depositoForm.valid) {
      this.carregando = true;
      this.mensagemErro = '';
      this.mensagemSucesso = '';

      const depositoRequest: DepositoRequest = this.depositoForm.value;

      this.depositoService.realizarDeposito(depositoRequest).subscribe({
        next: (deposito) => {
          this.mensagemSucesso = `Depósito de R$ ${deposito.valor.toFixed(2)} realizado com sucesso na conta ${deposito.numeroConta}!`;
          this.depositoForm.reset();
          this.carregando = false;
        },
        error: (erro) => {
          this.mensagemErro = erro.error?.message || 'Erro ao realizar depósito. Verifique os dados e tente novamente.';
          this.carregando = false;
        }
      });
    } else {
      this.mensagemErro = 'Por favor, preencha todos os campos obrigatórios corretamente.';
    }
  }
}

