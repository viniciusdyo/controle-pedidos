import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AtualizarStatusPedido } from '../interfaces/pedido.model';
import { PedidoService } from '../services/pedido.service';

export enum StatusPedido {
  PENDENTE = 'PENDENTE',
  EMPREPARACAO = 'EM-PREPARACAO',
  PRONTO = 'PRONTO',
  FINALIZADO = 'FINALIZADO',
}

@Component({
  selector: 'app-form-edicao-pedido',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-edicao-pedido.component.html',
})
export class FormEdicaoPedidoComponent {
  @Output() cancelou = new EventEmitter<void>();
  @Input() pedidoId = 0;

  ngOnInit(): void {
    this.carregarDadosPedido();
  }
  private fb = inject(FormBuilder);
  private pedidoService = inject(PedidoService);

  listaStatus = Object.values(StatusPedido);

  salvando = signal(false);
  carregandoDados = signal(false);

  formPedido = this.fb.group({
    status: ['', [Validators.required]],
  });

  carregarDadosPedido() {
    this.pedidoService.buscarPedidoPorId(this.pedidoId).subscribe({
      next: (resposta) => {
        console.log(resposta.dados);
        this.formPedido.patchValue(resposta.dados);
      },
      error: (resposta) => {
        console.log(resposta);
        alert('Erro ao buscar dados do Pedido');
      },
    });
  }

  salvarEdicao() {
    if (this.formPedido.invalid) {
      this.formPedido.markAllAsTouched();
      return;
    }

    this.salvando.set(true);

    const pedidoEditado = { pedidoId: this.pedidoId, status: this.formPedido.value.status };

    this.pedidoService.atualizarStatusPedido(pedidoEditado as AtualizarStatusPedido).subscribe({
      next: () => {
        alert('Pedido atualizado com sucesso.');
        this.cancelar();
      },
      error: (resposta) => {
        alert('Erro ao atualizar pedido.');
        this.cancelar();
      },
    });
  }

  cancelar() {
    this.cancelou.emit();
  }
}
