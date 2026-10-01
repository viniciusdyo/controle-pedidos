import { Cliente } from '../../clientes/interfaces/cliente.model';

export interface Pedido {
  id: number;
  cliente: Cliente | null;
  clienteId: number;
  valorTotal: number;
  pedidoItens: PedidoItem[];
  status: 'PENDENTE' | 'EM-PREPARACAO' | 'PRONTO' | 'FINALIZADO';
  cancelado: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface PedidoItem {
  id: number;
  nome: string;
  valorUnidade: number;
  produtoId: number;
  quantidade: number;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface AtualizarStatusPedido {
  pedidoId: number;
  status: 'PENDENTE' | 'EM-PREPARACAO' | 'PRONTO' | 'FINALIZADO';
}

export interface CadastroPedido {
  clienteId: number;
  status: 'PENDENTE' | 'EM-PREPARACAO' | 'PRONTO' | 'FINALIZADO';
  pedidoItens: CadastroPedidoItens[];
}

export interface CadastroPedidoItens {
  produtoId: number;
  quantidade: number;
}
