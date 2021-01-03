const redux = require('redux');

const createStore = redux.createStore;

const ADD_TODO = 'ADD_TODO';
const EDIT_TODO = 'EDIT_TODO';
const DELETE_TODO = 'DELETE_TODO';

function addTodo(todo) {
    return {
        type: ADD_TODO,
        payload: todo
    }
}

function editTodo(id) {
    return {
        type: EDIT_TODO,
        payload: id
    }
}

function removeTodo(id) {
    return {
        type: DELETE_TODO,
        payload: id
    }
}


const initialState = {
    todos: [],
    counter:0
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload],
                counter : state.counter + 1
            }
        case EDIT_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => (todo.id === action.payload)
                    ? { ...todo, title: 'todo cambiado', status: 'completed' }
                    : todo)
            }
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload)
            }
        default: return state
    }
}

const store = createStore(rootReducer);

store.subscribe(() => {
    console.log('state: ', store.getState());
});

console.log('se agrego 1');
store.dispatch(addTodo({ id: 1, title: 'comprar pan', status:'pending' }))
console.log('se agrego 2');
store.dispatch(addTodo({ id: 2, title: 'Correr', status:'pending' }))
console.log('se agrego 3');
store.dispatch(addTodo({ id: 3, title: 'caminar', status:'pending' }))

console.log('se edito el 2');
store.dispatch(editTodo(2));

console.log('se elimino el  1');
store.dispatch(removeTodo(1));

console.log(store.getState());

