export interface Transferencia {
  id?: number;
  contaOrigem: string;
  contaDestino: string;
  valor: number;
  dataTransferencia?: Date;
  descricao?: string;
}

export interface TransferenciaRequest {
  contaOrigem: string;
  contaDestino: string;
  valor: number;
  descricao?: string;
}

