import React from 'react';
import PropTypes from 'prop-types';
import {Container,Navbar,Button,Badge,Form} from 'react-bootstrap';
import CartOrderItem from './CartOrderItem';
import {Divider} from "@material-ui/core";

const CartOrderList = ({orderItems, openOrderSummaryModal}) => {
    return (
        <div style={{display:'block', maxHeight:'600px', overflowY: 'auto'}}>
            <Navbar bg="dark" variant="dark" sticky='top'>
                <Navbar.Brand >
                    {'My Cart'}
                </Navbar.Brand>
                <Form inline style={{float:'right'}}>
                <Button disabled={orderItems.length===0} onClick={openOrderSummaryModal} style={{float:'right'}} variant="danger">
                    Checkout <Badge variant="danger">$48.60</Badge>
                    <span className="sr-only">unread messages</span>
                </Button>
                </Form>
            </Navbar>
            {orderItems.map(item=><div key={item.id}><CartOrderItem id={item.id}  menuName={item.menuName} basePrice={item.basePrice} itemName={item.itemName} quantity={item.quantity}/><Divider/></div>)}

        </div>
    );
};

CartOrderList.propTypes = {
    orderItems: PropTypes.array,
    openOrderSummaryModal:PropTypes.func
};

export default CartOrderList;