let gTodos = [];
let gFilterBy = 'all';

_createTodos();

function sortTodos(sortBy) {
  if (sortBy !== 'none') {
    gTodos.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1));
  }
}

function getTodosForDisplay() {
  const todos = gTodos.filter(function (todo) {
    if (gFilterBy === 'active') return !todo.isDone;
    else if (gFilterBy === 'done') return todo.isDone;
    else if (gFilterBy === 'all') return todo;
  });

  return todos;
}

function removeTodo(todoId) {
  var idx = gTodos.findIndex(function (todo) {
    return todo.id === todoId;
  });
  gTodos.splice(idx, 1);
  _saveTodosToStorage();
}

function addTodo(txt, importance = 5, createdAt = Date.now()) {
  var todo = {
    id: _makeId(),
    txt: txt.charAt(0).toUpperCase() + txt.slice(1),
    isDone: false,
    createdAt,
    importance,
  };
  gTodos.unshift(todo);
  _saveTodosToStorage();
}

function toggleTodo(todoId) {
  var todo = gTodos.find(function (todo) {
    return todo.id === todoId;
  });
  todo.isDone = !todo.isDone;
  _saveTodosToStorage();
}

function setFilterBy(filterBy) {
  gFilterBy = filterBy;
}

function _saveTodosToStorage() {
  saveToStorage('todoDB', gTodos);
}

function getCount() {
  // return the number of tasks according to the current filter
  return getTodosForDisplay().length;
}

function _createTodos() {
  var todos = loadFromStorage('todoDB');
  if (todos && todos.length) {
    gTodos = todos;
  } else {
    addTodo('Play guitar', 4, Date.now() - 987987987);
    addTodo('Buy groceries', 3, Date.now() - 900000);
    addTodo('Eat cake', 1, Date.now() - 600000);
    addTodo('Walk the dog', 5, Date.now() - 70000000);
    addTodo('Make memes', 2, Date.now() - 500000000);
  }
}

function _makeId(length = 5) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function moveTask(direction, index) {
  console.log('move task', index, direction);
  const target = direction === 'UP' ? index - 1 : index + 1;
  const temp = gTodos[target];
  gTodos[target] = gTodos[index];
  gTodos[index] = temp;
}
