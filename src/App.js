import "./styles.css";
import { Switch, Route } from "react-router-dom";
import { Header } from "./header.js";
import { HomePage } from "./homepage.js";
import { MentorCreate } from "./mentorcreate";
import { StudentCreate } from "./studentcreate";
import AssignMentor from "./mentorassign";
import EditMentor from "./editmentor.js";
import Signup from "./signup";
import Login from "./login";
import ForgetPassword from "./forgetpassword";
import ResetPassword from "./resetpassword";
import { StudentList } from "./studentlist";
import { MentorList } from "./mentorlist";
import { useState } from "react";

export default function App() {
  const tkn = !localStorage.getItem("token") && "";
  const [isToken, setIsToken] = useState(tkn);
  return (
    <div className="App">
      <Header isToken={isToken} setIsToken={setIsToken} />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login setIsToken={setIsToken} />
        </Route>

        <Route path="/assign">
          <AssignMentor />
        </Route>
        <Route path="/edit">
          <EditMentor />
        </Route>
        <Route path="/studentlist">
          <StudentList />
        </Route>
        <Route path="/mentorlist">
          <MentorList />
        </Route>
        <Route path="/creatementor">
          <MentorCreate />
        </Route>
        <Route path="/createstudent">
          <StudentCreate />
        </Route>

        <Route path="/forgetpassword">
          <ForgetPassword />
        </Route>
        <Route path="/password-reset/:id/:token">
          <ResetPassword />
        </Route>
      </Switch>
    </div>
  );
}
