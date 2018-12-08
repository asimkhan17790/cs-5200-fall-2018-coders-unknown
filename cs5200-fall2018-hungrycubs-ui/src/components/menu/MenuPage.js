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
import toastr from "toastr";
import {bindActionCreators} from "redux";
import * as restaurantActions from "../../actions/restaurantActions";
import connect from "react-redux/es/connect/connect";
import MenuItem from "./MenuItem";
import MenuList from "./MenuList";
import {Container,Row,Col} from "react-bootstrap";
import CartOrderList from './CartOrderList';

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
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});
class MenuPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            value: 0,
            searching:false
        };
    }
    componentDidMount() {
        console.log('MenuPage did mount.');
        this.setState({searching: true});
        this.props.actions.getMenuForRestaurant(this.props.match.params.resId)
            .then(() => {
                console.log(this.props.resultMenuItems);

                this.setState({searching: false});
            })
            .catch(error => {
                toastr.error(error);
                this.setState({searching: false});
            });
    }

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
                return <TabContainer>

                    <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'center'}}>

                        {element.items.map(item =>
                            <MenuItem key={item.apiKey} menuItem={item} menuName={element.name}/>
                        )}
                    </div>
                    </TabContainer>;
            }
        return ``;
    }
    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className="jumbotron">
                <Row>
                    <Col xs={10}>
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
                                    {this.props.resultMenuItems.length>0 && this.props.resultMenuItems.map(item=> this.renderTab(item.name))}

                                </Tabs>
                            </AppBar>
                            {this.renderTabContainer()}
                        </div>
                    </Col>
                    <Col xs={2}>
                       <CartOrderList/>
                    </Col>
                </Row>
            </div>
        );
    }
}

MenuPage.propTypes = {
    actions: PropTypes.object,
    resultMenuItems:PropTypes.array
};

function mapStateToProps(state, ownProps) {
    let count = 0;
    const menuItems = state.menuPageData.menuItems.map(item=> {
        const a = {index:count++};
        const merged = {...item,...a};
        return merged;
    });
    return {
        resultMenuItems: menuItems,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(restaurantActions, dispatch)
    };
}
//export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuPage));
//export default withStyles(styles)(MenuPage);

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(MenuPage)));