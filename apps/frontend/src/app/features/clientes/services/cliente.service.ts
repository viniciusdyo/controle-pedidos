import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente.model';

export interface RespostaApi<T> {
  sucesso: boolean;
  dados: T;
}

@Injectable({ providedIn: 'root' })
export class ClienteService {
  apiUrl = 'http://localhost:3333/api/v1/clientes';

  private http = inject(HttpClient);

  listarClientes(): Observable<RespostaApi<Cliente[]>> {
    return this.http.get<RespostaApi<Cliente[]>>(this.apiUrl);
  }

  criarCliente(cliente: Cliente): Observable<RespostaApi<Cliente>> {
    return this.http.post<RespostaApi<Cliente>>(this.apiUrl, cliente);
  }

  editarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.apiUrl, cliente);
  }

  buscarClientePorId(id: number): Observable<RespostaApi<Cliente>> {
    console.log(id);
    return this.http.get<RespostaApi<Cliente>>(this.apiUrl + `/${id}`);
  }
}
