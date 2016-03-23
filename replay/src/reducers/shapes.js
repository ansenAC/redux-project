import * as types from '../constants/actionTypes';
import * as config from '../constants/config';

const initialShapes = JSON.parse(
    '[{"height":"0.1963","id":"4","lineWidth":"6","name":"Rect","number":"ed2d5f2d749636a3","strokeStyle":"#ff2a1a","width":"0.1635","x":"0.4088","y":"0.4546"}]'
);

const initialState = {
    shapesType: config.SHAPES_TYPE_ALL,
    data: []
};

export default function shapes(state = initialState, action) {
    switch (action.type) {
        case types.UPDATE_SHAPES:
            return {
                ...state,
                data: action.shapes,
                shapesType: action.shapesType
            };

        default:
            return state;
    }
};
