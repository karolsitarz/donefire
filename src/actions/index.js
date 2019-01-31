export const addTodo = ({ text, value, listID }) => ({
  type: 'TODO_ADD',
  payload: { text, value, listID }
});
