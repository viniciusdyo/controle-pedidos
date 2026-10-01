import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() titulo = 'Título da Modal';
  @Output() fechou = new EventEmitter<void>();

  fechar() {
    this.fechou.emit();
  }
}
