import { TodoList } from './todolist.js';

// Skapa instans av TodoList
const todoList = new TodoList();

// Lägg till ny Todo
document.getElementById('todoForm')!.addEventListener('submit', function (event: Event) {
  event.preventDefault();

  const taskInput = document.getElementById('taskInput') as HTMLInputElement;
  const priorityInput = document.getElementById('priorityInput') as HTMLSelectElement;

  const task = taskInput.value;
  const priority = parseInt(priorityInput.value);

  if (todoList.addTodo(task, priority)) {
    taskInput.value = ''; // Töm input-fältet efter att en todo har lagts till
    updateTodoList(); // Uppdatera listan
  } else {
    alert('Felaktiga inmatade värden.');
  }
});

function updateTodoList(): void {
  const todoListElement = document.getElementById('todoList')!;
  todoListElement.innerHTML = ''; // Töm listan innan vi renderar den på nytt
  
  todoList.getTodos().forEach((todo, index) => {
    const todoElement = document.createElement('li');
    todoElement.className = todo.completed ? 'completed' : ''; // Lägg till 'completed' om todo är klar
    todoElement.innerHTML = `
      ${todo.task} - Prioritet: ${todo.priority}
      <button class="mark-completed" data-index="${index}">Markera som klar</button>
      ${todo.completed ? `<button class="delete-todo" data-index="${index}">Ta bort uppgiften</button>` : ''}
    `;
    todoListElement.appendChild(todoElement);
  });

  // Lägg till eventlyssnare för knapparna som markerar uppgifter som klara
  const markCompletedButtons = document.querySelectorAll('.mark-completed');
  markCompletedButtons.forEach(button => {
    button.addEventListener('click', (event: Event) => {
      const index = (event.target as HTMLButtonElement).getAttribute('data-index');
      if (index !== null) {
        todoList.markTodoCompleted(parseInt(index)); // Markera uppgift som klar
        updateTodoList(); // Uppdatera listan efter att en uppgift markerats som klar
      }
    });
  });

  // Lägg till eventlyssnare för "Ta bort uppgiften"-knappen
  const deleteButtons = document.querySelectorAll('.delete-todo');
  deleteButtons.forEach(button => {
    button.addEventListener('click', (event: Event) => {
      const index = (event.target as HTMLButtonElement).getAttribute('data-index');
      if (index !== null) {
        todoList.deleteTodo(parseInt(index)); // Ta bort uppgiften
        updateTodoList(); // Uppdatera listan efter att en uppgift tagits bort
      }
    });
  });
}

// Initial uppdatering av Todo-lista
updateTodoList();
