import React, { PureComponent } from 'react';
import axios from 'axios';
import OrderList from '../components/OrderList';
import { showNotification } from '../helper'; // getCookies,
/*global chrome*/

class Order extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            orderData: ''
        };
    }
  componentDidMount() {
    const sessionToken = '1c9119a9-d999-4f71-a00a-4fa0b7b3530e'; { /* getCookies("http://www.lenskart.com", "frontend", function(id) {
        alert(id);
    }); */ }
    axios.get(`https://api.lenskart.com/v3/orders?page=0&page-size=2`, { headers: { 'x-api-client': 'desktop', 'x-session-token': sessionToken } })
    .then(res => {
      const orderData = res.data.result && res.data.result.orders;
      this.setState({ orderData });
    });
    let notification = showNotification('', {
        type: "basic",
        title: "Primary Title",
        message: "Primary message to display",
        iconUrl: "/icon.png"
      }, function(data) {
        // alert(data);
    });
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