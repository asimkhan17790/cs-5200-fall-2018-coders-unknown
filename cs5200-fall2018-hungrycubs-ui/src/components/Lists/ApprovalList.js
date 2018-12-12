import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {ListGroup} from 'react-bootstrap';
import {Divider} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import ApprovalListItem from './ApprovalListItem';
const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

class ApprovalList extends React.Component {
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
        let c = 0;
        return (
            <div style={{fontSize:'12px',maxHeight:'350px',overflowY:'auto'}}>
                {this.props.approvalList && this.props.approvalList.length>0?<ListGroup>

                    {this.props.approvalList && this.props.approvalList.length>0?this.props.approvalList.map(item=>(<ApprovalListItem  key={c++} approvalItem={item}/>)):''}
                </ListGroup>:''}
            </div>
        );
    }
}

ApprovalList.propTypes = {
    approvalList:PropTypes.array
};

export default withRouter(withStyles(styles)(ApprovalList));