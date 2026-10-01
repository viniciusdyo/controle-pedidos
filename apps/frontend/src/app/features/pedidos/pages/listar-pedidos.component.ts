import { Component, inject, OnInit, signal } from '@angular/core';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { TableComponent } from '../../../shared/ui/table/table.component';
import { FormCadastroPedidoComponent } from '../components/form-cadastro-pedido.component';
import { FormEdicaoPedidoComponent } from '../components/form-edicao-pedido.component';
import { Pedido } from '../interfaces/pedido.model';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-listar-pedidos',
  standalone: true,
  imports: [TableComponent, ModalComponent, FormCadastroPedidoComponent, FormEdicaoPedidoComponent],
  templateUrl: './listar-pedidos.component.html',
})
export class ListarPedidosComponent implements OnInit {
  private pedidoService = inject(PedidoService);

  ngOnInit(): void {
    this.carregarPedidos();
  }

  colunasTabela = [
    { textoCabecalho: 'ID', campo: 'id' },
    { textoCabecalho: 'Cliente', campo: 'cliente' },
    { textoCabecalho: 'Valor Total', campo: 'valorTotal' },
    { textoCabecalho: 'Status', campo: 'status' },
  ];

  tituloModalCadastro = 'Cadastrar novo pedido';
  mostraModalCadastro = signal(false);

  abrirModalCadastro() {
    this.mostraModalCadastro.set(true);
  }
  esconderModalCadastro() {
    this.mostraModalCadastro.set(false);
  }

  tituloModalEdicao = 'Editar Pedido';
  mostraModalEdicao = signal(false);

  carregandoCadastro = signal(false);
  carregandoEdicao = signal(false);

  listaPedidos = signal<Pedido[]>([]);
  pedidoId = signal(0);

  carregarPedidos() {
    this.carregandoCadastro.set(true);
    this.pedidoService.listarPedidos().subscribe({
      next: (dados) => {
        this.listaPedidos.set(dados.dados);
        console.log(this.listaPedidos(), 'dados API');
        this.carregandoCadastro.set(false);
      },
      error: (erro) => {
        console.error('Erro ao buscar pedidos: ', erro);
        this.carregandoCadastro.set(false);
      },
    });
  }

  abrirModalEdicao(pedido: Pedido) {
    this.pedidoId.set(pedido.id);
    this.mostraModalEdicao.set(true);
  }

  esconderModalEdicao() {
    this.mostraModalEdicao.set(false);
  }
}
