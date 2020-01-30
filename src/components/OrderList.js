import React from 'react';
import './Items.scss';
const OrderList = props => {
    const { OrderData, localizationConfig = {} } = props;
    return (
        <div>
            {OrderData.map(order => {
                return (
                    <div className="order-box" key={order.id}>
                        <div className="order-items">
                            {
                                order.items.map(item => {
                                    return (<React.Fragment key={item.id}>
                                        <div className="display-flex item" key={item.id}>
                                            <div style={{ width: '40%' }}><img src={item.thumbnail} width="162" height="76" alt={item.name} /></div>
                                            <div style={{ width: '60%' }} className="display-flex flex-direction-column info">
                                                <span>{localizationConfig.LABEL_BRAND} : {item.brandName}</span>
                                                {Boolean(item.modelName) && <span>Model : {item.modelName}</span>}
                                                <span>{item.name}</span>
                                                <span>Product ID : {item.productId}</span>
                                                {item.sellerLabel && item.sellerLabel !== '' && <span>{item.sellerLabel}</span>}
                                            </div>
                                        </div>
                                    </React.Fragment>);
                                })
                            }
                        </div>

                    </div>
                );
            })
            }
        </div>
    );
}
export default OrderList;