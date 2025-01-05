import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="navbar slate-100 bg-teal-100 rounded-t-lg">
        <ul>
          <div className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/product_create">Produits</Link>
          </li>
          </div>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;