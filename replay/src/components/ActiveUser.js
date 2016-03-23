import React from 'react';
import Scrollable from './Scrollable';

const ActiveUser = React.createClass({

    render() {
        return (
            <Scrollable>
                <div className="scroll-list">
                    <div className="active-list"></div>
                </div>
            </Scrollable>
        );
    }
});

export default ActiveUser;