import React, {PropTypes} from 'react';
import {Motion, spring} from 'react-motion';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import * as docData from '../data/doc';
import * as orderData from '../data/order';
import * as classData from '../data/class';

import {completeLoading, updateLoadingPercent} from '../actions/status';
import {updateAvatar, updateSource} from '../actions/player';
import {allDataComplete} from '../actions/classroom';


const loadingTaskQueue = [
    {
        modelType: docData,
        percent: 25
    },
    {
        modelType: orderData,
        percent: 25
    },
    {
        modelType: classData,
        percent: 50
    }
];

const LoadingPanel = React.createClass({
    // Mock
    startLoading() {
        const {dispatch, percentage, loading} = this.props;

        if (percentage === 100
            && loading
        ) {
            dispatch(allDataComplete());
            return;
        }

        const task = loadingTaskQueue.pop();

        task.modelType.initData()
            .done(() => {
                dispatch(
                    updateLoadingPercent(percentage + task.percent)
                );
            })
            .fail(
                (response) => {
                    let msg = response.msg;
                    if (msg) {
                        this.setState({
                            loadWaring: msg
                        });
                    }
                }
            );
    },

    getInitialState() {
        return {
            loadWaring: ''
        }
    },


    componentDidMount() {
        this.recordPre();
        this.startLoading();
    },

    componentDidUpdate() {
        this.recordPre();
        this.startLoading();
    },

    recordPre() {
        this.prePercentage
            = this.props.percentage
    },

    render() {
        const {percentage} = this.props;
        let prePercentage = this.prePercentage;

        if (prePercentage == null) {
            prePercentage = 0;
        }

        return (
            <div id="loading" key="loading">
                <div>
                    <span className="logo"></span>
                    <Motion
                        defaultStyle={{x: prePercentage}}
                        style={{x: spring(percentage)}}
                    >
                    {interpolatedStyle => {
                        const width = Math.ceil(interpolatedStyle.x);

                        return(
                        <div className="progress">
                            <div
                                className="progress-bar"
                                style={{width: width + '%'}}
                            >
                            </div>

                            <span className="progress-text">
                                {width + '%'}
                            </span>
                        </div>
                        );
                    }}
                    </Motion>
                    {
                        (()=> {
                            if (this.state.loadWaring) {
                                return (
                                    <p className="loading-hint">
                                        {this.state.loadWaring}
                                    </p>
                                )
                            }
                        })()
                    }
                </div>
            </div>
        );
    }
});

LoadingPanel.propTypes = {
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
    percentage: PropTypes.number
};

export default LoadingPanel;
