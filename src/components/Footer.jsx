import { Link } from 'react-router-dom'
export default function Footer() {
  return (<footer className="footer"><div className="container foot-in">
    <div><div className="logo light">ARTIFY</div><p>An online gallery for independent artists and the people who collect them.</p></div>
    <div><h4>Shop</h4><Link to="/gallery">Explore artwork</Link><Link to="/wishlist">Wishlist</Link><Link to="/cart">Cart</Link></div>
    <div><h4>Artists</h4><Link to="/signup">Join as an artist</Link><Link to="/dashboard">Artist dashboard</Link></div>
    <div><h4>Account</h4><Link to="/login">Log in</Link><Link to="/profile">Profile and orders</Link></div>
  </div><div className="container copy">© 2026 Artify. Demo project: no real payments are processed.</div></footer>)
}
