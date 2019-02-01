import { combineReducers } from 'redux';
import randomize from 'randomatic';

const getID = () => new Date() * 1 + '' + randomize('Aa0', 8);

const todoReducer = (currentTodos = {}, action) => {
  if (action.type === 'TODO_ADD') {
    if (!action.payload) return currentTodos;
    const { text, listID, value } = action.payload;
    const todoID = getID();

    return {
      ...currentTodos,
      [todoID]: {
        text,
        value,
        listID,
        done: false
      }
    };
  }
  if (action.type === 'TODO_DONE_TOGGLE') {
    if (!action.payload) return currentTodos;
    const { todoID, done } = action.payload;

    return {
      ...currentTodos,
      [todoID]: {
        ...currentTodos[todoID],
        done: done || !currentTodos[todoID].done
      }
    };
  }
  return currentTodos;
};

const listReducer = (currentData = {}, action) => {
  if (action.type === 'LIST_ADD') {
    if (!action.payload) return currentData;
    const { name, c1, c2, light } = action.payload;
    const listID = getID();

    return {
      ...currentData,
      [listID]: { name, c1, c2, light }
    };
  }
  return currentData;
};

const currentList = (currentList = {}, action) => {
  if (action.type === 'CURRENT_LIST_CHANGE') {
    if (!action.payload) return currentList;

    if ('id' in currentList && currentList.id === action.payload.id) return {};
    return {
      id: action.payload.id,
      name: action.payload.name,
      c1: action.payload.c1,
      c2: action.payload.c2
    };
  }
  return currentList;
};

const UI = (currentUI = '', action) => {
  if (action.type === 'UI_SWITCH') {
    if (!action.payload) return currentUI;
    return currentUI === action.payload ? '' : action.payload;
  }
  return currentUI;
};

export default combineReducers({
  todo: todoReducer,
  list: listReducer,
  currentList,
  UI
});
