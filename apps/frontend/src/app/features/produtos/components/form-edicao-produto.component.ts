import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Produto } from '../interfaces/produto.model';
import { ProdutoService } from '../services/produto.service';
import { StatusProduto } from './form-cadastro-produto.component';

@Component({
  selector: 'app-form-edicao-produto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-edicao-produto.component.html',
})
export class FormEdicaoProdutoComponent {
  @Output() cancelou = new EventEmitter<void>();
  @Input() produtoId = 0;

  ngOnInit(): void {
    this.carregarDadosProduto();
  }
  private fb = inject(FormBuilder);
  private produtoService = inject(ProdutoService);

  listaStatus = Object.values(StatusProduto);

  salvando = signal(false);
  carregandoDados = signal(false);

  formProduto = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    status: ['', [Validators.required]],
    valorUnidade: [null as number | null, [Validators.required, Validators.min(1)]],
  });

  carregarDadosProduto() {
    this.produtoService.buscarProdutoPorId(this.produtoId).subscribe({
      next: (resposta) => {
        console.log(resposta.dados);
        this.formProduto.patchValue(resposta.dados);
      },
      error: (resposta) => {
        console.log(resposta);
        alert('Erro ao buscar dados do Produto');
      },
    });
  }

  salvarEdicao() {
    if (this.formProduto.invalid) {
      this.formProduto.markAllAsTouched();
      return;
    }

    this.salvando.set(true);

    const produtoEditado = { id: this.produtoId, ...this.formProduto.value };

    this.produtoService.editarProduto(produtoEditado as Produto).subscribe({
      next: () => {
        alert('Produto atualizado com sucesso.');
        this.cancelar();
      },
      error: () => {
        alert('Erro ao atualizar produto.');
        this.cancelar();
      },
    });
  }

  cancelar() {
    this.cancelou.emit();
  }
}
