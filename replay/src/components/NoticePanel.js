import React from 'react';
import ReactDOM  from 'react-dom';

import Scrollable from './Scrollable';

const minHeight = 16;
const maxHeight = 64;

var NoticePanel = React.createClass({


    getInitialState() {
        return {
            height: '16px'
        }
    },

    componentDidMount() {
        this.updateContent();
    },

    componentDidUpdate() {
        this.computeHeight();
    },


    updateContent() {
        const {actions} = this.props;
        // actions.updateNotice(
        //     '<a>http://www.baidu.com</a>'
        //     + 'aslkdhlsjahdljsahdjhajhdjsahjdhajhdsjhjahdjadsa'
        //     + 'aslkdhlsjahdljsahdjhajhdjsahjdhajhdsjhjahdjadsa'
        // );
    },

    computeHeight() {
        let me = this;
        const {scrollContent, toggleBtn} = me.refs;

        let contentHeight = $(scrollContent).height();

        let button = $(toggleBtn);

        if (contentHeight > minHeight) {
            button.addClass('active');
        }
        else {
            button.removeClass('active');
        }

    },


    foldScrollPanel() {
        let me = this;
        let refs = me.refs;
        let wrapper = $(refs.wrapper);

        // 从scroll中拿到被改写的panel
        let scroll = refs.scroll;
        const {scrollPanel} = scroll.refs;

        let lineHeight = $(refs.scrollContent)
            .css('line-height');
        wrapper
            .removeClass('unfold')
            .addClass('fold');


        this.animate(parseInt(lineHeight, 10));
    },

    unfoldScrollPanel() {
        let me = this;
        let refs = me.refs;
        let wrapper = $(refs.wrapper);

        let scroll = refs.scroll;
        const {scrollPanel} = scroll.refs;

        let listHeight = $(refs.scrollContent).height() < maxHeight
            ? $(refs.scrollContent).height()
            : maxHeight;

        wrapper
            .removeClass('fold')
            .addClass('unfold');

        this.animate(listHeight);
    },


    animate(height) {
        const me = this;

        let scroll = me.refs.scroll;
        const {scrollPanel} = scroll.refs;
        const {actions, scrollNotice} = me.props;


        let scrollElement = $(scrollPanel);
        let scrollHeight = scrollElement.height();


        // 最后一位是s秒
        let transDuration = +scrollElement
            .css('transition-duration').slice(0, -1) * 1000;

        scrollNotice(height, transDuration);
    },

    refreshHeight(height) {
        this.setState({
            height: height
        });
    },

    handleClick(e) {
        var refs = this.refs;
        $(refs.wrapper).hasClass('unfold')
            ? this.foldScrollPanel()
            : this.unfoldScrollPanel();
    },

    render() {
        const {notice} = this.props;
        return (
            <div className="notice-panel">
                <div className="wrapper fold" ref="wrapper">

                    <Scrollable height={this.state.height}  ref="scroll">
                        <div className="scroll-list" ref="scrollList">
                            <div className="content" ref="scrollContent">
                                {notice}
                            </div>
                        </div>
                    </Scrollable>

                    <div className="footer">
                        <div className="action">
                            <div className="btn btn-toggle" onClick={this.handleClick} ref="toggleBtn">
                                <i className="icon icon-caret-up"></i>
                                <i className="icon icon-caret-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default NoticePanel;