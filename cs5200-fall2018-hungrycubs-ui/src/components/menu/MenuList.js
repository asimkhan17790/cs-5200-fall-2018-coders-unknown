import React from 'react';
import PropTypes from 'prop-types';
import {Container} from 'react-bootstrap';
import MenuItem from './MenuItem';
class MenuList extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            menuItems:[]
        }
    }

    componentWillReceiveProps(nextProps){
        if (this.props.menuItems!==nextProps.menuItems) {
            this.setState({menuItems:nextProps.menuItems});
        }
    }
    render() {

        {console.log('menutesda'+ this.state.menuItems)}
        return (
        this.state.menuItems?

            <Container>
            <div style={{ display:'flex-start', flexWrap:'wrap', alignItems:'left', justifyContent:'left'}}>

                {this.state.menuItems.map(item =>
                    <MenuItem key={item.apiKey} menuItem={item}/>
                )}
            </div>
        </Container>:''
    );
        }
}

MenuList.propTypes = {
    menuItems: PropTypes.array
};

export default MenuList;
