import ScrollBar from 'cobble/ui/ScrollBar';
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import debounce from 'cobble/function/debounce';

const Scrollable = React.createClass({
    mixins: [PureRenderMixin],

    getInitialState() {
        return {
            needRefresh: false,
            scrollHeight: 0,
            height: 0
        };
    },

    componentDidMount() {
        const {panel, element} = this.refs;

        this.scrollBar
        = new ScrollBar({
            panel: $(panel),
            element: $(element),
            value: 0,
            draggingClass: 'active',
            hoverClass: 'hover'
        });

        this.onResize = debounce(
            (() => {
                this.setState({
                    needRefresh: true
                });
            }).bind(this),
            50
        );

        $(window)
            .on('resize', this.onResize);

    },

    componentWillUnmount() {
        $(window).off('resize', this.onResize);
    },

    componentDidUpdate(prevProps, prevState) {
        const {scrollBar, state} = this
        const {scrollHeight, height} = state;
        let {needRefresh} = state;

        const {panel} = this.refs;
        const panelHeight = $(panel).innerHeight();
        const panelScrollHeight = panel.scrollHeight;

        needRefresh
        = needRefresh
        || (!scrollHeight || !height)
        || (scrollHeight !== panelScrollHeight)
        || (panelHeight !== height);

        if (needRefresh) {
            this.scrollBar.refresh({
                value: scrollBar.value
            });

            state.scrollHeight = panelScrollHeight;
            state.height = panelHeight;

            state.needRefresh = false
        }
    },

    render() {
        const children = () => {
            let child
            = React.Children.only(this.props.children);

            return React.cloneElement(child, {
                ref: 'panel'
            });
        };

        var style = {
            height: this.props.height || '100%'
        }

        return (
            <div style={style} ref="scrollPanel">
                {children()}
                <div className="scroll-track" ref="element">
                </div>
            </div>
        )
    }
});

export default Scrollable;
