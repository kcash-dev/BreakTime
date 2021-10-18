import { ADD_TASK, DELETE_TASK, DID_TASK, REMOVE_TASK, UPDATE_TASK } from "./taskTypes";
const initialState = {
    tasks: []
}
const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
        return {
            ...state,
            tasks: [...state.tasks, {
                    task: action.payload, done: false, finished: false, id: Math.random().toString(), focusTime: 0
                }
            ]
        }  
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(item => item.id != action.payload)
            }
        case DID_TASK:
            return {
                ...state,
                tasks: state.tasks.map((item) => {
                    if (item.id != action.payload) {
                        return item
                    }
                    return {
                        ...item,
                        done: true,
                        finished: true
                    }
                })
            }
        case REMOVE_TASK:
            return {
                ...state,
                tasks: state.tasks.map((item) => {
                    if (item.id != action.payload) {
                        return item;
                    }
                    return {
                        ...item,
                        done: true
                    }
                })
            }
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map((item) => {
                    if (item.id != action.payload.id) {
                        return item;
                    }
                    return {
                        ...item,
                        focusTime: action.payload.focusTime
                    }
                })
            }
        default:
            return state;
    }
}
export default taskReducer;