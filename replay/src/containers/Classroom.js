import 'styles/classroom.styl';

import React, {PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from 'react-redux';
import * as classData from '../data/class';

import LoadingPanel from '../components/LoadingPanel';
import ClassPanel from './ClassPanel';
import MediaPanel from './MediaPanel';
import MessagePanel from './MessagePanel';
import Footer from './Footer';

const Classroom = React.createClass({

    render() {
        const {status, dispatch} = this.props;

        return (
            <div>
                <ReactCSSTransitionGroup
                    transitionName="fade-out"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                {(() => {
                if (status.loading) {
                    return (
                        <LoadingPanel {...status} dispatch={dispatch} />
                    );
                }
                })()}
                </ReactCSSTransitionGroup>

                {(() => {
                if (!status.loading) {
                    return (
                        <div>
                            <ClassPanel />
                            <MediaPanel />
                            <MessagePanel />
                            <Footer />
                        </div>
                    );
                }
                })()}

            </div>
        );
    }
});

Classroom.propTypes = {
    dispatch: PropTypes.func,
    status: PropTypes.object
};

function mapStateToProps(state) {
    const {status} = state;

    return {
        status
    }
}

export default connect(mapStateToProps)(Classroom);
