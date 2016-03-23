import React, {PropTypes} from 'react';

import * as config from '../constants/config';
import {getDisplayTime} from '../utils/player';
import {play, pause} from '../actions/player';

import PlayerSeekBar from './PlayerSeekBar';

const PlayerControls = React.createClass({
    play() {
        const {dispatch, duration} = this.props;

        if (duration === 0) {
            return;
        }

        dispatch(play);
    },

    pause() {
       const {dispatch} = this.props;

       dispatch(pause);
    },

    render() {
        const {currentTime, duration, status, dispatch} = this.props;

        return (
            <div className="player-controls">
            {(() => {
                if (status === config.PLAYER_STATUS_PLAYING) {
                    return (
                        <i 
                            className="icon icon-pause-o"
                            onClick={this.pause}
                        ></i>
                    );
                }
                else if (status === config.PLAYER_STATUS_PAUSE
                    || status === config.PLAYER_STATUS_SEEKING
                ) {
                    return (
                        <i
                            className="icon icon-play-o"
                            onClick={this.play}
                        ></i>
                    )
                }
            })()}
                <div className="current-time">
                    {getDisplayTime(currentTime)}
                </div>
                <div className="player-seek-bar-wrapper">
                    <PlayerSeekBar
                        currentTime={currentTime}
                        duration={duration}
                        dispatch={dispatch}
                    />
                </div>
                <div className="duration">
                    {getDisplayTime(duration)}
                </div>
            </div>
        );
    }
});

PlayerControls.propTypes = {
    dispatch: PropTypes.func,
    currentTime: PropTypes.number,
    duration: PropTypes.number,
    status: PropTypes.string
};

export default PlayerControls;
