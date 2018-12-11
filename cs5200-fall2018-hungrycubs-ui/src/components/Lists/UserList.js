import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {ListGroup} from 'react-bootstrap';
import {Divider} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import UserListItem from './UserListItem';
const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

class UserList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {

            orderModalVisible:false,
            deliveryBoyDetails:{
                address:'',
                phone:''
            }
        };
    }

    componentDidMount(){

    }

    render() {
        const { classes } = this.props;
        return (
            <div style={{fontSize:'12px',maxHeight:'350px',overflowY:'auto'}}>
                {this.props.userList && this.props.userList.length>0?<ListGroup >

                    {this.props.userList && this.props.userList.length>0?this.props.userList.map(item=>(<UserListItem  key={item.id} userItem={item}/>)):''}
                </ListGroup>:''}
            </div>
        );
    }
}

UserList.propTypes = {
    userList:PropTypes.array
};

export default withRouter(withStyles(styles)(UserList));