import { TodoList } from './todolist.js';
// Skapa instans av TodoList
const todoList = new TodoList();
// Lägg till ny Todo
document.getElementById('todoForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const priorityInput = document.getElementById('priorityInput');
    const task = taskInput.value;
    const priority = parseInt(priorityInput.value);
    if (todoList.addTodo(task, priority)) {
        taskInput.value = ''; // Töm input-fältet efter att en todo har lagts till
        updateTodoList(); // Uppdatera listan
    }
    else {
        alert('Felaktiga inmatade värden.');
    }
});
function updateTodoList() {
    const todoListElement = document.getElementById('todoList');
    todoListElement.innerHTML = ''; // Töm listan innan vi renderar den på nytt
    todoList.getTodos().forEach((todo, index) => {
        const todoElement = document.createElement('li');
        todoElement.className = todo.completed ? 'completed' : ''; // Lägg till 'completed' om todo är klar
        todoElement.innerHTML = `
      ${todo.task} - Prioritet: ${todo.priority}
      <button class="mark-completed" data-index="${index}">${todo.completed ? 'Avmarkera som klar' : 'Markera som klar'}</button>
      ${todo.completed ? `<button class="delete-todo" data-index="${index}">Ta bort uppgiften</button>` : ''}
    `;
        todoListElement.appendChild(todoElement);
    });
    // Lägg till eventlyssnare för knapparna som markerar uppgifter som klara
    const markCompletedButtons = document.querySelectorAll('.mark-completed');
    markCompletedButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            if (index !== null) {
                const todoIndex = parseInt(index);
                const todo = todoList.getTodos()[todoIndex];
                // Toggle mellan markera som klar och avmarkera som klar
                if (todo.completed) {
                    todoList.markTodoIncomplete(todoIndex); // Avmarkera uppgiften
                    event.target.innerText = 'Markera som klar'; // Uppdatera texten på knappen
                }
                else {
                    todoList.markTodoCompleted(todoIndex); // Markera uppgiften som klar
                    event.target.innerText = 'Avmarkera som klar'; // Uppdatera texten på knappen
                }
                updateTodoList(); // Uppdatera listan efter ändringen
            }
        });
    });
    // Lägg till eventlyssnare för "Ta bort uppgiften"-knappen
    const deleteButtons = document.querySelectorAll('.delete-todo');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            if (index !== null) {
                todoList.deleteTodo(parseInt(index)); // Ta bort uppgiften
                updateTodoList(); // Uppdatera listan efter att en uppgift tagits bort
            }
        });
    });
}
// Initial uppdatering av Todo-lista
updateTodoList();
