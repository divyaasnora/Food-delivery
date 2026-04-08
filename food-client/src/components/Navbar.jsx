import { Link,useNavigate } from "react-router-dom";

export default function Navbar() {
const navigate = useNavigate();
  const handleLogOut = ()=>{
    localStorage.removeItem("authToken");
    navigate("/loginUser");




  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1" to="/">
            GoFood
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active  fs-5" aria-current="page" href="#">
                  Home
                </Link>
              </li>
              {
                (localStorage.getItem("authToken"))?
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/">My Orders</Link>
                </li> : ""
              }
            </ul>
            {(!localStorage.getItem("authToken")) ?

            
            <div className="btn bg-white text-success mx-2">
              <Link className="nav-link" to="/login">
              Login
            </Link>

            <Link className="btn bg-white text-success mx-1" to="/createuser">
              SignUp
            </Link>

            </div>
            : 
            <div>
              <div className="btn bg-white text-success mx-2">
              MyCart
              
              </div>
            <div className="btn bg-white text-danger mx-2" onClick={handleLogOut}>
              LogOut
              </div>
              </div>
              }

            
          </div>
        </div>
      </nav>
    </div>
  );
}
