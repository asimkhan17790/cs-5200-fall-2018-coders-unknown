import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {ListGroup} from 'react-bootstrap';
import CustomerOrderItem from "./CustomerOrderItem";
import {Divider} from "@material-ui/core";
const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

class CustomerOrderList extends React.Component {
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
            <div style={{fontSize:'12px',maxHeight:'200px',overflowY:'auto'}}>
                {this.props.orderList && this.props.orderList.length>0?<ListGroup >
                {console.log(this.props.orderList)}
                {this.props.orderList && this.props.orderList.length>0?this.props.orderList.map(item=>(<CustomerOrderItem readOnly={this.props.readOnly} managerId={this.props.managerId} key={item.id} orderItem={item}/>)):''}
            </ListGroup>:''}
            </div>
        );
    }
}

CustomerOrderList.propTypes = {
  orderList:PropTypes.array,
    managerId: PropTypes.number,
    readOnly:PropTypes.bool
};

export default withStyles(styles)(CustomerOrderList);