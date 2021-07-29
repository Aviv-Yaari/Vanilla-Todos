function onInit() {
  renderTodos();
}

function renderTodos() {
  const filterBy = document.querySelector('.btn-filter.clicked');
  const elTodoList = document.querySelector('.todo-list');
  const todos = getTodosForDisplay();
  if (!todos.length) {
    elTodoList.innerHTML = `No ${gFilterBy !== 'all' ? gFilterBy : ''} todos`;
    return;
  }

  let strHTMLs = todos.map((todo, index) => {
    const { id, importance, isDone, txt, createdAt } = todo;
    const isLast = index === todos.length - 1;
    const isFirst = index === 0;
    let importanceTag = '',
      moveUpHTML = '',
      moveDownHTML = '';

    importanceTag = `<div class="importance importance-${importance}">${importance}</div>`;
    if (!isFirst && gFilterBy === 'all')
      moveUpHTML = `<button onclick="onMove('UP',${index}, event)">🔼</button>`;
    if (!isLast && gFilterBy === 'all')
      moveDownHTML = `<button onclick="onMove('DOWN',${index}, event)">🔽</button>`;
    const btnRemoveHTML = `<button class="todo-remove" onclick="onRemoveTodo('${id}', event)">x</button>`;

    return `<li class="${isDone ? 'done' : ''}" onclick="onToggleTodo('${id}')">
            <div class="todo-details">
            ${importanceTag}
            <section class="todo-data">
            <div>${txt}</div>
            <div class="todo-date">${new Date(createdAt).toUTCString()}</div>
            </section>
            </div>
            <div class="todo-actions">
            ${moveUpHTML} ${moveDownHTML} ${btnRemoveHTML}
            </div>
        </li>`;
  });
  elTodoList.innerHTML = strHTMLs.join('');
  document.querySelector('.todo-count').innerText = getCount();
}

function onToggleTodo(todoId) {
  toggleTodo(todoId);
  renderTodos();
}

function onRemoveTodo(todoId, ev) {
  ev.stopPropagation();
  const ok = confirm('Are you sure?');
  if (ok) {
    console.log('Removing: ', todoId);
    removeTodo(todoId);
    renderTodos();
  }
}

function onAddTodo(ev) {
  ev.preventDefault();
  const txt = ev.target.newTodoTxt.value;
  const imp = ev.target.newTodoImp.value;
  if (!txt || !imp) return;
  addTodo(txt, imp);
  document.querySelector('form').reset();
  renderTodos();
}

function onSetFilter(filterBy, elBtn) {
  const elAllBtns = document.querySelectorAll('.btn-filter');
  elAllBtns.forEach((el) => el.classList.remove('clicked'));
  elBtn.classList.add('clicked');
  setFilterBy(filterBy);
  renderTodos();
}

function onSetSort(sortBy) {
  sortTodos(sortBy);
  renderTodos();
}

function onMove(direction, index, ev) {
  debugger;
  ev.stopPropagation();
  moveTask(direction, index);
  renderTodos();
}
