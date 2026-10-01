export interface Produto {
  id: number;
  nome: string;
  valorUnidade: number;
  status: 'ativo' | 'inativo';
  createdAt: string | null;
  updatedAt: string | null;
}
