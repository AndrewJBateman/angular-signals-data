import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new',
  standalone: true,
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent {
  @Output() addTodo = new EventEmitter<string>();

  newTodo(text: string): void {
    if (text && text.trim()) {
      this.addTodo.emit(text.trim());
    }
  }
}
