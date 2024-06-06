import './Cart.css';

export default function Cart({ cart, deleteCart, toggleCart }) {

  return (
    <div className="cart">
      <div className="cart-header">
        <span>Varukorg</span>
        <button className="btn icon" onClick={toggleCart}>
          <span className="material-symbols-outlined">
            close
          </span>
        </button>
      </div>

      {cart?.Items.length > 0
        ?
        <div className='cart-content'>
          <div>
            {cart.Items.map(item =>
              <div key={item.id} className="cart-item">
                <div>{item.name}</div>
                <div>x {item.quantity}</div>
                <div>{item.price} kr </div>
              </div>)}
          </div>
          <div className='cart-total'>
            <span>Total summa:</span>
            <div>{cart.ItemsTotal} kr</div>
          </div>
          <div>
            <button className="btn icon" onClick={deleteCart}>
              <span>Töm varukorgen</span>
              <span className="material-symbols-outlined">
                delete
              </span>
            </button>
          </div>
        </div>
        : <div>Din varukorg är tom</div>
      }
    </div >
  )
}