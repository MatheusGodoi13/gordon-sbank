import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContaService } from '../../services/conta.service';
import { Conta } from '../../models/conta.model';

@Component({
  selector: 'app-excluir-conta',
  templateUrl: './excluir-conta.component.html',
  styleUrls: ['./excluir-conta.component.scss']
})
export class ExcluirContaComponent {
  excluirForm: FormGroup;
  contaEncontrada: Conta | null = null;
  mensagemSucesso: string = '';
  mensagemErro: string = '';
  carregando: boolean = false;
  buscando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService
  ) {
    this.excluirForm = this.fb.group({
      numeroConta: ['', [Validators.required]]
    });
  }

  buscarConta() {
    const numeroConta = this.excluirForm.get('numeroConta')?.value;
    if (numeroConta) {
      this.buscando = true;
      this.mensagemErro = '';
      this.contaEncontrada = null;

      this.contaService.buscarContaPorNumero(numeroConta).subscribe({
        next: (conta) => {
          this.contaEncontrada = conta;
          this.buscando = false;
        },
        error: (erro) => {
          this.mensagemErro = erro.error?.message || 'Conta não encontrada.';
          this.contaEncontrada = null;
          this.buscando = false;
        }
      });
    }
  }

  confirmarExclusao() {
    if (this.contaEncontrada) {
      this.carregando = true;
      this.mensagemErro = '';
      this.mensagemSucesso = '';

      const numeroConta = this.contaEncontrada.numeroConta;

      this.contaService.excluirContaPorNumero(numeroConta).subscribe({
        next: () => {
          this.mensagemSucesso = `Conta ${numeroConta} excluída com sucesso!`;
          this.contaEncontrada = null;
          this.excluirForm.reset();
          this.carregando = false;
        },
        error: (erro) => {
          this.mensagemErro = erro.error?.message || 'Erro ao excluir conta. Tente novamente.';
          this.carregando = false;
        }
      });
    }
  }

  cancelar() {
    this.contaEncontrada = null;
    this.mensagemErro = '';
    this.mensagemSucesso = '';
    this.excluirForm.reset();
  }
}

