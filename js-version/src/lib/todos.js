const API_URL = 'http://localhost:3030/todos';

export async function fetchTodos() {
  const response = await fetch(API_URL);
  if (!response.ok){
    throw new Error('Failed to fetch todos');
  }
  return response.json();
}