import {API_ERRORS} from "@/lib/errorMessage";

export const API_URL = 'http://localhost:3030/todos';

export async function fetchTodos() {
  try {
    const response = await fetch(API_URL);
    // httpレスポンスがあった場合は正常系で処理
    if (!response.ok){
      throw new Error(API_ERRORS.SERVER_ERROR(response.status));
    }
    return response.json();
  } catch (e) {
    // httpレスポンスがない場合は異常系:TypeError
    if (e.name === 'TypeError') {
      throw new Error(API_ERRORS.NETWORK_ERROR);
    }
    //その他の異常
    throw e;
  }
}

export async function creteTodo(todo) {
  try {
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
  } catch (e) {
    if (e.name === 'TyepError') {
      throw new Error('Network error: Please check your connection');
    }
    throw e;
  }
}

export async function updateTodo(id, updates) {
  try {
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
  } catch (e) {
    if (e.name === 'TypeError') {
      throw new Error('Network error: Please check your connection');
    }
  }
}

export async function deleteTodo(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
    return response.json();
  } catch (e) {
    if (e.name === 'TypeError') {
      throw new Error('Network error: Please check your connection');
    }
  }
}