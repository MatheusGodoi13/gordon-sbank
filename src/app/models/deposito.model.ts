export interface Deposito {
  id?: number;
  numeroConta: string;
  valor: number;
  dataDeposito?: Date;
  descricao?: string;
}

export interface DepositoRequest {
  numeroConta: string;
  valor: number;
  descricao?: string;
}

