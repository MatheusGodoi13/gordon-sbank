import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmprestimoService } from '../../services/emprestimo.service';
import { EmprestimoRequest } from '../../models/emprestimo.model';

@Component({
  selector: 'app-emprestimo',
  templateUrl: './emprestimo.component.html',
  styleUrls: ['./emprestimo.component.scss']
})
export class EmprestimoComponent {
  emprestimoForm: FormGroup;
  mensagemSucesso: string = '';
  mensagemErro: string = '';
  carregando: boolean = false;
  valorParcela: number = 0;

  constructor(
    private fb: FormBuilder,
    private emprestimoService: EmprestimoService
  ) {
    this.emprestimoForm = this.fb.group({
      numeroConta: ['', [Validators.required]],
      valor: ['', [Validators.required, Validators.min(100)]],
      numeroParcelas: ['', [Validators.required, Validators.min(1), Validators.max(60)]],
      descricao: ['']
    });

    // Calcular valor da parcela quando valor ou número de parcelas mudar
    this.emprestimoForm.get('valor')?.valueChanges.subscribe(() => this.calcularParcela());
    this.emprestimoForm.get('numeroParcelas')?.valueChanges.subscribe(() => this.calcularParcela());
  }

  calcularParcela() {
    const valor = this.emprestimoForm.get('valor')?.value;
    const numeroParcelas = this.emprestimoForm.get('numeroParcelas')?.value;

    if (valor && numeroParcelas && valor > 0 && numeroParcelas > 0) {
      // Taxa de juros simples de 2% ao mês
      const taxaJuros = 0.02;
      const valorComJuros = valor * (1 + (taxaJuros * numeroParcelas));
      this.valorParcela = valorComJuros / numeroParcelas;
    } else {
      this.valorParcela = 0;
    }
  }

  onSubmit() {
    if (this.emprestimoForm.valid) {
      this.carregando = true;
      this.mensagemErro = '';
      this.mensagemSucesso = '';

      const emprestimoRequest: EmprestimoRequest = this.emprestimoForm.value;

      this.emprestimoService.solicitarEmprestimo(emprestimoRequest).subscribe({
        next: (emprestimo) => {
          this.mensagemSucesso = `Empréstimo de R$ ${emprestimo.valor.toFixed(2)} aprovado! ${emprestimo.numeroParcelas} parcelas de R$ ${emprestimo.valorParcela.toFixed(2)}`;
          this.emprestimoForm.reset();
          this.valorParcela = 0;
          this.carregando = false;
        },
        error: (erro) => {
          this.mensagemErro = erro.error?.message || 'Erro ao solicitar empréstimo. Verifique os dados e tente novamente.';
          this.carregando = false;
        }
      });
    } else {
      this.mensagemErro = 'Por favor, preencha todos os campos obrigatórios corretamente.';
    }
  }
}

