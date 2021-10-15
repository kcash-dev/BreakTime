import { ADD_TASK, DELETE_TASK, DID_TASK } from "./taskTypes";
const initialState = {
    tasks: []
}
const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
        return {
            ...state,
            tasks: [...state.tasks, {
                    task: action.payload, done: false, id: Math.random().toString()
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
                        done: true
                    }
                })
            }
        default:
            return state;
    }
}
export default taskReducer;