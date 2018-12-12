import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PizzaIcon from '@material-ui/icons/LocalPizzaRounded';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import {withRouter} from "react-router-dom";
import {toastrOptions} from '../constants';
import toastr from "toastr";

import {bindActionCreators} from "redux";
import * as restaurantActions from "../../actions/restaurantActions";
import * as adminActions from "../../actions/adminActions";
import * as userActions from "../../actions/UserActions";

import connect from "react-redux/es/connect/connect";
import MenuItem from "./MenuItem";
import MenuList from "./MenuList";
import {Container, Row, Col, Button, Form, Modal} from "react-bootstrap";
import CartOrderList from './CartOrderList';
import SignupModal from "../common/SingupModal";
import OrderSummaryModal from "./OrderSummaryModal";
import currentUser from "../../reducers/LoginSignupReducer";
import RestaurantReviewsModal from "./RestaurantRevewsModal";

toastr.options = toastrOptions;
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        //flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});
class MenuPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            value: 0,
            searching:false,
            orderModalVisible:false,
            deliveryDetails:{
                address:'',
                phone:''
            },
            newMenuItem:{
                basePrice:0,
                name:'',
                description:'',
                menuId:''
            },
            showMenuItemModal:false,
            menuElement:{},
            reviewModalVisible:false,
            text:''
        };
        this.showOrderModal = this.showOrderModal.bind(this);
        this.hideOrderModal = this.hideOrderModal.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
        this.updateOrderAddressOrPhone = this.updateOrderAddressOrPhone.bind(this);
    }
    componentDidMount() {
        console.log('MenuPage did mount.');
        this.setState({searching: true});
        this.props.actions.getRestaurantDetails(this.props.match.params.resId).catch(error => {
            toastr.error(error);

        });

        if (this.props.currentUser.id!==0 && this.props.currentUser.dType==='CR') {
            this.props.userActions.getIamFollowing(this.props.currentUser.id).then(() => {
            })
                .catch(error => {

                    toastr.error(error);
                });
        }

        this.props.actions.getMenuForRestaurant(this.props.match.params.resId)
            .then(() => {
                console.log(this.props.resultMenuItems);
            })
            .catch(error => {
                toastr.error(error);
            });
        this.props.actions.viewRestaurantReviews(this.props.match.params.resId)
            .then(() => {
                console.log(this.props.restaurantReviews);
            })
            .catch(error => {
                toastr.error(error);
            });
        //SPREAD OPERATOR REFERENCE - ASIM
        if (this.props.currentUser && this.props.currentUser.addresses && this.props.currentUser.addresses.length>0) {
            this.setState({...this.state.deliveryDetails,address:this.props.currentUser.addresses[0]});
        }
        if (this.props.currentUser && this.props.currentUser.phones && this.props.currentUser.phones.length>0) {
            this.setState({...this.state.deliveryDetails,address:this.props.currentUser.phones[0]});
        }
    }
    showOrderModal(){
        this.setState({ orderModalVisible: true });
    }
    hideOrderModal(){
        this.setState({
            orderModalVisible: false
        });
    }

    showReviewModal = () =>{
        this.setState({ reviewModalVisible: true });
    };
    hideReviewModal = ()=>{
        this.setState({ reviewModalVisible: false });
    };
    onChangeReviewPost = (event) => {
        return this.setState({text: event.target.value});
    };
    postReview= ()=> {
        if (this.props.currentUser.id === 0) {
            toastr.error('Please Login to Post reviews');
            return;
        }
        if (!this.state.text || this.state.text === '') {
            toastr.error('Please write something to post!');
            return;
        }
        this.props.actions.postRestaurantReview(this.props.currentUser.id, this.props.match.params.resId, {text:this.state.text})
            .then(() => {
                toastr.success('Your review has been posted!');
                this.setState({text:''});
                return this.props.actions.viewRestaurantReviews(this.props.match.params.resId);
            })
            .catch(error => {
                toastr.error(error,toastrOptions);
            });
    };

    onHideMenuItemCreateModal = () => {
        this.setState({showMenuItemModal:false});
        this.setState(prevState => ({
            ...prevState,
            newMenuItem: {
                ...prevState.newMenuItem,
                basePrice:0,name:'',description:''
            }
        }));
    };
    onChangeMenuItemValue = (event) => {
        const field = event.target.name;
        let i = Object.assign({}, this.state.newMenuItem);
        i[field] = event.target.value;
        return this.setState({newMenuItem: i});
    };
    createMenuItem = () => {
        this.props.adminActions.createMenuItem(this.state.newMenuItem, this.state.newMenuItem.menuId)
            .then(() => {
                toastr.success('Added new Dish Successfully!!')
                this.onHideMenuItemCreateModal();
                return this.props.actions.getMenuForRestaurant(this.props.match.params.resId)
            })
            .catch(error => {
                toastr.error(error,toastrOptions);
            });
    };

    placeOrder(){

        this.props.actions.placeOrder(this.state.deliveryDetails.address,this.state.deliveryDetails.phone, this.props.order)
            .then(() => {
                toastr.success('Order Added Successfully!!',toastrOptions);
                this.hideOrderModal();
            })
            .catch(error => {
                toastr.error(error,toastrOptions);
            });
    }
    updateOrderAddressOrPhone(event){
        const field = event.target.name;
        let deliveryDetails = Object.assign({}, this.state.deliveryDetails);
        deliveryDetails[field] = event.target.value;
        return this.setState({deliveryDetails: deliveryDetails});
    }
    gotoLoginPage = () => {
        this.props.history.push(`/`);
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };
    renderTab(menuName){
        return(<Tab key={menuName} label={menuName} icon={<PizzaIcon />}/>);
    }
    renderTabContainer(){
            if (this.props.resultMenuItems.length>0) {
                const { value } = this.state;
                const element = this.props.resultMenuItems.find(item => item.index === value);
                //this.setState({menuElement:element});
                return <TabContainer>

                    <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'center'}}>

                        {element.items && element.items.length>0?element.items.map(item =>
                            <MenuItem key={item.apiKey} menuItem={item} menuName={element.name} menuId={element.id} restaurantKey={this.props.match.params.resId}/>
                        ):''}
                    </div>
                    </TabContainer>;
            }
        return ``;
    }

    showNewMenuItemModal= () => {

        this.setState({  showMenuItemModal:true     });

    };
    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className="jumbotron">
                <Row>
                    <Col xs={(this.props.currentUser.dType==='CR')?10:12}>
                        <Row style={{display:`${this.props.restaurantDetails && this.props.restaurantDetails.id!==0 && this.props.restaurantDetails.logoUrl && this.props.restaurantDetails.logoUrl?`block`:`none`}`,marginBottom:'10px'}}>
                            <Col >
                                <Row>
                                    <Col>
                                        <img src={this.props.restaurantDetails.logoUrl} style={{ height:'100px', width:'100px'}}/>
                                        <strong  style={{fontSize:'20px', marginLeft:'30px'}}>{this.props.restaurantDetails.name}</strong>
                                        <Button style={{    position: `relative`,top: `27px`,left: `-152px`}} size="sm" variant="danger" onClick={this.showReviewModal}>View Reviews</Button>

                                    </Col>
                                </Row>

                            </Col>

                        </Row>
                        <Row>
                            <div className={classes.root}>
                                <AppBar position="static" color="default">
                                    <Tabs
                                        value={value}
                                        onChange={this.handleChange}
                                        scrollable
                                        scrollButtons="on"
                                        indicatorColor="primary"
                                        textColor="primary"
                                    >
                                        {this.props.resultMenuItems && this.props.resultMenuItems.length>0 && this.props.resultMenuItems.map(item=> this.renderTab(item.name))}

                                    </Tabs>
                                </AppBar>
                                {this.renderTabContainer()}
                            </div>
                        </Row>
                        <Row style={{margin:'auto', display:`${this.props.currentUser.dType==='ADM' || this.props.currentUser.dType==='OWR'?`block`:`none`}`}}>
                            <Col style={{textAlign:'center'}}>
                            <Button size="lg" variant="danger" onClick={this.showNewMenuItemModal}>Add new Menu Item</Button>
                            </Col>
                        </Row>

                    </Col>
                    <Col style={{display:`${(this.props.currentUser.dType==='CR')?'block':'none'}`,     padding: `1px`}} xs={2}>
                       <CartOrderList currentUser={this.props.currentUser} totalPrice ={this.props.order.totalPrice} orderItems={this.props.orderItems} openOrderSummaryModal={this.showOrderModal}/>
                    </Col>
                </Row>

                <OrderSummaryModal readOnly={false} show={this.state.orderModalVisible} onHide={this.hideOrderModal}  order={this.props.order}
                                   placeOrder={this.placeOrder} currentUser={this.props.currentUser} gotoLoginPage={this.gotoLoginPage}
                             onChange={this.updateOrderAddressOrPhone}/>
                <RestaurantReviewsModal show={this.state.reviewModalVisible} onHide={this.hideReviewModal}
                                        onChangePostField={this.onChangeReviewPost}
                                        reviewsList={this.props.restaurantReviews} currentUser={this.props.currentUser} postReview={this.postReview}/>
                <Modal
                    show={this.state.showMenuItemModal} onHide={this.onHideMenuItemCreateModal}
                    dialogClassName="modal-50w"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add New Menu Item
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group  controlId="menuItem.name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control value={this.state.newMenuItem.name} type="text" placeholder="Enter Menu Name here..." onChange={this.onChangeMenuItemValue} name='name'/>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group  controlId="menuItem.description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control  value={this.state.newMenuItem.description } type="text" placeholder="Enter Menu Descriptin here" onChange={this.onChangeMenuItemValue} name='description'/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group  controlId="menuItem.basePrice">
                                        <Form.Label>Price ($)</Form.Label>
                                        <Form.Control  value={this.state.newMenuItem.basePrice} type="text" placeholder="Enter Price here" onChange={this.onChangeMenuItemValue} name='basePrice'/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Control as="select" name='menuId' onChange={this.onChangeMenuItemValue} >
                                <option value="">Select Item Category...</option>
                                {this.props.resultMenuItems.map(item=>
                                    <option key={item.id}
                                            value={item.id}>{item.name}</option>)}
                            </Form.Control>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <div style={{ textAlign:'right'}}>
                            <Button style={{marginRight : '4px', border:'none'}} size="sm" variant="outline-danger" onClick={this.onHideMenuItemCreateModal}>Cancel</Button>
                            <Button size="sm" variant="info" onClick={this.createMenuItem}>Create</Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}

MenuPage.propTypes = {
    actions: PropTypes.object,
    resultMenuItems:PropTypes.array,
    orderItems:PropTypes.array,
    order:PropTypes.object,
    currentUser:PropTypes.object,
    restaurantReviews:PropTypes.array
};

function mapStateToProps(state, ownProps) {
    let count = 0;
    const menuItems = state.menuPageData && state.menuPageData.menuItems && state.menuPageData.menuItems.length>0? state.menuPageData.menuItems.map(item=> {
        const a = {index:count++};

        return {...item,...a};
    }):[];
    return {
        resultMenuItems: menuItems,
        orderItems:state.menuPageData.order.items,
        order:state.menuPageData.order,
        currentUser:state.currentUser,
        restaurantDetails:state.menuPageData.currentRestaurant,
        restaurantReviews:state.menuPageData.restaurantReviews
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(restaurantActions, dispatch),
        adminActions: bindActionCreators(adminActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
    };
}
//export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuPage));
//export default withStyles(styles)(MenuPage);

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(MenuPage)));