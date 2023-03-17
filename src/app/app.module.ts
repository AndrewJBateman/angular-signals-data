import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { ListComponent } from './components/todos/list/list.component';
import { NewComponent } from './components/todos/new/new.component';
import { DetailComponent } from './components/todos/detail/detail.component';
import { TodosComponent } from './components/todos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ListComponent,
    NewComponent,
    DetailComponent,
    TodosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
