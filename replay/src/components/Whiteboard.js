import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';
import debounce from 'cobble/function/debounce';

import Doc from './Doc';
import WhiteboardCanvas from '../containers/WhiteboardCanvas';
import Scrollable from './Scrollable';

import {updateDocImage} from '../actions/doc';

const Whiteboard = React.createClass({
    mixins: [PureRenderMixin],

    componentDidMount() {
        const me = this;
        const {whiteboard} = this.refs;
        const whiteboardElement = $(whiteboard);

        this.state.containerHeight = whiteboardElement.innerHeight();
        this.updateImage();

        $(window).resize(
            debounce(
                () => {
                    me.setState({
                        containerHeight: whiteboardElement.innerHeight()
                    });

                    this.updateImage();
                },
                200
            )
        );
    },

    getInitialState() {
        return {
            needRefreshScrollbar: true,
            containerHeight: 0
        };
    },

    updateImage() {
        const {whiteboard} = this.refs;
        const {dispatch, rawUrl} = this.props;

        dispatch(updateDocImage(
            $(whiteboard).innerWidth(),
            rawUrl
        ));
    },

    getFamilyStyle() {
        const {containerHeight} = this.state;
        const {height} = this.props;

        if (height < containerHeight) {
            return {
                top: '50%',
                marginTop: -(height / 2)
            };
        }
    },

    render() {
        const {dispatch, url, retinaUrl, loading, height} = this.props;

        return (
            <div className="whiteboard" ref="whiteboard">
                <Scrollable>
                    <div className="container">
                        <div 
                            className="family"
                            style={this.getFamilyStyle()}
                        >
                            <div 
                                className="doc-image active"
                            >
                                <Doc 
                                    dispatch={dispatch} 
                                    url={url} 
                                    retinaUrl={retinaUrl} 
                                />
                            </div>
                            <WhiteboardCanvas />
                        </div>
                    </div>
                </Scrollable>

                <div 
                    className={classNames(
                        'loading-panel',
                        { 'active': loading }
                    )}
                >
                    <div className="loading-spinner spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                </div>

            </div>
        );
    }
});

Whiteboard.propTypes = {
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

export default Whiteboard;
