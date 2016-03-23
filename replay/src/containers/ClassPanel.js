import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import * as config from '../constants/config';
import Whiteboard from '../components/Whiteboard';
import transitionDuration from '../utils/transitionDuration';

const initialRight = 557;

const ClassPanel = React.createClass({
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

    componentDidUpdate(prevProps, prevState) {
        const {mediaPanelFold, messagePanelFold} = this.props;
        const {whiteboard, classPanel} = this.refs;

        if (prevProps.mediaPanelFold !== mediaPanelFold
            || prevProps.messagePanelFold !== messagePanelFold
        ) {
            setTimeout(
                () => {
                    whiteboard.updateImage();
                },
                transitionDuration($(classPanel))
            );
        }
    },

    render() {
        return (
            <div
                id="class-panel"
                style={{ right: this.getRight() }}
                ref="classPanel"
            >
                <Whiteboard {...this.props} ref="whiteboard"/>
            </div>
        );
    }
});

ClassPanel.propTypes = {
    dispatch: PropTypes.func,
    mediaPanelFold: PropTypes.bool,
    messagePanelFold: PropTypes.bool,
    page: PropTypes.number,
    docId: PropTypes.string,
    rawUrl: PropTypes.string,
    url: PropTypes.string,
    retinaUrl: PropTypes.string,
    loading: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number
};

function mapStateToProps(state) {
    const {doc, status} = state;
    const {mediaPanelFold, messagePanelFold} = status;

    return {
        ...doc,
        mediaPanelFold,
        messagePanelFold
    };
}

export default connect(mapStateToProps)(ClassPanel);
