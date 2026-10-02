import { DatePipe } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { CustomInputComponent } from '../../../shared/ui/form/custom-input.component';
import { Pedido } from '../interfaces/pedido.model';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-pedido-detalhes',
  standalone: true,
  imports: [CustomInputComponent, DatePipe],
  templateUrl: './pedido-detalhes.components.html',
})
export class PedidoDetalhesComponent {
  @Input() pedidoId: number | null = null;

  private pedidoService = inject(PedidoService);

  pedido = signal<Pedido | null>(null);

  ngOnInit(): void {
    this.carregarPedido();
  }

  carregarPedido() {
    if (this.pedidoId !== null) {
      this.pedidoService.buscarPedidoPorId(this.pedidoId).subscribe({
        next: (resposta) => {
          this.pedido.set(resposta.dados);
        },
        error: (resposta) => {
          console.log(resposta);
          alert('Erro ao buscar detalhes do Pedido');
        },
      });
    }
  }
}
