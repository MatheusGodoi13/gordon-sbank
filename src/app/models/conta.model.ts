export interface Conta {
  id?: number;
  numeroConta: string;
  agencia: string;
  tipoConta: string;
  saldo: number;
  titular: string;
  cpf: string;
  email: string;
  telefone?: string;
  dataCriacao?: Date;
}

export interface CriarContaRequest {
  numeroConta: string;
  agencia: string;
  tipoConta: string;
  titular: string;
  cpf: string;
  email: string;
  telefone?: string;
  saldoInicial?: number;
}

