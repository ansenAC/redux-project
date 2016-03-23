import React from 'react';
import {connect} from 'react-redux';

import PlayerControls from '../components/PlayerControls';
import VolumeControls from '../components/VolumeControls';

const Footer = React.createClass({
    render() {
        const {player, dispatch} = this.props;
        const {
            currentTime, 
            duration, 
            status,
            volume,
            muted
        } = player;

        return (
            <div id="footer">
                <a
                    href="http://www.genshuixue.com"
                    className="icon icon-logo"
                    ondragstart="return false"
                >
                </a>
                <VolumeControls 
                    dispatch={dispatch}
                    volume={volume}
                    muted={muted}
                />
                <PlayerControls
                    dispatch={dispatch}
                    currentTime={currentTime}
                    duration={duration}
                    status={status}
                />
            </div>
        )
    }
});

function mapStateToProps(state) {
    const {player} = state;

    return {
        player
    };
}

export default connect(mapStateToProps)(Footer);