export class TodoList {
    constructor() {
        this.todos = [];
        this.loadFromLocalStorage();
    }
    addTodo(task, priority) {
        if (!task || priority < 1 || priority > 3) {
            return false;
        }
        const newTodo = {
            task: task,
            completed: false,
            priority: priority,
        };
        this.todos.push(newTodo);
        this.saveToLocalStorage();
        return true;
    }
    markTodoCompleted(todoIndex) {
        if (this.todos[todoIndex]) {
            this.todos[todoIndex].completed = true;
            this.saveToLocalStorage();
        }
    }
    markTodoIncomplete(todoIndex) {
        if (this.todos[todoIndex]) {
            this.todos[todoIndex].completed = false;
            this.saveToLocalStorage();
        }
    }
    deleteTodo(todoIndex) {
        if (this.todos[todoIndex]) {
            this.todos.splice(todoIndex, 1); // Ta bort Todo från arrayen
            this.saveToLocalStorage();
        }
    }
    getTodos() {
        return this.todos;
    }
    saveToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    loadFromLocalStorage() {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            this.todos = JSON.parse(savedTodos);
            console.log('Laddade todos från LocalStorage:', this.todos);
        }
    }
}
