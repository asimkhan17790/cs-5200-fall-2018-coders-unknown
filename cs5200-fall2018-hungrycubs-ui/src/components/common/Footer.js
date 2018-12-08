import React from 'react';
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap';

class Footer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }



  render() {
    return (
      <div style={{marginTop:'50px'}}>
      <Navbar bg="dark" variant="dark" fixed="bottom"/>

      </div>
    );
  }
}



//Pull in the React Router context so router is available on this.context.router.
/*ApplicationHeader.contextTypes = {
  router: PropTypes.object
};*/


export default Footer;
