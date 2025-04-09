import { Todo } from './todo';

export class TodoList {
  todos: Todo[];

  constructor() {
    this.todos = [];
    this.loadFromLocalStorage();
  }

  addTodo(task: string, priority: number): boolean {
    if (!task || priority < 1 || priority > 3) {
      return false;
    }

    const newTodo: Todo = {
      task: task,
      completed: false,
      priority: priority,
    };

    this.todos.push(newTodo);
    this.saveToLocalStorage();
    return true;
}

markTodoCompleted(todoIndex: number): void {
    if (this.todos[todoIndex]) {
      this.todos[todoIndex].completed = true;
      this.saveToLocalStorage();
    }
  }

  deleteTodo(todoIndex: number) {
    if (this.todos[todoIndex]) {
      this.todos.splice(todoIndex, 1);  // Ta bort Todo från arrayen
      this.saveToLocalStorage();
    }
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadFromLocalStorage(): void {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
      console.log('Laddade todos från LocalStorage:', this.todos);
    }
  }
}