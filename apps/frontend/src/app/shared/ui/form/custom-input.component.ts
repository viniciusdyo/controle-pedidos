import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  template: `
    <div class="flex flex-col gap-y-2">
      @if (label) {
        <label for="{{ label }}">{{ label }}</label>
      }
      <input
        class="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-100"
        [type]="type"
        [value]="value"
        [placeholder]="placeholder"
        [required]="required"
        [disabled]="disabled"
        [readonly]="readonly"
        (input)="onInputChange($event)"
        (blur)="onTouched()"
      />
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() label: string | null = null;
  @Input() type: 'text' | 'number' | 'date' | 'datetime-local' = 'text';
  @Input() value: string | number | null = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;

  onChange: (value: string | number | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string | number | null): void {
    this.value = value;
  }
  registerOnChange(fn: (value: string | number | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    if (this.type === 'number') {
      const numberValue = inputValue === '' ? null : Number(inputValue);
      this.onChange(numberValue);
    } else {
      this.onChange(inputValue);
    }
  }
}
