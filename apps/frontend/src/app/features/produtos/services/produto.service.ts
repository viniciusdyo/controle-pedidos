import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../interfaces/produto.model';

export interface RespostaApi<T> {
  sucesso: boolean;
  dados: T;
}

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  apiUrl = 'http://localhost:3333/api/v1/produtos';

  private http = inject(HttpClient);

  listarProdutos(): Observable<RespostaApi<Produto[]>> {
    return this.http.get<RespostaApi<Produto[]>>(this.apiUrl);
  }

  criarProduto(produto: Produto): Observable<RespostaApi<Produto>> {
    return this.http.post<RespostaApi<Produto>>(this.apiUrl, produto);
  }

  editarProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(this.apiUrl, produto);
  }

  buscarProdutoPorId(id: number): Observable<RespostaApi<Produto>> {
    console.log(id);
    return this.http.get<RespostaApi<Produto>>(this.apiUrl + `/${id}`);
  }
}
