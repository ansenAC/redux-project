import React from 'react';
import ChatItem from './ChatItem';
import Scrollable from './Scrollable';
import * as mapConfig from '../constants/mapConfig';

var  ChatPanel = React.createClass({

    componentDidMount() {
    },

    // 单条增加
    addChat(user) {
        const {actions} = this.props;
        actions.addChat(user);
    },

    // 批量增加
    addChatList(userList) {
        const {actions} = this.props;
        actions.addChatList(userList);
    },

    // 清空
    emptyChatList() {
        const {actions} = this.props;
        actions.emptyChatList();
    },

    refreshTop(top) {
        this.setState({
            top: top
        });
    },

    render() {
        const {top, chatList} = this.props.chat;

        let style = {
            top: top + 'px'
        };

        let chatArray = [];

        chatList.forEach(
            (chat, index) => {
                chat.endTypeIcon = mapConfig.END_TYPE_MAP[chat.endType];
                chat.endTypeText = mapConfig.END_TYPE_TEXT[chat.endType];

                chatArray.push(
                    <ChatItem key={index} data={chat}></ChatItem>
                );
            }
        );

        return (
            <div className="chat-panel" style={style} ref="chatPanelNode">
                <Scrollable ref="scroll">
                    <div className="message-list">
                        {chatArray}
                    </div>
                </Scrollable>
                <div className="message-reminder">
                </div>
            </div>
        );
    }
});

export default ChatPanel;
