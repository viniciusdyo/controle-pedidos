import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AtualizarStatusPedido, CadastroPedido, Pedido } from '../interfaces/pedido.model';

export interface RespostaApi<T> {
  sucesso: boolean;
  dados: T;
}

@Injectable({ providedIn: 'root' })
export class PedidoService {
  apiUrl = 'http://localhost:3333/api/v1/pedidos';

  private http = inject(HttpClient);

  listarPedidos(): Observable<RespostaApi<Pedido[]>> {
    return this.http.get<RespostaApi<Pedido[]>>(this.apiUrl);
  }

  criarPedido(pedido: CadastroPedido): Observable<RespostaApi<Pedido>> {
    return this.http.post<RespostaApi<Pedido>>(this.apiUrl, pedido);
  }

  atualizarStatusPedido(pedido: AtualizarStatusPedido): Observable<RespostaApi<Pedido>> {
    return this.http.put<RespostaApi<Pedido>>(this.apiUrl, pedido);
  }

  buscarPedidoPorId(id: number): Observable<RespostaApi<Pedido>> {
    console.log(id);
    return this.http.get<RespostaApi<Pedido>>(this.apiUrl + `/${id}`);
  }
}
