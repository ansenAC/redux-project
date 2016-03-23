import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import ActiveUser from '../components/ActiveUser';
import AllUserList from '../components/AllUserList';


import * as activeUserActions from '../actions/activeUser';
import * as userListActions from '../actions/userList';
import * as statusActions from '../actions/status';

import * as mapConfig from '../constants/mapConfig';
import * as config from '../constants/config';

var UserTab = React.createClass({

    componentDidMount() {
    },

    tabHandleClick(e) {
        const {statusActions} = this.props;
        let target = $(e.currentTarget);

        let userListShow = target.attr('data-type') == 'user';
        statusActions.updateUserTabStaus(userListShow);
    },

    computeCount(count) {
        this.setState({
            count: count
        });
    },

    render() {
        const {users, userListShow, userListActions, count} = this.props;
        let userArray = [];
        let teacher;
        users.forEach(
            user => {
                user.endTypeIcon = mapConfig.END_TYPE_MAP[user.endType];
                user.endTypeText = mapConfig.END_TYPE_TEXT[user.endType];
                user.roleType = mapConfig.USER_ROLE_TYPE_SIGN[user.type];
                user.roleText = mapConfig.USER_ROLE_TYPE_TEXT[user.type];

                if (user.type === config.USER_ROLE_TEACHER) {
                    teacher = user;
                    return;
                }

                userArray.push(user);
            }
        );
        if (teacher) {
            userArray = [teacher, ...userArray];
        }

        return (
            <div className="user-tab" ref="userTab">
                <div className="tab-nav" ref="tab">
                    <h5 className={classNames(
                        'nav-item',
                        'nav-active',
                        {
                            active: !userListShow
                        }
                    )} onClick={this.tabHandleClick} data-type="active">
                        发言用户
                    </h5>
                    <h5 className={classNames(
                        'nav-item',
                        'nav-user',
                        {
                            active: userListShow
                        }
                    )} onClick={this.tabHandleClick} data-type="user">
                        用户名单
                    <small>
                    <span className="user-count">({userArray.length})</span>
                    </small>
                    </h5>
                </div>

                <div className="tab-content">

                    <div className={classNames(
                            'tab-panel',
                            'active-user-panel',
                            {
                                active: !userListShow
                            }
                        )}>
                        <ActiveUser/>
                    </div>

                    <div className={classNames(
                            'tab-panel',
                            'all-user-panel',
                            {
                                active: userListShow
                            }
                        )}>
                        <AllUserList users={userArray} actions={userListActions} />
                    </div>
                </div>
            </div>
        );
    }
});

function mapStateToProps(state) {
    const {userList, status, player} = state;
    const {users, count} = userList;
    const {userListShow} = status;
    const {currentTime} = player;

    return {
        users,
        count,
        userListShow,
        currentTime
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userListActions: bindActionCreators(userListActions, dispatch),
        statusActions: bindActionCreators(statusActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserTab);