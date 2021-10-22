import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
export function Header({ isToken, setIsToken }) {
  const history = useHistory();
  const Logout = () => {
    localStorage.setItem("token", "");
    setIsToken("");
    history.push("/");
  };

  return (
    <div className="Container">
      <nav className="navbar navbar-expand sticky-top navbar-dark bg-success">
        <div
          className="collapse navbar-collapse"
          id="navbarText"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <h5 style={{ color: "white" }}>
              <b>PK's OnlineClass Data Mangement</b>
            </h5>
          </div>
          <div>
            <ul className="navbar-nav mr-auto">
              {isToken === "" ? (
                <>
                  <li className="nav-item ">
                    <Link to="/" className="nav-link active">
                      <b>HOME</b>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link to="/signup" className="nav-link active">
                      <b>SIGNUP</b>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link to="/login" className="nav-link active">
                      <b>LOGIN</b>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/studentlist" className="nav-link active">
                      <b>
                        Student <br />
                        List
                      </b>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/mentorlist" className="nav-link active">
                      <b>
                        {" "}
                        Mentor <br />
                        List
                      </b>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/createstudent" className="nav-link active">
                      <b>
                        Add <br />
                        Student
                      </b>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/creatementor" className="nav-link active">
                      <b>
                        {" "}
                        Add
                        <br /> Mentor
                      </b>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/assign" className="nav-link active">
                      <b>
                        Assign
                        <br />
                        Mentor
                      </b>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/edit" className="nav-link active">
                      <b>
                        {" "}
                        Change
                        <br />
                        Mentor
                      </b>
                    </Link>
                  </li>
                  <button onClick={Logout} color="inherit">
                    <b> Logout</b>
                  </button>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
