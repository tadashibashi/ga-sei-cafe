import './OrderDetail.css';
import LineItem from "../LineItem/LineItem";

export default function OrderDetail({order, changeQty, handleCheckout}) {
  return (
    <div className="OrderDetail">
      <div className="section-heading">
          <span>New Order</span> {order && <span>{new Date(order.updatedAt).toLocaleDateString()}</span>}
      </div>
        { order && order.lineItems.map(item => <LineItem changeQty={changeQty} key={"lineItem-" + item._id} lineItem={item} isPaid={order.isPaid} />) }
        <button
            className="btn-sm"
            onClick={handleCheckout}
            disabled={!order || !order.lineItems.length}
            >
            CHECKOUT
        </button>
    </div>
  );
}
