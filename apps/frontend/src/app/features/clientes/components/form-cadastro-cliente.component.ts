import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../interfaces/cliente.model';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-form-cadastro-cliente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-cadastro-cliente.component.html',
})
export class FormCadastroClienteComponent {
  @Output() cancelou = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);

  formCliente = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    telefone: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(13)]],
  });

  salvando = signal(false);

  salvarCliente() {
    if (this.formCliente.invalid) {
      this.formCliente.markAsTouched();
      return;
    }

    this.salvando.set(true);

    const novoCliente = this.formCliente.value as Cliente;

    this.clienteService.criarCliente(novoCliente).subscribe({
      next: () => {
        alert('Cliente salvo com sucesso!');
        this.cancelar();
      },
      error: () => {
        alert('Erro ao criar novo Cliente.');
        this.cancelar();
      },
    });
  }

  cancelar() {
    this.cancelou.emit();
  }
}
