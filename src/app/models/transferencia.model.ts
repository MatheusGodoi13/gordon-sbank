export interface Transferencia {
  id?: number;
  contaOrigem: string;
  contaDestino: string;
  valor: number;
  dataTransferencia?: Date;
  descricao?: string;
}

export interface TransferenciaRequest {
  contaOrigemNumero: string;
  contaDestinoNumero: string;
  valor: number;
  descricao?: string;
}

