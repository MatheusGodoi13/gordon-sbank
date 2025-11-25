export interface Emprestimo {
  id?: number;
  numeroConta: string;
  valor: number;
  taxaJuros: number;
  numeroParcelas: number;
  valorParcela: number;
  dataContratacao?: Date;
  status?: string;
}

export interface EmprestimoRequest {
  numeroConta: string;
  valor: number;
  numeroParcelas: number;
  taxaJuros: number;
  descricao?: string;
}

