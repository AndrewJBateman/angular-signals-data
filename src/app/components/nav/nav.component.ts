import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TodoFilter } from '../todos/todos.signal';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  imports: [RouterLink, NgIf],
})

export class NavComponent {
  @Input() hasCompletedTodos = false;
  @Input() incompleteTodosCount = 0;
  @Input() currentFilter: TodoFilter = 'all';
  @Output() clearCompleted = new EventEmitter();
}
