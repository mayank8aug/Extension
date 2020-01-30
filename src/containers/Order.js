import React, { PureComponent } from 'react';
import axios from 'axios';
import OrderList from '../components/OrderList';
// import { showNotification } from '../helper'; // getCookies,
/*global chrome*/

class Order extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            orderData: ''
        };
    }
  componentDidMount() {
    const sessionToken = '82725d0d-c4c3-4e2e-89dc-c0fc5c579f5f'; { /* getCookies("http://www.lenskart.com", "frontend", function(id) {
        alert(id);
    }); */ }
    axios.get(`https://api.lenskart.com/v3/orders?page=0&page-size=5`, { headers: { 'x-api-client': 'desktop', 'x-session-token': sessionToken } })
    .then(res => {
      const orderData = res.data.result && res.data.result.orders;
      this.setState({ orderData });
    });
    /* let notification = showNotification('', {
        type: "basic",
        title: "Primary Title",
        message: "Primary message to display",
        iconUrl: "/icon.png"
      }, function(data) {
        // alert(data);
    }); */
}
    render() {
        const { orderData } = this.state;
        const { localizationConfig } = this.props;
        return (
            <div className={'my-extension'}>
                {orderData && <OrderList OrderData={orderData} localizationConfig={localizationConfig}/>}
            </div>
        )
    }
}
export default Order;