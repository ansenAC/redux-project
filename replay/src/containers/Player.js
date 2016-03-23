import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import multiply from 'cobble/function/multiply';
import divide from 'cobble/function/divide';

import classNames from 'classnames';

import PlayerCard from '../components/PlayerCard';
import VideoLoading from '../components/VideoLoading';

import {syncStepData, syncSeekData} from '../actions/classroom';
import * as config from '../constants/config';
import * as styleConfig from '../constants/styleConfig';
import classData from '../data/class';
import * as playerActions from '../actions/player';


import {
    play,
    pause,
    stop,
    seek,
    muted,
    up,
    updateDuration,
    updateVolume,
    updateCurrentTime
} from '../actions/player';

const Player = React.createClass({
    mixins: [PureRenderMixin],

    getInitialState() {
        return {
            prevStatus: config.PLAYER_STATUS_PAUSE,
            popupPlayer: false,
            growing: false,
            canPlay: false,
            firstLoading: true,
            errorTimes: 0,
            style: {}
        };
    },

    componentDidMount() {
        this.onVolumeChange();
        this.syncStatus();
        this.onMouseWheel();
    },

    componentDidUpdate(prevProps, prevState) {
        const prevStatus = prevProps.status;
        const prevMuted = prevProps.muted;
        const prevVolume = prevProps.volume;
        const prevPopupPlayer = prevState.popupPlayer;
        const prevGrowing = prevState.growing;

        const {popupPlayer, growing} = this.state;

        const {status, muted, volume, videoOn} = this.props;

        if (prevStatus !== status) {
            this.syncStatus();
        }

        if (prevMuted !== muted) {
            this.syncMuteStatus();
        }

        if (prevVolume !== volume) {
            this.syncVolume();
        }

        // 如果弹出了，但是没有放大
        if (popupPlayer
            && !growing
            && !prevPopupPlayer
            && !prevGrowing
        ) {
            this.popupGrowing();
        }

        // 弹出后，老师视频关闭
        if (!videoOn && (prevPopupPlayer || popupPlayer)) {
            this.popdownPlayer();
        }

    },

    syncStatus() {
        const {status, seekTime, dispatch} = this.props;
        const {player} = this.refs;
        const {state} = this;

        switch (status) {
            case config.PLAYER_STATUS_PLAYING:
                player.play();
                state.prevStatus = status;
                break;

            case config.PLAYER_STATUS_PAUSE:
                player.pause();
                state.prevStatus = status;
                break;

            case config.PLAYER_STATUS_STOP:
                player.pause();
                state.prevStatus = config.PLAYER_STATUS_PAUSE;
                dispatch(seek(0));
                break;

            case config.PLAYER_STATUS_SEEKING:
                if (seekTime != null) {
                    player.currentTime = seekTime;
                    dispatch(syncSeekData(seekTime));
                    dispatch(updateCurrentTime(seekTime));
                }
                else {
                    this.rollBakStatus();
                }
                break;
        }
    },

    syncMuteStatus() {
        const {muted} = this.props;
        const {player} = this.refs;

        player.muted = muted;
    },

    syncVolume() {
        const {volume} = this.props;
        const {player} = this.refs;

        player.volume = divide(
            volume,
            config.MAX_VOLUME
        );
    },

    onTimeUpdate() {
        this.updateTime();
    },

    updateTime() {
        const {player} = this.refs;
        const {dispatch, currentTime, status, seekTime, duration} = this.props;
        let playerTime = player.currentTime;

        playerTime = Math.floor(playerTime);

        if (currentTime === duration) {
            dispatch(stop);

            return;
        }

        if (playerTime !== currentTime) {
            dispatch(updateCurrentTime(playerTime));
            dispatch(syncStepData(playerTime));
        }
    },

    getBoxStyle(domElement) {
        let element = $(domElement);
        return {
            height: element.height(),
            width: element.width()
        };
    },

    onMouseWheel() {
        const {wrapper} = this.refs;
        let me = this;

        let wheelToScale = function (wheelDeltaY) {
            let wheelStep = wheelDeltaY / 120;
            return wheelStep / 50;
        };

        let getWheelStyle = function (offsetRate, boxStyle) {
            const {popupHeight, popupWidth} = styleConfig;

            const maxHeight = popupHeight;
            const minHeight = popupHeight / 2;
            const maxWidth = popupWidth;
            const minWidth = popupWidth / 2;

            let targetHeight = (offsetRate * boxStyle.height).toFixed(2);
            let targetWidth = targetHeight * 4 / 3;

            if (targetHeight > maxHeight) {
                targetHeight = maxHeight;
            }
            else if (targetHeight < minHeight) {
                targetHeight = minHeight;
            }

            if (targetWidth > maxWidth) {
                targetWidth = maxWidth;
            }
            else if (targetWidth < minWidth) {
                targetWidth = minWidth;
            }

            return {
                height: targetHeight,
                width: targetWidth
            };
        };

        window.document.body.addEventListener(
            'mousewheel',
            (e) => {
                const {popupPlayer, growing} = this.state;
                const {wheelDeltaY} = e;
                let offsetRate = 1 + wheelToScale(wheelDeltaY);
                let boxStyle = me.getBoxStyle(wrapper);

                // 放大后响应鼠标滚轮事件
                if (popupPlayer && !growing) {
                    let curBoxStyle
                        = getWheelStyle(offsetRate, boxStyle);

                    $(wrapper).css({
                        height: curBoxStyle.height,
                        width: curBoxStyle.width
                    });
                }
            }
        );
    },


    onDurationChange() {
        const {player} = this.refs;
        const {dispatch} = this.props;
        let {duration} = player;

        duration = Math.floor(duration);

        dispatch(updateDuration(duration));

        if (duration > 0) {
            dispatch(seek(0));
        }
    },

    onSeeked() {
        console.log('onseek');
        this.rollBakStatus();
    },

    onSeeking() {
        console.log('onseeking');
    },

    onVolumeChange() {
        const {player} = this.refs;
        const {dispatch} = this.props;

        let volume = player.volume;
        volume = Math.ceil(multiply(volume, config.MAX_VOLUME));

        dispatch(updateVolume(volume));
    },

    rollBakStatus() {
        const {dispatch} = this.props;
        const {prevStatus} = this.state;

        switch (prevStatus) {
            case config.PLAYER_STATUS_PLAYING:
                dispatch(play);
                break;

            case config.PLAYER_STATUS_PAUSE:
                dispatch(pause);
                break;
        }
    },

    // 获取fix播放器的基本样式
    getPlayerBaseStyle() {
        const {player} = this.refs;
        let playerElement = $(player);
        let offset = playerElement.offset();

        return {
            top: offset.top,
            left: offset.left,
            height: playerElement.height(),
            width: playerElement.width()
        }
    },

    // 获取放大播放器的基本样式
    getPlayerPopupStyle() {
        let docElement = $(document);
        let docWidth = docElement.width();
        let docHeight = docElement.height();

        const {popupWidth, popupHeight} = styleConfig;

        let top = docHeight > popupHeight
            ? (docHeight - popupHeight) / 2
            : 0;
        let left = docWidth > popupWidth
            ? (docWidth - popupWidth) / 2
            : 0;

        return {
            top: top,
            left: left,
            height: popupHeight,
            width: popupWidth
        };

    },

    popupPlayer() {
        let baseStyle = this.getPlayerBaseStyle();

        this.setState({
            style: baseStyle,
            popupPlayer: true
        });
    },

    popdownPlayer() {
        const {wrapper} = this.refs;

        this.setState({
            style: {},
            popupPlayer: false
        });
    },


    popupGrowing() {
        let popupStyle = this.getPlayerPopupStyle();
        this.setState({
            style: popupStyle,
            growing: true
        });

        setTimeout(
            () => {
                this.setState({
                    growing: false
                });
            },
            310
        );
    },


    onDragStart(e) {
        const dragElement = e.currentTarget;
        const {top, left} = dragElement.style;
        const {clientX, clientY} = e;

        let state = this.state;

        state.offsetX = clientX - parseInt(left);
        state.offsetY = clientY - parseInt(top);

        window.addEventListener('mousemove', this.onDragMove);
        window.addEventListener('mouseup', this.onDragEnd);
    },

    onDragMove(e) {
        let state = this.state;
        let left = e.clientX - state.offsetX;
        let top = e.clientY - state.offsetY;

        let style = this.state.style;
        let dragStyle = this.fixPosition({
            top: top,
            left: left
        });

        this.setState({
            style: Object.assign(
                {},
                style,
                dragStyle
            )
        });
    },

    onDragEnd(e) {
        let dragElement = e.currentTarget;
        window.removeEventListener('mousemove', this.onDragMove);
        window.removeEventListener('mouseup', this.onDragMove);
    },

    fixPosition(style) {
        const {wrapper} = this.refs;
        const popupHeight = $(wrapper).height();
        const popupWidth = $(wrapper).width();

        const {top, left} = style;

        let docElement = $(document);
        let docHeight = docElement.height();
        let docWidth = docElement.width();

        let maxTop = docHeight - popupHeight > 0
            ? docHeight - popupHeight
            : 0;
        let maxLeft = docWidth - popupWidth > 0
            ? docWidth - popupWidth
            : 0;

        let fixLeft, fixTop;

        if (maxLeft === 0) {
            fixLeft = 0;
        }
        else {
            if (left < 0) {
                fixLeft = 0;
            }
            else if (0 < left && left < maxLeft) {
                fixLeft = left;
            }
            else {
                fixLeft = maxLeft
            }
        }

        if (maxTop === 0) {
            fixTop = 0;
        }
        else {
            if (top < 0) {
                fixTop = 0;
            }
            else if (0 < top && top < maxTop) {
                fixTop = top;
            }
            else {
                fixTop = maxTop;
            }
        }
        return {
            top: fixTop,
            left: fixLeft
        };
    },

    hideVideoLoading() {
        this.setState({
            canPlay: true
        });
    },

    showVideoLoading() {
        this.setState({
            canPlay: false
        });
    },

    onCanPlay() {
        const {dispatch} = this.props;
        const {player} = this.refs;
        const {errorReplay, currentTime} = this;
        this.hideVideoLoading();

        // 第一次缓冲
        if (this.state.firstLoading) {
            dispatch(playerActions.play);

            this.state.firstLoading = false;
            return;
        }

        // 中途加载报error
        if (currentTime
            && errorReplay
        ) {
            player.currentTime = this.currentTime;
            this.errorReplay = false;
        }
    },

    onWaiting() {
        this.showVideoLoading();
    },

    onPlaying() {
        this.hideVideoLoading();
    },

    onError() {
        const {player} = this.refs;
        const {errorTimes} = this.state;
        let currentTime = player.currentTime;

        console.log('video error!!!', 'currentTime:' + currentTime);

        // 已经开播
        if (currentTime && errorTimes == 0) {
            this.currentTime = currentTime;
            this.errorReplay = true;
            this.state.errorTimes = errorTimes + 1;
            player.load();
        }
    },

    render() {
        const {source, videoOn, audioOn, avatar} = this.props;
        const {canPlay} = this.state;

        return (
            <div className="user-player teacher-player">
                <PlayerCard avatar={avatar} videoOn={videoOn}/>
                <div className={classNames(
                        'player-wrapper',
                        {
                            'popup-wrapper': this.state.popupPlayer,
                            'growing': this.state.growing
                        }
                    )}
                    style={this.state.style}
                    onMouseDown={
                        this.state.popupPlayer
                        ? this.onDragStart
                        : $.noop
                    }
                    ref="wrapper"
                    >
                    <video
                        src={source}
                        ref="player"
                        onTimeUpdate={this.onTimeUpdate}
                        onDurationChange={this.onDurationChange}
                        onSeeked={this.onSeeked}
                        onSeeking={this.onSeeking}
                        onCanPlay={this.onCanPlay}
                        onWaiting={this.onWaiting}
                        onPlaying={this.onPlaying}
                        onError={this.onError}
                    >
                    </video>
                    <ul className="action-player">
                        <li className="action webcam">
                            {
                                (()=>{
                                    return videoOn
                                        ? <i className="icon icon-webcam"></i>
                                        : <i className="icon icon-no-webcam"></i>;
                                })()
                            }
                        </li>
                        <li className="action microphone">
                            {
                                (()=>{
                                    return audioOn
                                        ? <i className="icon icon-microphone"></i>
                                        : <i className="icon icon-no-microphone"></i>;
                                })()
                            }
                        </li>
                        <li className="action popup" onClick={this.popupPlayer}>
                            <i className="icon icon-popup">
                            </i>
                        </li>
                        <li className="action popdown" onClick={this.popdownPlayer}>
                            <i className="icon icon-popdown">
                            </i>
                        </li>
                    </ul>
                </div>
                {
                    (() => {
                        if (!canPlay) {
                            return(
                                <VideoLoading />
                            );
                        }
                    })()
                }

            </div>
        );
    }
});

Player.propTypes = {
    source: PropTypes.string,
    status: PropTypes.string,
    seekTime: PropTypes.number,
    muted: PropTypes.bool,
    volume: PropTypes.number,
    currentTime: PropTypes.number
};

function mapStateToProps(state) {
    const {player} = state;
    const {
        source,
        status,
        seekTime,
        muted,
        volume,
        currentTime,
        avatar,
        videoOn,
        audioOn,
        duration
    } = player;

    return {
        source,
        status,
        seekTime,
        muted,
        volume,
        currentTime,
        avatar,
        videoOn,
        audioOn,
        duration
    };
}

export default connect(mapStateToProps)(Player);
