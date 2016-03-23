import React from 'react';


var VideoLoading = React.createClass({

    render() {
        return (
            <div className="video-loading">
                <div className="loading">
                    <div className="loading-grid grid1"></div>
                    <div className="loading-grid grid2"></div>
                    <div className="loading-grid grid3"></div>
                    <div className="loading-grid grid4"></div>
                    <div className="loading-grid grid5"></div>
                </div>
                <div className="loading-hint">
                    音视频缓冲中，请稍候...
                </div>
            </div>
        );
    }
});

export default VideoLoading;