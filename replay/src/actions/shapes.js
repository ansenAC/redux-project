import * as types from '../constants/actionTypes';
import * as config from '../constants/config';
import {inflatePoints} from '../utils/shape';

export function updateShapes(shapes, shapesType) {
    return {
        type: types.UPDATE_SHAPES,
        shapes,
        shapesType
    };
};

export function syncStepShapes(orderList = [], docId, page) {

    return (dispatch, getState) => {
        const shapeOrderList
        = orderList
            .filter(
                order => {
                    const matchType
                    = order.messageType === config.MESSAGE_TYPE_SHAPE_ADD
                        || order.messageType === config.MESSAGE_TYPE_SHAPE_DEL
                        || order.messageType === config.MESSAGE_TYPE_SHAPE_UPDATE;

                    const matchDocId
                    = docId == null
                    ? true : order.docId === docId;

                    const matchPage
                    = page == null
                    ? true : order.page === page;

                    return matchType && matchDocId && matchPage;
                }
            );
        if (shapeOrderList.length > 0) {
            const shapes = [];

            shapeOrderList.forEach(order => {
                const {messageType, shapeId, shape, shapeList} = order;

                switch (messageType) {
                    case config.MESSAGE_TYPE_SHAPE_ADD:
                        shapes.push({
                            ...shape,
                            messageType,
                            points: inflatePoints(shape)
                        });

                        break;

                    case config.MESSAGE_TYPE_SHAPE_DEL:
                        shapes.push({
                            messageType,
                            shapeId
                        })
                        break;

                    case config.MESSAGE_TYPE_SHAPE_UPDATE:
                        shapes.push({
                            messageType,
                            shapeList: shapeList.map(shape => {
                                return {
                                    ...shape,
                                    points: inflatePoints(shape)
                                }
                            })
                        });

                        break;
                }
            });

            dispatch(updateShapes(shapes, config.SHAPES_TYPE_STEP));
        }
    };
};

export function syncSeekShapes(shapeOrderList = []) {
    return dispatch => {
        let shapes = [];
        let id = 0;

        shapeOrderList.forEach(order => {
            let {messageType, shape, shapeId, shapeList} = order;

            switch (messageType) {
                case config.MESSAGE_TYPE_SHAPE_ADD:
                    shapes.push({
                        id: id,
                        ...shape
                    });
                    id++;
                    break;

                case config.MESSAGE_TYPE_SHAPE_DEL:
                    // 本页全部删除信令， shapeId = ''
                    if (shapeId) {
                        const indexToDel
                            = shapes.findIndex(shape => shape.id === shapeId);
                        if (indexToDel !== -1) {
                            shapes.splice(indexToDel, 1);
                        }
                    }
                    else {
                        shapes = [];
                    }

                    break;

                case config.MESSAGE_TYPE_SHAPE_UPDATE:
                    shapeList.forEach(shape => {
                        const {id} = shape;

                        const indexToUpdate
                        = shapes.findIndex(shape => shape.id === id);

                        if (indexToUpdate !== -1) {
                            shapes[indexToUpdate] = {...shape};
                        }
                    });
                    break;
            }
        });

        shapes = shapes.map(shape => {
            return {
                messageType: config.MESSAGE_TYPE_SHAPE_ADD,
                ...shape,
                points: inflatePoints(shape)
            };
        });

        dispatch(updateShapes(shapes, config.SHAPES_TYPE_ALL));
    };
};
