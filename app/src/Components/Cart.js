import './Cart.css';

export default function Cart({ cart, deleteCart, setShowCart }) {

  const handleCloseCart = () => {
    setShowCart(false);
  }

  return (
    <div className="cart">


      <div className="cart-header">
        <span>Varukorg</span>
        <button className="btn close" onClick={handleCloseCart}>
          <span className="material-symbols-outlined">
            close
          </span>
        </button>
      </div>

      {cart != null
        ? <div>
          <button onClick={deleteCart}>
            <span>Töm varukorgen</span>
            <span className="material-symbols-outlined">
              delete
            </span>
          </button>
          {cart.Items.length > 0 && cart.Items.map(item =>
            <div key={item.Id} className="cart-item">
              <div>{item.Id}</div>
              <div>{item.Quantity}</div>
            </div>)}
          <div>{cart.Total}</div>
        </div>
        : <div>Din varukorg är tom</div>
      }

    </div>
  )
}