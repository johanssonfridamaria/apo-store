import './Cart.css';

export default function Cart({ cart, deleteCart, setShowCart }) {

  const handleCloseCart = () => {
    setShowCart(false);
  }

  console.log('cart', cart)

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

      {cart?.Items.length > 0
        ?
        <div className='cart-content'>
          <div className='cart-items'>
            {cart.Items.map(item =>
              <div key={item.Id} className="cart-item">
                <div>id: {item.Id}</div>
                <div>X {item.Quantity}</div>
              </div>)}
          </div>
          <button className="btn" onClick={deleteCart}>
            <span>Töm varukorgen</span>
            <span className="material-symbols-outlined">
              delete
            </span>
          </button>
          <div className='cart-bottom'>
            <span>Total summa:</span>
            <div>{cart.Total} kr</div>
          </div>
        </div>
        : <div>Din varukorg är tom</div>
      }


    </div >
  )
}