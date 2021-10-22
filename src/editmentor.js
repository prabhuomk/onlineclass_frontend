import "./styles.css";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useHistory } from "react-router-dom";

export default function EditMentor() {
  const [mentor, setMentor] = useState("");
  const [students, setStudents] = useState("");
  const [disable, setDisable] = useState(false);
  const [allMentors, setAllMentors] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const history = useHistory();

  function loadUsers() {
    fetch("https://guvi-assign-mentor.herokuapp.com/user/mentorData", {
      method: "GET"
    })
      .then((data) => data.json())
      .then((result) => setAllMentors(result));

    fetch("https://guvi-assign-mentor.herokuapp.com/user/studentList", {
      method: "GET"
    })
      .then((data) => data.json())
      .then((result) => setAllStudents(result));
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = () => {
    setDisable(true);
    if (mentor && students) {
      assignStudents();
    } else {
      alert("Please select both options");
      setDisable(false);
    }
  };
  function assignStudents() {
    fetch(
      `https://guvi-assign-mentor.herokuapp.com/user/students/${students.value}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Mentor_id: mentor.value
        })
      }
    )
      .then((data) => data.json())
      .then((data) => {
        alert(data.message);
        setMentor("");
        setStudents("");
        setDisable(false);
      });
  }

  return (
    <div className="container mentor">
      <br />
      <h4>Change Mentor for a Student</h4>
      <div className="row">
        <div className="col-sm-12 input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="">
              Students
            </label>
          </div>
          <Select
            options={allStudents.map((student) => {
              return { value: student.Student_id, label: student.Student_id };
            })}
            name="colors"
            className="w-75 basic-multi-select"
            classNamePrefix="select"
            onChange={(e) => setStudents(e)}
            value={students}
          />
        </div>
        <div className=" col-sm-12 input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="">
              Mentor
            </label>
          </div>
          <Select
            options={allMentors.map((mentor) => {
              return { value: mentor.Mentor_id, label: mentor.Mentor_id };
            })}
            name="colors"
            className="w-75 basic-multi-select"
            classNamePrefix="select"
            onChange={(e) => setMentor(e)}
            isClearable
            value={mentor}
          />
        </div>
        <div className="col-sm-2 input-group mb-3">
          {disable === false ? (
            <button className="btn btn-primary" onClick={handleSubmit}>
              Assign
            </button>
          ) : (
            <div className="spinner-border text-danger" role="status"></div>
          )}
        </div>
      </div>
    </div>
  );
}
