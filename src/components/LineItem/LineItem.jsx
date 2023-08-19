import './LineItem.css';

export default function LineItem({lineItem, isPaid, changeQty}) {
    const item = lineItem.item;
    return (
        <div className="LineItem">
            <div className="emoji flex-ctr-ctr">{item.emoji}</div>
            <div className="name">{item.name}</div>
            <div className="qty">
                {!isPaid &&
                    <button
                        className="btn-xs"
                        // Refactor
                        onClick={() => changeQty(lineItem._id, (lineItem.qty || 0) - 1)}
                    >−</button>
                }
                <span>{lineItem.qty}</span>
                {!isPaid &&
                    <button
                        className="btn-xs"
                        // Refactor
                        onClick={() => changeQty(lineItem._id, (lineItem.qty || 0) + 1)}
                    >+</button>
                }
            </div>
            <div className="buy">
                <span>${item.price.toFixed(2)}</span>
            </div>
        </div>
    );
}