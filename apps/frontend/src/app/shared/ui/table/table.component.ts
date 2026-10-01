import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
})
export class TableComponent {
  @Input() colunas: { textoCabecalho: string; campo: string }[] = [];
  @Input() dados: any[] = [];
  @Output() edicao = new EventEmitter<any>();

  onEditarClick(row: any) {
    this.edicao.emit(row);
  }
}
