import {combineReducers} from 'redux'

import auth from './auth'
import posts from './profile'
export default combineReducers({posts,auth});