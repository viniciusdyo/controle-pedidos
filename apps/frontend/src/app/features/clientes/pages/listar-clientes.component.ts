import { Component, inject, OnInit, signal } from '@angular/core';
import { ModalComponent } from '../../../shared/ui/modal/modal.component';
import { TableComponent } from '../../../shared/ui/table/table.component';
import { FormCadastroClienteComponent } from '../components/form-cadastro-cliente.component';
import { FormEdicaoClienteComponent } from '../components/form-edicao-client.component';
import { Cliente } from '../interfaces/cliente.model';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-listar-clientes',
  standalone: true,
  imports: [
    TableComponent,
    ModalComponent,
    FormCadastroClienteComponent,
    FormEdicaoClienteComponent,
  ],
  templateUrl: './listar-clientes.component.html',
})
export class ListarClientesComponent implements OnInit {
  private clienteService = inject(ClienteService);

  ngOnInit(): void {
    this.carregarClientes();
  }

  colunasTabela = [
    { textoCabecalho: 'ID', campo: 'id' },
    { textoCabecalho: 'Nome', campo: 'nome' },
    { textoCabecalho: 'Telefone', campo: 'telefone' },
  ];

  tituloModalCadastro = 'Cadastrar novo cliente';
  mostraModalCadastro = signal(false);

  abrirModalCadastro() {
    this.mostraModalCadastro.set(true);
  }
  esconderModalCadastro() {
    this.mostraModalCadastro.set(false);
  }

  tituloModalEdicao = 'Editar Cliente';
  mostraModalEdicao = signal(false);

  carregandoCadastro = signal(false);
  carregandoEdicao = signal(false);

  listaClientes = signal<Cliente[]>([]);
  clienteId = signal(0);

  carregarClientes() {
    this.carregandoCadastro.set(true);
    this.clienteService.listarClientes().subscribe({
      next: (dados) => {
        this.listaClientes.set(dados.dados);
        console.log(this.listaClientes(), 'dados API');
        this.carregandoCadastro.set(false);
      },
      error: (erro) => {
        console.error('Erro ao buscar clientes: ', erro);
        this.carregandoCadastro.set(false);
      },
    });
  }

  abrirModalEdicao(cliente: Cliente) {
    this.clienteId.set(cliente.id);
    this.mostraModalEdicao.set(true);
  }

  esconderModalEdicao() {
    this.mostraModalEdicao.set(false);
  }
}
