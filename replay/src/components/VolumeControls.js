import React, {PropTypes} from 'react';
import classNames from 'classnames';

import VolumeBar from './VolumeBar';
import {mute, up} from '../actions/player';

const VolumeControls = React.createClass({
    getInitialState() {
        return {
            showBar: false  
        };
    },

    mute() {
        const {dispatch} = this.props;
        dispatch(mute);
    },

    up() {
        const {dispatch, volume} = this.props;

        if (volume > 0) {
            dispatch(up);
        }
    },

    onMouseEnter() {
        const {state} = this;

        if (state.aboutToLeave) {
            state.aboutToLeave = false
        }
        else {
            this.setState({ showBar: true });
        }
    },

    onMouseLeave() {
        const {state} = this;

        if (state.aboutToLeave) {
            return;
        }

        state.aboutToLeave = true;

        setTimeout(
            () => {
                if (state.aboutToLeave) {
                    this.setState({ 
                        showBar: false,
                        aboutToLeave: false
                    });
                }
            },
            200
        );
    },

    render() {
        const {muted, volume, dispatch} = this.props;
        const {showBar} = this.state;

        const getIcon = () => {
            if (muted) {
                return (
                    <i
                        className="icon icon-volume-off"
                        onClick={this.up}
                    ></i>
                );
            }
            else {
                return (
                    <i
                        className="icon icon-volume-up"
                        onClick={this.mute}
                    ></i>
                );
            }
        };
        
        return (
            <div 
                className="volume-controls"
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                {getIcon()}
                <div 
                    className={
                        classNames(
                            'volume-bar-layer',
                            {
                                'active': showBar
                            }
                        )
                    }
                >
                    <VolumeBar
                        update={showBar}
                        volume={volume}
                        muted={muted}
                        dispatch={dispatch}
                    />
                </div>      
            </div>
        )
    }
});

VolumeControls.propTypes = {
    dispatch: PropTypes.func,
    volume: PropTypes.number,
    muted: PropTypes.bool
};

export default VolumeControls;
