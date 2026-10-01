import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../interfaces/cliente.model';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-form-edicao-cliente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-edicao-cliente.component.html',
})
export class FormEdicaoClienteComponent {
  @Output() cancelou = new EventEmitter<void>();
  @Input() clienteId = 0;

  ngOnInit(): void {
    this.carregarDadosCliente();
  }
  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);

  salvando = signal(false);
  carregandoDados = signal(false);

  formCliente = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    telefone: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(13)]],
  });

  carregarDadosCliente() {
    this.clienteService.buscarClientePorId(this.clienteId).subscribe({
      next: (resposta) => {
        console.log(resposta.dados);
        this.formCliente.patchValue(resposta.dados);
      },
      error: (resposta) => {
        console.log(resposta);
        alert('Erro ao buscar dados do Cliente');
      },
    });
  }

  salvarEdicao() {
    if (this.formCliente.invalid) {
      this.formCliente.markAllAsTouched();
      return;
    }

    this.salvando.set(true);

    const clienteEditado = { id: this.clienteId, ...this.formCliente.value };

    this.clienteService.editarCliente(clienteEditado as Cliente).subscribe({
      next: () => {
        alert('Cliente atualizado com sucesso.');
        this.cancelar();
      },
      error: () => {
        alert('Erro ao atualizar cliente.');
        this.cancelar();
      },
    });
  }

  cancelar() {
    this.cancelou.emit();
  }
}
