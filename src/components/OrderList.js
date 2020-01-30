import React from 'react';
import './Items.scss';
const OrderList = props => {
    const { OrderData, localizationConfig = {} } = props;
    const modifyData = {'ORDER_PLACED' : 'ORDER PLACED'}
    return (
        <div className="order-section">
            <div className="card-heading">Your past orders</div>
            {OrderData.map((order, index) => {
                const { trackingDetails } = order;
                return (
                    <div className="order-items" key={order.id}>
                        {
                            order.items.map(item => {
                                return (<React.Fragment key={item.id}>
                                    <div className="display-flex item" key={item.id}>
                                        <div className="image-container">
                                            <img src={item.thumbnail} alt={item.name} /></div>
                                        <div className="display-flex flex-direction-column">
                                            <div className="margin-b5">{localizationConfig.LABEL_BRAND} : {item.brandName}</div>
                                            <div className="display-flex fs12 text-gray flex-direction-column">
                                                <div className="margin-r10">{modifyData[trackingDetails[0].status]}</div>
                                                    {trackingDetails[0].status !== 'DELIVERED' ? <div className="">Expected Delivery date <span className="bold">{trackingDetails[0].details && trackingDetails[0].details[0].time}</span></div> : <div className="">{trackingDetails[0].status}</div>}
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>);
                            })
                        }
                    </div>
                );
            })
            }
        </div>
    );
}
export default OrderList;