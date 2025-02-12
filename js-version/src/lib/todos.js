const API_URL = 'http://localhost:3030/todos';

export async function fetchTodos() {
  const response = await fetch(API_URL);
  if (!response.ok){
    throw new Error('Failed to fetch todos');
  }
  return response.json();
}

export async function creteTodo(todo) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error('Failed to create todo')
  }
  return response.json();
}

export async function updateTodo(id, updates) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
  return response.json();
}

export async function deleteTodo(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
  return response.json();
}