import { ADD_TASK, DELETE_TASK, DID_TASK, REMOVE_TASK } from "./taskTypes"
export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task
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