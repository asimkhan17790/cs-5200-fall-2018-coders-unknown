import React from 'react';
import PropTypes from 'prop-types';
import {Container,Navbar} from 'react-bootstrap';
import CartOrderItem from './CartOrderItem';
import {Divider} from "@material-ui/core";
const CartOrderList = ({restaurants}) => {
    return (
        <div style={{display:'block', maxHeight:'600px', overflowY: `scroll`}}>
            <Navbar bg="dark" variant="dark" sticky='top'>
                <Navbar.Brand href="#home">

                    {'My Cart'}
                </Navbar.Brand>
            </Navbar>
            <CartOrderItem menuName={'Starter'} basePrice={15.55} itemName={`Chicken Tikka`} quantity={4}/>
            <Divider />
            <CartOrderItem menuName={'Starter'} basePrice={15.55} itemName={`Chicken Tikka`} quantity={4}/>
            <Divider />
            <CartOrderItem menuName={'Starter'} basePrice={15.55} itemName={`Chicken Tikka`} quantity={4}/>
            <CartOrderItem menuName={'Starter'} basePrice={15.55} itemName={`Chicken Tikka`} quantity={4}/>
            <CartOrderItem menuName={'Starter'} basePrice={15.55} itemName={`Chicken Tikka`} quantity={4}/>
            <CartOrderItem menuName={'Starter'} basePrice={15.55} itemName={`Chicken Tikka`} quantity={4}/>
            <CartOrderItem menuName={'Starter'} basePrice={15.55} itemName={`Chicken Tikka`} quantity={4}/>
            <CartOrderItem menuName={'Starter'} basePrice={15.55} itemName={`Chicken Tikka`} quantity={4}/>
            <CartOrderItem menuName={'Starter'} basePrice={15.55} itemName={`Chicken Tikka`} quantity={4}/>
        </div>
    );
};

CartOrderList.propTypes = {
    restaurants: PropTypes.array,
};

export default CartOrderList;
