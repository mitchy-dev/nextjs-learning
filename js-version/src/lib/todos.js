const API_URL = 'http://localhost:3030/todos';

export async function fetchTodos() {
  try {
    const response = await fetch(API_URL);
    // httpレスポンスがあった場合は正常系で処理
    if (!response.ok){
      throw new Error(`Server responded with status: ${response.status}`);
    }
    return response.json();
  } catch (e) {
    // httpレスポンスがない場合は異常系:TypeError
    if (e.name === 'TypeError') {
      throw new Error('Network error: Prease check your connection');
    }
    //その他の異常
    throw e;
  }
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