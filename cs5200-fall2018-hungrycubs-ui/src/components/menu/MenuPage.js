import React from 'react';
import {Container} from 'react-bootstrap';
import {withRouter} from "react-router-dom";

class MenuPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isVisible: false,
        };

    }
    updateModal(isVisible) {
        this.state.isVisible = isVisible;
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <Button bsStyle="primary" onClick={ () => this.updateModal(true) }><Glyphicon glyph="menu-hamburger"/></Button>
                <Sidebar side='left' isVisible={ this.state.isVisible } onHide={ () => this.updateModal(false) }>
                    <Nav>
                        <NavItem href="#">Link 1</NavItem>
                        <NavItem href="#">Link 2</NavItem>
                        <NavItem href="#">Link 3</NavItem>
                        <NavItem href="#">Link 4</NavItem>
                    </Nav>
                </Sidebar>
            </div>
        );
    }
}

MenuPage.propTypes = {

};


export default withRouter(MenuPage);
