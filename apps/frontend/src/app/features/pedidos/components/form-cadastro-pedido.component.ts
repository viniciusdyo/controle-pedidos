import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../clientes/interfaces/cliente.model';
import { ClienteService } from '../../clientes/services/cliente.service';
import { Produto } from '../../produtos/interfaces/produto.model';
import { ProdutoService } from '../../produtos/services/produto.service';
import { CadastroPedido, CadastroPedidoItens } from '../interfaces/pedido.model';
import { PedidoService } from '../services/pedido.service';

export enum StatusPedido {
  PENDENTE = 'PENDENTE',
  EMPREPARACAO = 'EM-PREPARACAO',
  PRONTO = 'PRONTO',
  FINALIZADO = 'FINALIZADO',
}

@Component({
  selector: 'app-form-cadastro-pedido',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-cadastro-pedido.component.html',
})
export class FormCadastroPedidoComponent {
  @Output() cancelou = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private pedidoService = inject(PedidoService);
  private produtoService = inject(ProdutoService);
  private clienteService = inject(ClienteService);

  ngOnInit(): void {
    this.buscarProdutos();
    this.buscarClientes();
  }

  formPedido = this.fb.group({
    clienteId: [null as number | null, [Validators.required, Validators.min(1)]],
    status: ['', [Validators.required]],
    pedidoItens: this.fb.array([], [Validators.required, Validators.minLength(1)]),
  });

  listaProdutos = signal<Produto[]>([]);
  listaClientes = signal<Cliente[]>([]);

  salvando = signal(false);

  listaStatus = Object.values(StatusPedido);

  buscarProdutos() {
    this.produtoService.listarProdutos().subscribe({
      next: (resposta) => {
        const produtos = resposta.dados.filter((p) => p.status === 'ativo');
        this.listaProdutos.set(produtos);
      },
      error: () => {
        alert('Erro ao buscar produtos');
      },
    });
  }

  buscarClientes() {
    this.clienteService.listarClientes().subscribe({
      next: (resposta) => {
        this.listaClientes.set(resposta.dados);
      },
      error: () => {
        alert('Erro ao buscar clientes');
      },
    });
  }

  get itensPedido() {
    return this.formPedido.get('pedidoItens') as FormArray;
  }

  removerItem(index: number) {
    this.itensPedido.removeAt(index);
  }
  adicionarItem() {
    const itensForm = this.fb.group({
      produtoId: [null as number | null, [Validators.required, Validators.min(1)]],
      quantidade: [null as number | null, [Validators.required, Validators.min(1)]],
    });

    console.log(this.itensPedido);
    this.itensPedido.push(itensForm);
  }

  salvarPedido() {
    if (this.formPedido.invalid) {
      this.formPedido.markAsTouched();
      return;
    }

    this.salvando.set(true);

    const valoresForm = this.formPedido.value;

    const pedidoItensCadastro = new Array<CadastroPedidoItens>();

    const novoPedido = {
      clienteId: valoresForm.clienteId,
      status: valoresForm.status as CadastroPedido['status'],
      pedidoItens: valoresForm.pedidoItens as CadastroPedidoItens[],
    } as CadastroPedido;

    this.pedidoService.criarPedido(novoPedido).subscribe({
      next: () => {
        alert('Pedido salvo com sucesso!');
        this.cancelar();
        this.salvando.set(false);
      },
      error: () => {
        alert('Erro ao criar novo Pedido.');
        this.cancelar();
        this.salvando.set(false);
      },
    });
  }

  cancelar() {
    this.cancelou.emit();
  }
}
