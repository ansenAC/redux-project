import React from 'react';
import compressImage from '../utils/compressImage';
import classNames from 'classnames';
import * as classData from '../data/class';
import * as config from '../constants/config';

var PlayerCard = React.createClass({

    render() {

        const {avatar, videoOn} = this.props;

        const avatarUrl = compressImage({
            url: avatar,
            height: 60,
            width: 60
        });

        let teacher = classData.getTeacherInfo();
        let context = config.TEAHCER_VIDEO_OFF_TEXT;

        if (teacher && videoOn) {
            context = teacher.name;
        }

        return (
            <div className={classNames(
                'user-card',
                {
                    'show-card': !videoOn
                }
            )}>
                <div className="media-info">
                    <img className="avatar" src={avatarUrl}/>
                    <div className="status">
                        {context}
                    </div>
                </div>
            </div>
        )

    }
});

export default PlayerCard;