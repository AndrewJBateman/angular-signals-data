import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Todo } from '../todo.interface';

@Component({
  selector: 'app-detail[todo]',
  standalone: true,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})

export class DetailComponent {
  @Input() todo!: Todo;
  @Output() toggle = new EventEmitter<number>();
  @Output() update = new EventEmitter<{ id: number; text: string }>();
  @Output() delete = new EventEmitter<number>();

  editing = signal(false);

  // method to update todo text
  updateText(todoId: number, text: string): void {
    if (text && text.trim() !== this.todo?.text) {
      this.update.emit({ id: todoId, text: text.trim() });
    }
    this.editing.set(false);
  }
}
