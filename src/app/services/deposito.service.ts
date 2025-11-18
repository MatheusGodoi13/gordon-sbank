import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Deposito, DepositoRequest } from '../models/deposito.model';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class DepositoService {
  private apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.depositos}`;

  constructor(private http: HttpClient) { }

  realizarDeposito(deposito: DepositoRequest): Observable<Deposito> {
    return this.http.post<Deposito>(this.apiUrl, deposito);
  }

  listarDepositos(): Observable<Deposito[]> {
    return this.http.get<Deposito[]>(this.apiUrl);
  }

  buscarDepositosPorConta(numeroConta: string): Observable<Deposito[]> {
    return this.http.get<Deposito[]>(`${this.apiUrl}/conta/${numeroConta}`);
  }
}

