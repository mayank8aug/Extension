(this.webpackJsonpreact=this.webpackJsonpreact||[]).push([[0],{18:function(e,t,a){e.exports=a(42)},40:function(e,t,a){},41:function(e,t,a){},42:function(e,t,a){"use strict";a.r(t);var n=a(2),r=a(3),l=a(6),i=a(4),c=a(7),o=a(0),s=a.n(o),u=a(17),m=a(5),d=a.n(m),f=(a(40),function(e){var t=e.OrderData,a=e.localizationConfig,n=void 0===a?{}:a;return s.a.createElement("div",{classname:""},t.map((function(e,t){return s.a.createElement("div",{className:"order-box",key:e.id},s.a.createElement("div",{className:"order-items"},e.items.map((function(e){return s.a.createElement(s.a.Fragment,{key:e.id},s.a.createElement("div",{className:"display-flex item",key:e.id},s.a.createElement("div",{style:{width:"40%"}},s.a.createElement("img",{src:e.thumbnail,width:"162",height:"76",alt:e.name})),s.a.createElement("div",{style:{width:"60%"},className:"display-flex flex-direction-column info"},s.a.createElement("span",null,n.LABEL_BRAND," : ",e.brandName),Boolean(e.modelName)&&s.a.createElement("span",null,"Model : ",e.modelName),s.a.createElement("span",null,e.name),s.a.createElement("span",null,"Product ID : ",e.productId),e.sellerLabel&&""!==e.sellerLabel&&s.a.createElement("span",null,e.sellerLabel))))}))))})))});var p=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(l.a)(this,Object(i.a)(t).call(this,e))).state={orderData:""},a}return Object(c.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this;d.a.get("https://api.lenskart.com/v3/orders?page=0&page-size=2",{headers:{"x-api-client":"desktop","x-session-token":"1c9119a9-d999-4f71-a00a-4fa0b7b3530e"}}).then((function(t){var a=t.data.result&&t.data.result.orders;e.setState({orderData:a})}))}},{key:"render",value:function(){var e=this.state.orderData,t=this.props.localizationConfig;return s.a.createElement("div",{className:"my-extension"},e&&s.a.createElement(f,{OrderData:e,localizationConfig:t}))}}]),t}(o.PureComponent),h=(a(41),function(e){function t(){var e;return Object(n.a)(this,t),(e=Object(l.a)(this,Object(i.a)(t).call(this))).state={name:"React"},e}return Object(c.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e,t=this;try{e=navigator.language.split("-")[0]}catch(a){e="en"}d.a.get("/localization/lang_".concat(e,".json")).then((function(e){t.setState({localizationConfig:e.data})}))}},{key:"render",value:function(){var e=this.state.localizationConfig;return s.a.createElement("div",null,s.a.createElement(p,{localizationConfig:e}))}}]),t}(o.Component));Object(u.render)(s.a.createElement(h,null),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.42c10403.chunk.js.map