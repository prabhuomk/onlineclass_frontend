import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";

export default function Login({ setIsToken }) {
  const history = useHistory();
  const [email_id, setemail_id] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const handleSubmit = () => {
    setDisable(true);
    if (email_id && password) {
      let headersList = {
        "Content-Type": "application/json"
      };
      fetch("https://guvi-assign-mentor.herokuapp.com/user/login", {
        method: "POST",
        body: JSON.stringify({ email_id, password }),
        headers: headersList
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.token) {
            alert(data.message);
            localStorage.setItem("token", data.token);
            setIsToken(data.token);
            setDisable(false);
            history.push("/studentlist");
          } else {
            alert(data.message);
            setDisable(false);
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("Please enter the fields");
      setDisable(false);
    }
  };
  return (
    <div className="container-md forget-password">
      <div className="row">
        <div className="col-12">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="text-center">
                <img
                  src="https://www.freeiconspng.com/thumbs/login-icon/user-login-icon-14.png"
                  alt="login"
                  border="0"
                />
                <h2 className="text-center">Login</h2>
                <div autocomplete="off" className="form">
                  <br />
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        placeholder="email_id"
                        className="form-control"
                        type="text"
                        value={email_id}
                        onChange={(e) => setemail_id(e.target.value)}
                      />
                    </div>
                    <br />
                    <div className="input-group">
                      <input
                        placeholder="Password"
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    {disable === false ? (
                      <input
                        className="btn btn-lg btn-primary btn-block"
                        value="Login"
                        type="button"
                        onClick={handleSubmit}
                      />
                    ) : (
                      <div
                        className="spinner-border text-danger"
                        role="status"
                      ></div>
                    )}
                  </div>
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={() => history.push("/signup")}
                >
                  Signup
                </button>
                <button
                  className="btn btn-danger ml-4"
                  onClick={() => history.push("/forgetpassword")}
                >
                  Forgot Password
                </button>
                <div>DEMO</div>
                <div>
                  <b>email_id</b>= pk@gmail.com
                </div>
                <div>
                  <b>password</b>= pk007
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
