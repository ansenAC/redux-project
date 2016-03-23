import React from 'react';
import divide from 'cobble/function/divide';
import multiply from 'cobble/function/multiply';
import {getDisplayTime} from '../utils/player';
import Slider from 'delightui/Slider';

import {seek} from '../actions/player';

const PlayerSeekBar = React.createClass({
    onChange(seekTime) {
        const {dispatch} = this.props;
        this.dragging = false;

        dispatch(seek(seekTime));
    },

    onStartDrag() {
        this.dragging = true;
    },

    render() {
        const {duration, currentTime} = this.props;
        const {dragging} = this;

        return (
            <Slider
                className="player-seek"
                trackClassName="duration-bar"
                handleClassName="seek-handle"
                stepClassName="player-seek-bar"
                max={duration}
                value={dragging ? null : Math.max(currentTime, 0)}
                formatTooltip={getDisplayTime}
                onStartDrag={this.onStartDrag}
                onStopDrag={this.onChange}
                onClick={this.onChange}
            />
        );
    }
});

export default PlayerSeekBar;
