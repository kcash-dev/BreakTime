import { ADD_TOKEN, DELETE_TASK, DID_TASK, LOG_OUT, REMOVE_TASK, UPDATE_TASK } from "./taskTypes";
const initialState = {
    tasks: []
}
const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOKEN:
        return {
            ...state,
            token: action.payload
        }  
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(item => item != action.payload)
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
                        focusTime: action.payload.totalFocusTime
                    }
                })
            }
        case LOG_OUT:
            return {
                tasks: initialState
            }
        default:
            return state;
    }
}
export default taskReducer;