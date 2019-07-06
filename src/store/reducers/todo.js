import { createAction, handleActions } from "redux-actions"
import { fromJS, Map } from "immutable"
import { pender } from "redux-pender"

let nextId = 3

// action types
const ADD_TODO = "todo/ADD_TODO"
const TOGGLE_TODO = "todo/TOGGLE_TODO"

const SHOW_TEXT = "todo/SHOW_TEXT"
const HIDE_TEXT = "todo/HIDE_TEXT"

//action creators
export const addTodo = createAction(
	ADD_TODO,
	(text) => {
		return {
			id: nextId++,
			text,
			completed: false,
		}
	})

export const toggleTodo = createAction(
	TOGGLE_TODO,
	x => x,
)

export const showText = createAction(SHOW_TEXT)
export const hideText = createAction(HIDE_TEXT)

// initial state
const initialState = Map({
	todos: fromJS(
		[{
			id: 0,
			text: 'First todo',
			completed: false,
		},
			{
				id: 1,
				text: 'Second todo',
				completed: false,
			},
			{
				id: 2,
				text: 'Third todo',
				completed: false,
			}],
	),
	showText: false
})

// reducer
export default handleActions({
	[ADD_TODO]: (state, action) => {
		const todo = action.payload
		return state.update("todos", todos => todos.push(fromJS(todo)))

		//return {
		//	...state,
		//	todos: [
		//		...state.todos,
		//		todo,
		//	],
		//}
	},
	[TOGGLE_TODO]: (state, action) => {
		const id = action.payload
		const index = state.get("todos").findIndex(todo => todo.get("id") === id)
		if (index !== -1) {
			return state.updateIn(["todos", index], todo => todo.set("completed", !todo.get("completed")))
		}
		return state

		//return {
		//	...state,
		//	todos: state.todos.map(todo => ({
		//		...todo,
		//		completed: todo.id === id ? !todo.completed : todo.completed,
		//	})),
		//}
	},
	[SHOW_TEXT]: (state, action) => {
		return state.set("showText", true)
	},
	[HIDE_TEXT]: (state, action) => {
		return state.set("showText", false)
	}
}, initialState)