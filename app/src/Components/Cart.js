import './Cart.css';

export default function Cart({ cart, deleteCart, toggleCart }) {

  // const handleCloseCart = () => {
  //   setShowCart(false);
  // }

  console.log(cart)

  return (
    <div className="cart">
      <div className="cart-header">
        <span>Varukorg</span>
        <button className="btn close" onClick={toggleCart}>
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
                <div>{item.name}</div>
                <div>x {item.quantity}</div>
                <div>{item.price} kr </div>
              </div>)}
          </div>
          <div className='cart-bottom'>
            <span>Total summa:</span>
            <div>{cart.Total} kr</div>
          </div>
          <button className="btn" onClick={deleteCart}>
            <span>Töm varukorgen</span>
            <span className="material-symbols-outlined">
              delete
            </span>
          </button>
        </div>
        : <div>Din varukorg är tom</div>
      }


    </div >
  )
}