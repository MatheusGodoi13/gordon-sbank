import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conta, CriarContaRequest } from '../models/conta.model';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ContaService {
  private apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.contas}`;

  constructor(private http: HttpClient) { }

  criarConta(conta: CriarContaRequest): Observable<Conta> {
    return this.http.post<Conta>(this.apiUrl, conta);
  }

  listarContas(): Observable<Conta[]> {
    return this.http.get<Conta[]>(this.apiUrl);
  }

  buscarContaPorId(id: number): Observable<Conta> {
    return this.http.get<Conta>(`${this.apiUrl}/${id}`);
  }

  buscarContaPorNumero(numeroConta: string): Observable<Conta> {
    return this.http.get<Conta>(`${this.apiUrl}/numero/${numeroConta}`);
  }

  excluirConta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  excluirContaPorNumero(numeroConta: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/numero/${numeroConta}`);
  }
}

