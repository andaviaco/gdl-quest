'use strict';

import React from 'react';
import {List, ListItem} from 'material-ui';

var MallList = React.createClass({
    render: function () {
        return (
            <List>
                <ListItem primaryText="Inbox" />
            </List>
        );
    }
});

module.exports = MallList;
