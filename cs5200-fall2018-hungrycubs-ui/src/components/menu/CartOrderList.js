import React from 'react';
import PropTypes from 'prop-types';
import {Container,Navbar,Button,Badge,Form} from 'react-bootstrap';
import CartOrderItem from './CartOrderItem';
import {Divider} from "@material-ui/core";

const CartOrderList = ({orderItems, openOrderSummaryModal,totalPrice,currentUser}) => {
    return (
        (currentUser.dType==='CR')?(<div style={{display:'block', maxHeight:'600px', overflowY: 'auto'}}>
            <Navbar bg="dark" variant="dark" sticky='top'>
                <Navbar.Brand >
                    {'My Cart'}
                </Navbar.Brand>
                <Form inline style={{float:'right'}}>
                    <Button disabled={orderItems.length===0} onClick={openOrderSummaryModal} style={{textAlign:'right'}} variant="danger">
                        Checkout <Badge variant="danger">{`$ ${parseFloat(totalPrice).toFixed(2)}`} </Badge>
                    </Button>
                </Form>
            </Navbar>
            {orderItems && orderItems.length>0?orderItems.map(item=><div key={item.id}><CartOrderItem id={item.id}  menuName={item.menuName} basePrice={item.basePrice} itemName={item.itemName} quantity={item.quantity}/><Divider/></div>):''}

        </div>):''
    );
};

CartOrderList.propTypes = {
    orderItems: PropTypes.array,
    openOrderSummaryModal:PropTypes.func,
    totalPrice:PropTypes.number,
    currentUser:PropTypes.object
};

export default CartOrderList;
