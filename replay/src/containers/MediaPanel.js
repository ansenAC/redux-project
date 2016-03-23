import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import UserTab from './UserTab';
import Player from './Player';
import {updateMediaPanelFold} from '../actions/status';
import * as config from '../constants/config';

const initialRight = 280;

const MediaPanel = React.createClass({
    getRight() {
        const {mediaPanelFold, messagePanelFold} = this.props;

        let right = initialRight;

        if (mediaPanelFold) {
            right -= (config.MEDIA_PANEL_UNFOLD_WIDTH
                - config.MEDIA_PANEL_FOLD_WIDTH);
        }

        if (messagePanelFold) {
            right -= (config.MESSAGE_PANEL_UNFOLD_WIDTH
                - config.MESSAGE_PANEL_FOLD_WIDTH);
        }

        return right;
    },

    toggleFold() {
        const {mediaPanelFold, dispatch} = this.props;

        dispatch(updateMediaPanelFold(!mediaPanelFold));
    },

    render() {
        const {player, mediaPanelFold, dispatch} = this.props;

        return (
            <div
                className={classNames(
                    'media-panel',
                    { 'fold': mediaPanelFold }
                )}
                style={{ right: this.getRight() }}
            >
                <div className="panel-wrapper">
                    <div className="body">
                        <Player />
                        <UserTab />
                    </div>
                    <h2>视频与发言</h2>
                    <div
                        className={classNames(
                            'btn-toggle',
                            {
                                'push': !mediaPanelFold,
                                'pull': mediaPanelFold
                            }
                        )}
                        onClick={this.toggleFold}
                    >
                        <i className="icon icon-caret-left"></i>
                        <i className="icon icon-caret-right"></i>
                    </div>
                </div>
            </div>
        )
    }
});

function mapStateToProps(state) {
    const {player, status} = state;
    const {mediaPanelFold, messagePanelFold} = status;

    return {
        player,
        mediaPanelFold,
        messagePanelFold
    };
}

export default connect(mapStateToProps)(MediaPanel);
