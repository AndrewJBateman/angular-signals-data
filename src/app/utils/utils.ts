import {
  ChangeDetectorRef,
  computed,
  inject,
  signal,
  Signal,
  ViewRef,
} from '@angular/core';
import { Observable } from 'rxjs';

export function fromObservable<T>(obs$: Observable<T>): Signal<T>;
export function fromObservable<T, U>(
  source: Observable<T>,
  initialValue: U
): Signal<T | U>;
export function fromObservable<T, U = never>(
  source: Observable<T>,
  initialValue?: U
): Signal<T | U> {
  let initialState: State<T | U>;
  if (initialValue === undefined && arguments.length !== 2) {
    initialState = { kind: StateKind.NoValue };
  } else {
    initialState = { kind: StateKind.Value, value: initialValue! };
  }

  const state = signal<State<T | U>>(initialState);

  const subscription = source.subscribe({
    next: value => state.set({ kind: StateKind.Value, value }),
    error: error => state.set({ kind: StateKind.Error, error }),
  });

  // HACK  PLEASE DO NOT COPY THIS TO USE IN YOUR CODE
  const viewRef = inject(ChangeDetectorRef) as ViewRef;
  queueMicrotask(() => {
    viewRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  });
  // HACK  END

  return computed(() => {
    const current = state();
    switch (current.kind) {
      case StateKind.NoValue:
        throw new Error(
          `fromObservable() signal read before the Observable emitted`
        );
      case StateKind.Value:
        return current.value;
      case StateKind.Error:
        throw current.error;
    }
  });
}
const enum StateKind {
  NoValue,
  Value,
  Error,
}

interface NoValueState {
  kind: StateKind.NoValue;
}

interface ValueState<T> {
  kind: StateKind.Value;
  value: T;
}

interface ErrorState {
  kind: StateKind.Error;
  error: unknown;
}

type State<T> = NoValueState | ValueState<T> | ErrorState;
