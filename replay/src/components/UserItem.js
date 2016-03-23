import React from 'react';
import classNames from 'classnames';
import compressImage from '../utils/compressImage';

const UserItem = React.createClass({

    render() {
        const {user} = this.props;

        const avatarUrl = compressImage({
            url: user.avatar,
            height: 30,
            width: 30
        });

        return (
            <div className="user-item"
            data-id={user.id} data-role={user.roleType}
            data-number={user.number}>
                <div className="status">
                    <i className={classNames(
                            'icon',
                            'icon-' + user.endTypeIcon,
                            'icon-end-type'
                        )}
                        data-title={user.endTypeText}
                    >
                    </i>
                </div>
                <img className="avatar"  ondragstart="return false" src={avatarUrl} />
                <strong>{user.name}</strong>
                <label>{user.roleText}</label>
            </div>
        );
    }
});


export default UserItem;