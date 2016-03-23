import React from 'react';
import ReactDOM  from 'react-dom';

import Scrollable from './Scrollable';
import UserItem from './UserItem';
import * as mapConfig from '../constants/mapConfig';
import * as config from '../constants/config';

const AllUserList = React.createClass({


    componentDidMount() {
    },


    addUser(user) {
        const {actions} = this.props;
        actions.addUser(user);
    },

    delUser(id) {
        const {actions} = this.props;
        actions.deleteUser(id);
    },

    addUserList(userList) {
        const {actions} = this.props;
        actions.addUserList(userList);
    },

    emptyUserList() {
        const {actions} = this.props;
        actions.emptyUserList();
    },


    render() {
        let {users, actions, computeCount} = this.props;

        let userArray = [];

        let topUsers = users
            ? users.slice(0, config.USERLIST_MAX_COUNT)
            : [];

        topUsers.forEach(
           (user, index) => {
                userArray.push(
                    <UserItem user={user} key={user.id}/>
                );
            }
        );

        return (
            <Scrollable ref="userScroll">
                <div className="scroll-list">
                    <div className="user-list">
                        {userArray}
                    </div>
                </div>
            </Scrollable>
        );
    }
});


export default AllUserList;