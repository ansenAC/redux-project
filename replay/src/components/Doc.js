import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {startLoading, completeLoading, updateDocImage, updateDocDimension} from '../actions/doc';

const Doc = React.createClass({
    mixins: [PureRenderMixin],

    componentDidMount() {
        this.startLoading();
    },

    componentDidUpdate() {
        this.startLoading();
    },

    startLoading() {
        const {dispatch} = this.props;
        const image = this.refs.image;

        dispatch(startLoading);
    },

    onLoad() {
        const {dispatch} = this.props;
        const {image} = this.refs;

        dispatch(completeLoading);
        dispatch(updateDocDimension({
            width: image.offsetWidth,
            height: image.offsetHeight
        }));
    },

    render() {
        const {url, retinaUrl} = this.props;

        return (
            <img 
                ondragstart="return false"
                src={url}
                srcSet={retinaUrl + ' 2x'}
                onLoad={this.onLoad}
                ref="image"
            />
        );
    }
});

Doc.propTypes = {
    dispatch: PropTypes.func,
    url: PropTypes.string,
    retinaUrl: PropTypes.string
};

export default Doc;