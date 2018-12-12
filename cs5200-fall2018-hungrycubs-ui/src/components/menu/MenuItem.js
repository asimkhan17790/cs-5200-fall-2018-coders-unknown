import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Button,Modal,Card, Image} from 'react-bootstrap';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import {bindActionCreators} from "redux";
import * as restaurantActions from "../../actions/restaurantActions";
import * as adminActions from "../../actions/adminActions";
import CircularProgress from '@material-ui/core/CircularProgress';
import currentUser from "../../reducers/LoginSignupReducer";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import toastr from "toastr";
import {toastrOptions} from "../constants";
const styles = theme => ({
    icon: {
        margin: theme.spacing.unit,
        fontSize: 20,
        float:'right',
        position: 'absolute',
        left: 215,
        top:-8,
        cursor:'pointer'
    },
});
class MenuItem extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isCardSelected:false,
            cannotSelectedItemModalVisible:false,
            currentMenuItem: {
                basePrice:'',
                name:'',
                description:''
            },
            showMenuItemModal:false,
            showWaiting:false
        };
        this.onSelectMenuItem = this.onSelectMenuItem.bind(this);
        this.onMouseEnter= this.onMouseEnter.bind(this);
        this.onMouseLeave= this.onMouseLeave.bind(this);
        this.addQuantity = this.addQuantity.bind(this);

    }
    addQuantity(){
        this.props.actions.addCountItemToOrder1(this.props.menuItem.id);
    }
    showCannotSelectItemFromAnotherRestaurant = () => {
        this.setState({cannotSelectedItemModalVisible:true});
    };
    hideWarningModal = () => {
        this.setState({cannotSelectedItemModalVisible:false});
    };

    onSelectMenuItem(){

        if (this.props.currentRestaurantSelected && this.props.currentRestaurantSelected!==this.props.restaurantKey) {
            this.showCannotSelectItemFromAnotherRestaurant();
            return;
        }
        console.log('Menu item selected');
        const orderitem = {
            customerId:this.props.currentUser.id,
            restaurantKey:this.props.restaurantKey,
            item:{
                quantity:1,
                id:this.props.menuItem.id,
                basePrice:this.props.menuItem.basePrice,
                menuName:this.props.menuName,
                itemName:this.props.menuItem.name
            }
        };
        const index = this.props.orderItems.findIndex(item=> item.id===this.props.menuItem.id);
        if (index>=0) {
            this.addQuantity();
        }else {
            this.props.actions.addItemToOrder1(orderitem);
        }

    }
    onMouseEnter(){
        this.setState({isCardSelected:true});
    }
    onMouseLeave(){
        this.setState({isCardSelected:false});
    }
    // Admin / Owner functionalities
    onAdminClickMenuItem = () => {
      console.log('going to update menu item');
        this.setState({showMenuItemModal:true});
    };
    onHideMenuItemUpdateModal = () => {
        this.setState({currentMenuItem:this.props.menuItem});
        this.setState({showMenuItemModal:false});
    };
    onChangeMenuItemValue = (event) => {
        const field = event.target.name;
        let i = Object.assign({}, this.state.currentMenuItem);
        i[field] = event.target.value;
        return this.setState({currentMenuItem: i});
    };
    updateMenuItem = () => {
        const item = {
            id:this.props.menuItem.id,
            basePrice:this.state.currentMenuItem.basePrice,
            name:this.state.currentMenuItem.name,
            description:this.state.currentMenuItem.description
        };

        this.props.adminActions.updateMenuItem(item)
            .then(() => {
                this.onHideMenuItemUpdateModal();
                toastr.success('Item updated Successfully...');
                return this.props.actions.getMenuForRestaurant(this.props.restaurantKey)
            })
            .catch(error => {
                toastr.error(error,toastrOptions);
            });
    };
    deleteMenuItem = () => {

        this.setState({showWaiting:true});
        this.props.adminActions.deleteMenuItem(this.props.menuItem.id)
            .then(() => {
                this.setState({showWaiting:false});
                toastr.success('Item Deleted Successfully...');
                return this.props.actions.getMenuForRestaurant(this.props.restaurantKey)
            })
            .catch(error => {
                this.setState({showWaiting:false});
                toastr.error(error,toastrOptions);
            });
    };
    componentDidMount() {

        const item = {
            basePrice: this.props.menuItem.basePrice? this.props.menuItem.basePrice:'',
            description:  this.props.menuItem.description? this.props.menuItem.description:'',
            name:  this.props.menuItem.name && this.props.menuItem.name!==''? this.props.menuItem.name:'',
        };
        this.setState({currentMenuItem:item});

    }
    componentWillReceiveProps(nextProps) {
        const item = {
          basePrice: nextProps.menuItem.basePrice? nextProps.menuItem.basePrice:'',
          description:  nextProps.menuItem.description? nextProps.menuItem.description:'',
          name:  nextProps.menuItem.name && nextProps.menuItem.name!==''? nextProps.menuItem.name:'',
        };
        this.setState({currentMenuItem:nextProps.menuItem});
    }
    render(){
        const { classes } = this.props;
        return (
        <div style={{ minWidth:'250px',width:'250px', margin:'5px'}} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
            <Card border={this.state.isCardSelected?'danger':''}>
                <CircularProgress className={classes.progress} color="secondary" style={{display:`${this.state.showWaiting ?`block`:`none`}`}}/>
                <DeleteForeverIcon  onClick={this.deleteMenuItem} className={classes.icon} />
                <Card.Body>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <strong style={{fontSize:'15px'}}>{this.props.menuItem && this.props.menuItem.name && this.props.menuItem.name.length>30?`${this.props.menuItem.name.substring(0,29)}...`:this.props.menuItem.name}</strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <strong style={{fontSize:'11px',color:'grey'}}>{(this.props.menuItem.description && this.props.menuItem.description.length>30)?`${this.props.menuItem.description.substring(0,29)}...`:this.props.menuItem.description?this.props.menuItem.description:''}</strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <span>Price:</span><span style={{ color:'grey',fontWeight:'bold'}}>{`${this.props.menuItem.basePrice?this.props.menuItem.basePrice:''}`}</span>
                                </Col>
                                <Col>
                                    <div style={{textAlign:'right',display:`${(this.props.currentUser.dType==='CR')?`block`:`none`}`}}>
                                        <Button onClick={this.onSelectMenuItem} size="sm" variant="danger">Add</Button>
                                    </div>
                                    <div style={{textAlign:'right',display:`${(this.props.currentUser.dType==='ADM' || this.props.currentUser.dType==='OWR')?`block`:`none`}`}}>
                                        <Button onClick={this.onAdminClickMenuItem} size="sm" variant="danger">Update</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </Card.Body>
            </Card>
            <Modal
                show={this.state.showMenuItemModal} onHide={this.onHideMenuItemUpdateModal}
                dialogClassName="modal-50w"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Menu Item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group  controlId="menuItem.name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control value={this.state.currentMenuItem.name!=null?this.state.currentMenuItem.name:''} type="text" placeholder="Enter Menu Name here..." onChange={this.onChangeMenuItemValue} name='name'/>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group  controlId="menuItem.description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control  value={this.state.currentMenuItem.description!=null?this.state.currentMenuItem.description:'' } type="text" placeholder="Enter Menu Descriptin here" onChange={this.onChangeMenuItemValue} name='description'/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group  controlId="menuItem.basePrice">
                                    <Form.Label>Price ($)</Form.Label>
                                    <Form.Control  value={this.state.currentMenuItem.basePrice!=null?this.state.currentMenuItem.basePrice:''} type="text" placeholder="Enter Price here" onChange={this.onChangeMenuItemValue} name='basePrice'/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div style={{ textAlign:'right'}}>
                        <Button style={{marginRight : '4px', border:'none'}} size="sm" variant="outline-danger" onClick={this.onHideMenuItemUpdateModal}>Cancel</Button>
                        <Button size="sm" variant="info" onClick={this.updateMenuItem}>Update</Button>
                    </div>
                </Modal.Footer>
            </Modal>

            <Modal
                show={this.state.cannotSelectedItemModalVisible} onHide={this.hideWarningModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Attention!!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        You cannot add items to your order list from different Restaurants. To do so, please complete your current order first.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="lg" variant="danger" onClick={this.hideWarningModal}>OK</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
    }
}

MenuItem.propTypes = {
    menuItem: PropTypes.object,
    restaurantKey:PropTypes.string,
    menuName:PropTypes.string,
    menuId:PropTypes.number
};

function mapStateToProps(state, ownProps) {
    return {
        currentUser:state.currentUser,
        orderItems:state.menuPageData.order.items,
        currentRestaurantSelected: state.menuPageData.order.restaurantKey
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(restaurantActions, dispatch),
        adminActions:bindActionCreators(adminActions,dispatch)
    };
}
export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(MenuItem)));