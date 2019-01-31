import { combineReducers } from 'redux';
import randomize from 'randomatic';

const getID = () => new Date() * 1 + '' + randomize('Aa0', 8);

const todoReducer = (currentTodos = {}, action) => {
  console.log(currentTodos, !!action.payload, action.payload);
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
  /*
    id - auto
    tekst
    wartosc
    lista
  */
  return currentTodos;
};

const listReducer = (currentData = {}, action) => {
  /*
    id - auto
    nazwa
    kolory
  */
  return currentData;
};

const currentList = (currentList = null, action) => {
  return currentList;
};

const UI = (currentUI = { lists: false }, action) => {
  if (action.type === 'LISTS_TOGGLE') {
    return {
      ...currentUI,
      lists: !currentUI.lists
    };
  }
  return currentUI;
};

export default combineReducers({
  todo: todoReducer,
  list: listReducer,
  currentList,
  UI
});
