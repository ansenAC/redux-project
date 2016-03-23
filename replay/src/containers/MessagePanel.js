import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import NoticePanel from '../components/NoticePanel';
import ChatPanel from '../components/ChatPanel';
import InputPanel from '../components/InputPanel';

import * as messageActions from '../actions/message';
import * as statusActions from '../actions/status';
import * as config from '../constants/config';


const MessagePanel = React.createClass({

    scrollNotice(height, duration) {
        const {noticePanel, chatPanel} = this.refs;
        const {scrollPanel} = noticePanel.refs.scroll.refs;
        const {chatPanelNode} = chatPanel.refs;

        let chatTop = height + 35;

        $(scrollPanel).css({
            height: height
        });

        $(chatPanelNode).css({
            top: chatTop
        });

        setTimeout(
            function () {
                noticePanel.refreshHeight(height);
                chatPanel.refreshTop(chatTop);
            },
            duration + config.ANIMATE_STYLE_DURATION_OFFSET
        );
    },

    toggleFold() {
        const {statusActions, messagePanelFold} = this.props;
        statusActions.updateMessagePanelFold(!messagePanelFold);
    },

    render() {

        const {chat, status, messagePanelFold} = this.props;
        const {notice} = this.props.notice;
        const {messageActions} = this.props;

        return (
            <div className={classNames(
                    'message-panel',
                    {
                        fold: messagePanelFold,
                        unfold: !messagePanelFold
                    }
                )}>
                <div className="panel-wrapper">
                    <div className="body">
                        <NoticePanel notice={notice} actions={messageActions}
                         ref="noticePanel" scrollNotice={this.scrollNotice}/>
                        <ChatPanel chat={chat} actions={messageActions} ref="chatPanel" />
                        <InputPanel />
                    </div>
                    <h2>
                        文字讨论区
                    </h2>
                    <div className={classNames(
                            'btn-toggle',
                            {
                                pull: messagePanelFold,
                                push: !messagePanelFold
                            }
                            )}
                            onClick={this.toggleFold}
                    >
                        <i className="icon icon-caret-left"></i>
                        <i className="icon icon-caret-right"></i>
                    </div>
                </div>
            </div>
        );
    }
});

function mapStateToProps(state) {
    const {chat, notice, status} = state;
    const {messagePanelFold} = status;
    return {
        chat,
        notice,
        status,
        messagePanelFold
    }
}

function mapDispatchToProps(dispatch) {
    return {
        messageActions: bindActionCreators(messageActions, dispatch),
        statusActions: bindActionCreators(statusActions, dispatch)
    }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagePanel);

