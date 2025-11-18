import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emprestimo, EmprestimoRequest } from '../models/emprestimo.model';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {
  private apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.emprestimos}`;

  constructor(private http: HttpClient) { }

  solicitarEmprestimo(emprestimo: EmprestimoRequest): Observable<Emprestimo> {
    return this.http.post<Emprestimo>(this.apiUrl, emprestimo);
  }

  listarEmprestimos(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(this.apiUrl);
  }

  buscarEmprestimosPorConta(numeroConta: string): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(`${this.apiUrl}/conta/${numeroConta}`);
  }

  buscarEmprestimoPorId(id: number): Observable<Emprestimo> {
    return this.http.get<Emprestimo>(`${this.apiUrl}/${id}`);
  }
}

