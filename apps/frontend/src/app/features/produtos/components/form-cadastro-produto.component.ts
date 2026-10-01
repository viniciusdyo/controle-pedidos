import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Produto } from '../interfaces/produto.model';
import { ProdutoService } from '../services/produto.service';

export enum StatusProduto {
  ATIVO = 'ativo',
  INATIVO = 'inativo',
}

@Component({
  selector: 'app-form-cadastro-produto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-cadastro-produto.component.html',
})
export class FormCadastroProdutoComponent {
  @Output() cancelou = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private produtoService = inject(ProdutoService);

  formProduto = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    status: ['', [Validators.required]],
    valorUnidade: [null as number | null, [Validators.required, Validators.min(1)]],
  });

  salvando = signal(false);

  listaStatus = Object.values(StatusProduto);

  salvarProduto() {
    if (this.formProduto.invalid) {
      this.formProduto.markAsTouched();
      return;
    }

    this.salvando.set(true);

    const novoProduto = this.formProduto.value as Produto;

    this.produtoService.criarProduto(novoProduto).subscribe({
      next: () => {
        alert('Produto salvo com sucesso!');
        this.cancelar();
      },
      error: () => {
        alert('Erro ao criar novo Produto.');
        this.cancelar();
      },
    });
  }

  cancelar() {
    this.cancelou.emit();
  }
}
