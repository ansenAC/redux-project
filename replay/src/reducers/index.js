import {combineReducers} from 'redux';
import status from './status';
import shapes from './shapes';
import chat from './chat';
import notice from './notice';
import doc from './doc';
import userList from './userList';
import player from './player';


const rootReducer = combineReducers({
    status,
    shapes,
    doc,
    chat,
    notice,
    userList,
    player
});

export default rootReducer;
