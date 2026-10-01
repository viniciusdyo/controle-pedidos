import { Component, inject, OnInit, signal } from '@angular/core';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { TableComponent } from '../../../shared/ui/table/table.component';
import { FormCadastroProdutoComponent } from '../components/form-cadastro-produto.component';
import { FormEdicaoProdutoComponent } from '../components/form-edicao-produto.component';
import { Produto } from '../interfaces/produto.model';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-listar-produtos',
  standalone: true,
  imports: [
    TableComponent,
    ModalComponent,
    FormCadastroProdutoComponent,
    FormEdicaoProdutoComponent,
  ],
  templateUrl: './listar-produtos.component.html',
})
export class ListarProdutosComponent implements OnInit {
  private produtoService = inject(ProdutoService);

  ngOnInit(): void {
    this.carregarProdutos();
  }

  colunasTabela = [
    { textoCabecalho: 'ID', campo: 'id' },
    { textoCabecalho: 'Nome', campo: 'nome' },
    { textoCabecalho: 'Valor Unidade', campo: 'valorUnidade' },
    { textoCabecalho: 'Status', campo: 'status' },
  ];

  tituloModalCadastro = 'Cadastrar novo produto';
  mostraModalCadastro = signal(false);

  abrirModalCadastro() {
    this.mostraModalCadastro.set(true);
  }
  esconderModalCadastro() {
    this.mostraModalCadastro.set(false);
  }

  tituloModalEdicao = 'Editar Produto';
  mostraModalEdicao = signal(false);

  carregandoCadastro = signal(false);
  carregandoEdicao = signal(false);

  listaProdutos = signal<Produto[]>([]);
  produtoId = signal(0);

  carregarProdutos() {
    this.carregandoCadastro.set(true);
    this.produtoService.listarProdutos().subscribe({
      next: (dados) => {
        this.listaProdutos.set(dados.dados);
        console.log(this.listaProdutos(), 'dados API');
        this.carregandoCadastro.set(false);
      },
      error: (erro) => {
        console.error('Erro ao buscar produtos: ', erro);
        this.carregandoCadastro.set(false);
      },
    });
  }

  abrirModalEdicao(produto: Produto) {
    this.produtoId.set(produto.id);
    this.mostraModalEdicao.set(true);
  }

  esconderModalEdicao() {
    this.mostraModalEdicao.set(false);
  }
}
