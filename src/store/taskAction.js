import { ADD_TOKEN, DELETE_TASK, DID_TASK, LOG_OUT, REMOVE_TASK, UPDATE_TASK } from "./taskTypes"
export const addToken = (token) => ({
    type: ADD_TOKEN,
    payload: token
})
export const deleteTask = (id) => ({
    type: DELETE_TASK,
    payload: id
})
export const didTask = (id) => ({
    type: DID_TASK,
    payload: id
})
export const removeTask = (id) => ({
    type: REMOVE_TASK,
    payload: id
})
export const updateTask = (payload) => ({
    type: UPDATE_TASK,
    payload: payload
})

export const logout = () => ({
    type: LOG_OUT
})