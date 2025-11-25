import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferenciaService } from '../../services/transferencia.service';
import { TransferenciaRequest } from '../../models/transferencia.model';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.scss']
})
export class TransferenciaComponent {
  transferenciaForm: FormGroup;
  mensagemSucesso: string = '';
  mensagemErro: string = '';
  carregando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private transferenciaService: TransferenciaService
  ) {
    this.transferenciaForm = this.fb.group({
      contaOrigem: ['', [Validators.required]],
      contaDestino: ['', [Validators.required]],
      valor: ['', [Validators.required, Validators.min(0.01)]],
      descricao: ['']
    });
  }

  onSubmit() {
    if (this.transferenciaForm.valid) {
      const contaOrigem = this.transferenciaForm.get('contaOrigem')?.value;
      const contaDestino = this.transferenciaForm.get('contaDestino')?.value;

      if (contaOrigem === contaDestino) {
        this.mensagemErro = 'A conta de origem não pode ser a mesma que a conta de destino.';
        return;
      }

      this.carregando = true;
      this.mensagemErro = '';
      this.mensagemSucesso = '';

      // Garantir que o valor seja um número
      const valor = parseFloat(this.transferenciaForm.get('valor')?.value);
      
      if (isNaN(valor) || valor <= 0) {
        this.mensagemErro = 'Valor inválido. Por favor, insira um valor numérico maior que zero.';
        this.carregando = false;
        return;
      }

      const transferenciaRequest: TransferenciaRequest = {
        contaOrigemNumero: this.transferenciaForm.get('contaOrigem')?.value?.trim(),
        contaDestinoNumero: this.transferenciaForm.get('contaDestino')?.value?.trim(),
        valor: valor,
        descricao: this.transferenciaForm.get('descricao')?.value?.trim() || undefined
      };
      
      // Remover qualquer campo booleano que possa estar sendo enviado incorretamente
      const payload: any = { ...transferenciaRequest };
      delete payload.ativa;
      delete payload.desativada;
      delete payload.active;
      delete payload.inactive;
      delete payload.enabled;
      delete payload.disabled;

      this.transferenciaService.realizarTransferencia(payload).subscribe({
        next: (transferencia) => {
          this.mensagemSucesso = `Transferência de R$ ${transferencia.valor.toFixed(2)} realizada com sucesso!`;
          this.transferenciaForm.reset();
          this.carregando = false;
        },
        error: (erro) => {
          console.error('Erro na transferência:', erro);
          if (erro.error) {
            this.mensagemErro = erro.error.message || erro.error.error || JSON.stringify(erro.error);
          } else {
            this.mensagemErro = 'Erro ao realizar transferência. Verifique os dados e tente novamente.';
          }
          this.carregando = false;
        }
      });
    } else {
      this.mensagemErro = 'Por favor, preencha todos os campos obrigatórios corretamente.';
    }
  }
}

