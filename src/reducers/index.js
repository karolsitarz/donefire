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
  if (action.type === 'TODO_TOGGLE_DONE') {
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
  if (action.type === 'LIST_EDIT') {
    if (!action.payload) return currentData;
    const { listID, name, c1, c2, light } = action.payload;

    return {
      ...currentData,
      [listID]: { name, c1, c2, light }
    };
  }
  return currentData;
};

const currentListReducer = (currentList = { id: 0, name: 'all tasks' }, action) => {
  if (action.type === 'CURRENT_LIST_CHANGE') {
    if (!action.payload) return currentList;

    if ('id' in currentList && currentList.id === action.payload.id) {
      return { id: 0, name: 'all tasks' };
    }
    return {
      id: action.payload.id,
      name: action.payload.name,
      c1: action.payload.c1,
      c2: action.payload.c2
    };
  }
  return currentList;
};

const UIReducer = (currentUI = '', action) => {
  if (action.type === 'UI_SWITCH') {
    if (!action.payload) return currentUI;
    return currentUI === action.payload ? '' : action.payload;
  }
  return currentUI;
};

const listInputDataReducer = (currentSettings = {
  name: '',
  c1: 0.5,
  c2: 0.75,
  listID: null
}, action) => {
  if (action.type === 'LISTINPUT_DATA') {
    if (!action.payload) return currentSettings;
    return {
      name: action.payload.name != null ? action.payload.name : currentSettings.name,
      c1: action.payload.c1 != null ? action.payload.c1 : currentSettings.c1,
      c2: action.payload.c2 != null ? action.payload.c2 : currentSettings.c2,
      listID: action.payload.listID !== undefined ? action.payload.listID : currentSettings.listID
    };
  }
  return currentSettings;
};

export default combineReducers({
  todo: todoReducer,
  list: listReducer,
  currentList: currentListReducer,
  UI: UIReducer,
  listInputData: listInputDataReducer
});
