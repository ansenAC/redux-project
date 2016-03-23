import React from 'react';
import Tooltip from 'delightui/Tooltip';

var  InputPanel = React.createClass({
    render() {
        return (
            <div className="input-panel">
                <textarea className="form-text">
                </textarea>
                <div className="footer">
                    <div className="button">
                        <div className="btn-emotion btn-default tiny">
                            <i className="icon icon-emotion"></i>
                        </div>
                        <div className="btn-send btn-default tiny">
                            发送
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default InputPanel;