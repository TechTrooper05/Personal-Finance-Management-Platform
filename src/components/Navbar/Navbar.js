import logo from "./FinTrack-Logo.png";
import "./Navbar.css";

function Navbar({page, setPage}) {
  function updatePage(newPage){
    setPage(newPage);
  }
  return (
    <div className="navbar">
      <div className="elements">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo"/>
        </div>
        <button className="dashboard" onClick={()=>updatePage("Dashboard")}>Dashboard</button>
        <button className="transactions" onClick={()=>updatePage("Transactions")}>Transactions</button>
        <button className="analytics" onClick={()=>updatePage("Analytics")}>Analytics</button>
      </div>
    </div>
  );
}

export default Navbar;