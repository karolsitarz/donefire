import getLightness from '../utils/colorUtils';

export const addTodo = ({ text, value, listID }) => ({
  type: 'TODO_ADD',
  payload: { text, value, listID }
});

export const toggleTodo = (todoID, done) => ({
  type: 'TODO_TOGGLE_DONE',
  payload: { todoID, done }
});

export const switchToUI = name => ({
  type: 'UI_SWITCH',
  payload: name
  // taskinput
  // lists
  // listinput
});

export const addList = ({ name, c1, c2 }) => ({
  type: 'LIST_ADD',
  payload: { name, c1, c2, light: getLightness(c1, c2) }
});

export const currentListChange = ({ id, name, c1, c2 }) => ({
  type: 'CURRENT_LIST_CHANGE',
  payload: { id, name, c1, c2 }
});
