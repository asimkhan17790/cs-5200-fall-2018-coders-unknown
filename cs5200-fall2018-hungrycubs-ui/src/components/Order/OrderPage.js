import React from 'react';
import {Container} from 'react-bootstrap';
import {withRouter} from "react-router-dom";

class OrderPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    };

  }

  render() {
    return (
      <div>
        <Container>
          <h1>Order Page</h1>
        </Container>
      </div>
    );
  }
}

OrderPage.propTypes = {

};


export default withRouter(OrderPage);
