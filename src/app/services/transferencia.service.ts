import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transferencia, TransferenciaRequest } from '../models/transferencia.model';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {
  private apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.transferencias}`;

  constructor(private http: HttpClient) { }

  realizarTransferencia(transferencia: TransferenciaRequest): Observable<Transferencia> {
    return this.http.post<Transferencia>(this.apiUrl, transferencia);
  }

  listarTransferencias(): Observable<Transferencia[]> {
    return this.http.get<Transferencia[]>(this.apiUrl);
  }

  buscarTransferenciasPorConta(numeroConta: string): Observable<Transferencia[]> {
    return this.http.get<Transferencia[]>(`${this.apiUrl}/conta/${numeroConta}`);
  }
}

