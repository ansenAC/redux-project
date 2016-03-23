import React from 'react';
import classNames from 'classnames';
import * as parser from '../utils/parser';
import compressImage from '../utils/compressImage';

var  ChatItem = React.createClass({

    render() {
        const {data} = this.props;
        const {endTypeIcon, endTypeText} = data;
        const avatarUrl = compressImage({
            url: data.avatar,
            height: 36,
            width: 36
        });
        let content;

        content = parser.encodeHTML(data.content);
        content = parser.parseBreakline(content);
        content = parser.parseWhitespace(content);
        content = parser.parseLink(content);
        content = parser.parseEmotion(content);



        return (
            <div className="message-item self" data-role="student" data-id="68666" data-number="1212312312">
                <div className="time">
                    {data.time}
                </div>
                <img className="avatar" src={avatarUrl} />
                <div className="header">
                    <span className="name">
                        {data.name}
                    </span>
                    <i className={classNames(
                        'icon',
                        'icon-' + endTypeIcon,
                        'icon-end-type'
                    )}
                    data-title={endTypeText}>
                    </i>
                </div>
                <div className="content" dangerouslySetInnerHTML={{__html: content}}>
                </div>
            </div>
        );
    }
});

export default ChatItem;
