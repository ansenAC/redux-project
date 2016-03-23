import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Painter from 'painter/Main';
import {unserializeShape} from '../utils/shape';
import * as config from '../constants/config';

const WhiteboardCanvas = React.createClass({
    mixins: [PureRenderMixin],

    componentDidMount() {
        const canvas = this.refs.canvas;
        const context = canvas.getContext('2d');

        this.painter
        = new Painter({
            context: context,
            stage: function (context) {
                context.lineCap = 'round';
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
        });

        this.updateShapes();
    },

    componentDidUpdate(prevProps, prevState) {
        const {width, height, shapes, page, docId} = this.props;
        const {prevWidth, prevHeight, prevShapes, prevPage, prevDocId} = prevProps;

        if (prevProps.height !== height
            || prevProps.width !== width
        ) {
            this.resize(width, height);
        }

        if (prevProps.page !== page
            || prevProps.docId !== docId
        ) {
            this.clear();
        }

        if (prevProps.shapes !== shapes) {
            this.updateShapes();
        }
    },

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.forceUpdate();
        }
    },

    updateShapes() {
        const canvas = this.refs.canvas;
        const {shapes} = this.props;
        const {data, shapesType} = shapes;

        if (shapesType === config.SHAPES_TYPE_ALL) {
            this.clear();
        }

        data.forEach(shape => {
            const {messageType, shapeId, shapeList} = shape;

            switch (messageType) {
                case config.MESSAGE_TYPE_SHAPE_ADD:
                    this.painter.addShape(
                        unserializeShape(
                            shape,
                            canvas
                        )
                    );
                    break;

                case config.MESSAGE_TYPE_SHAPE_DEL:
                    if (shapeId === '') {
                        this.clear();
                    }
                    else {
                        shapeId
                            .split(',')
                            .forEach(id => {
                                if (id) {
                                    this.painter.removeShape(id);
                                }
                            });
                    }
                    break;

                case config.MESSAGE_TYPE_SHAPE_UPDATE:
                    shapeList.forEach(shapeForUpdate => {
                        this.painter.updateShape(
                            unserializeShape(
                                shapeForUpdate,
                                canvas
                            )
                        );
                    });
                    break;
            }
        })

    },

    resize(width, height) {
        this.painter.resize(width, height);
    },

    clear() {
        this.painter.clear();
    },

    render() {
        const {currentTime, shapes} = this.props;
        if (currentTime === 28) {console.log('render: ', shapes)}
        return (
            <canvas
                ref="canvas"
            >
            </canvas>
        )
    }
});

WhiteboardCanvas.propTypes = {
    shapes: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    page: PropTypes.number,
    docId: PropTypes.string
};

function mapStateToProps(state) {
    const {shapes, doc, player} = state;
    const {width, height, page, docId} = doc;

    return {
        shapes,
        width,
        height,
        page,
        docId,
        currentTime: player.currentTime
    };
}

export default connect(mapStateToProps)(WhiteboardCanvas);
