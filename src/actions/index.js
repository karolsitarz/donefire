export const addTodo = ({ text, value, listID }) => ({
  type: 'TODO_ADD',
  payload: { text, value, listID }
});

export const toggleTodo = ({ todoID, done }) => ({
  type: 'TODO_TOGGLE_DONE',
  payload: { todoID, done }
});
