import { combineReducers } from 'redux'
import artistReducer from "./artistReducer";

export default combineReducers({
    profile: artistReducer
})

// export default Reducer;