import React, {PropTypes} from 'react';
import divide from 'cobble/function/divide';
import multiply from 'cobble/function/multiply';

import * as config from '../constants/config';
import {updateVolume, mute, up} from '../actions/player';

const VolumeBar = React.createClass({
    getInitialState() {
        return {
            bottom: 0,
            draggingBottom: 0,
            dragging: false,
            height: 0,
            barOffset: null
        };
    },

    componentWillUpdate(nextProps, nextState) {
        const {bar} = this.refs;

        if (nextProps.update
            && !this.props.update
        ) {
            this.state.height = $(bar).innerHeight();
            this.state.barOffset = $(bar).offset();
        }
    },

    getOffset() {
        const {volume, muted} = this.props;
        const {height, dragging, draggingBottom} = this.state;

        if (dragging) {
            return draggingBottom;
        }

        const ratio = divide(
            volume,
            config.MAX_VOLUME
        );

        const offset 
        = muted ? 0 : Math.ceil(multiply(height, ratio));

        this.state.bottom = offset;

        return offset;
    },

    startDragging() {
        const state = this.state;
        const {bottom} = state;
        const {handle} = this.refs;

        state.dragging = true;
        state.draggingBottom = bottom;

        document.onselectstart = () => false;

        $(document.body)
            .on(
                'mousemove',
                (e) => {
                    this.onDrag(e)
                }                
            )
            .one(
                'mouseup',
                () => {
                    this.stopDragging();
                }
            );
    },

    onDrag(e) {
        const {barOffset, height, draggingBottom} = this.state;
        const {dispatch} = this.props;
        const {clientY} = e;
        const bottom = height - (clientY - barOffset.top);

        if (bottom < 0 || bottom > height) {
            return;
        }

        const ratio
        = divide(bottom, height);

        const volume
        = Math.ceil(multiply(config.MAX_VOLUME, ratio));

        dispatch(updateVolume(volume));

        this.setState({
            draggingBottom: bottom
        });

        if (volume === 0) {
            dispatch(mute);
        }
        else {
            dispatch(up);
        }
    },

    stopDragging() {
        $(document.body).off('mousemove');
        document.onselectstart = null;
        this.state.dragging = false;
    },

    render() {
        const {update} = this.props;

        return (
            <div className="volume-bar" ref="bar">
                <div 
                    className="duration-bar"
                    style={{
                        height: this.getOffset()
                    }}
                >
                </div>
                <div 
                    className="volume-handle"
                    style={{
                        bottom: this.getOffset()
                    }}
                    ref="handle"
                    onMouseDown={this.startDragging}
                >
                </div>
            </div>
        );
    }
});

VolumeBar.propTypes = {
    dispatch: PropTypes.func,
    volume: PropTypes.number,
    muted: PropTypes.bool,
    update: PropTypes.bool
};

export default VolumeBar;
