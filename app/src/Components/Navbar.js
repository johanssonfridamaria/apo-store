import Cart from './Cart';
import './Navbar.css';

export default function Navbar({ cart, setShowCart, showCart, deleteCart }) {

  const handleToggleCart = () => {
    setShowCart(!showCart);
  }

  return (
    <nav className='navbar'>
      <div>Apo-shop</div>
      <div className='navbar-cart'>
        <button className='btn cart-btn'
          onClick={handleToggleCart}
        >
          <span>{cart?.Total != null ? cart.Total : '0.00'}</span>
          <span className='material-symbols-outlined navbar-icon' >
            shopping_bag
          </span>
        </button>
        <div className={`shopping-cart ${showCart ? 'open' : ''}`}>
          <Cart cart={cart} deleteCart={deleteCart} toggleCart={handleToggleCart} />
        </div>
      </div>
    </nav>
  )
}