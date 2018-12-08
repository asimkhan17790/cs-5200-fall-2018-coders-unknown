import React from 'react';
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap';

class Footer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }



  render() {
    return (
      <div style={{marginTop:'50px', textAlign:'right'}}>
      <Navbar bg="dark" variant="dark" fixed="bottom">
        <Nav className="mr-auto" style={{textAlign:'last'}}>
          <Nav.Link href="https://www.linkedin.com/in/asimkhan17/" target="_blank">Asim Khan</Nav.Link>
          <Nav.Link href="https://www.linkedin.com/in/gautam-vashisht/" target="_blank">Gautam Vashishth</Nav.Link>
        </Nav>
        </Navbar>
      </div>
    );
  }
}



//Pull in the React Router context so router is available on this.context.router.
/*ApplicationHeader.contextTypes = {
  router: PropTypes.object
};*/


export default Footer;
