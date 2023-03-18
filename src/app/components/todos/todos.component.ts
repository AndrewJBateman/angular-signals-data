import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NewComponent } from './new/new.component';
import { NavComponent } from '../nav/nav.component';
import { ListComponent } from '../todos/list/list.component';
import { provideTodosStore, TODOS_STORE } from '../todos/todos.signal';

@Component({
  standalone: true,
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  providers: [provideTodosStore()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NewComponent, ListComponent, NavComponent],
})
export default class TodosComponent implements OnInit {
  readonly todosStore = inject(TODOS_STORE);

  ngOnInit(): void {
    this.todosStore.load();
  }
}
