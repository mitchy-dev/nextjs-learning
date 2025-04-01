export const API_ERRORS = {
  NETWORK_ERROR: 'Network error: Please check your connection',
  SERVER_ERROR: (status) => `Server responded with status: ${status}`,
  CREATE_FAILED: 'Failed to create todo',
  UNKNOWN_ERROR: '予期せぬエラーが発生しました',
};