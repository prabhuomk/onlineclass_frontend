import { useState } from "react";
import { useHistory } from "react-router-dom";

export function StudentCreate() {
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [disable, setDisable] = useState(false);
  const history = useHistory();

  function CreateStudent(event) {
    event.preventDefault();
    setDisable(true);
    if (studentName && studentId) {
      fetch("https://guvi-assign-mentor.herokuapp.com/user/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Student_name: studentName,
          Student_id: studentId
        })
      })
        .then((data) => data.json())
        .then((data) => {
          alert(data.message);
          setStudentName("");
          setStudentId("");
          setDisable(false);
          history.push("/studentlist");
        });
    } else {
      alert("enter the field");
      setDisable(false);
    }
  }
  return (
    <div>
      <h3>Add Student</h3>
      <form className="Myform">
        <div className="form-group">
          <label for="exampleInputEmail1">Student Name</label>
          <input
            type="text"
            onChange={(event) => setStudentName(event.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Student Id</label>
          <input
            type="text"
            onChange={(event) => setStudentId(event.target.value)}
            className="form-control"
            id="exampleInputPassword1"
          />
          <small id="emailHelp" className="form-text text-muted">
            eg: Zen_1
          </small>
        </div>
        {disable === false ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={CreateStudent}
          >
            Submit
          </button>
        ) : (
          <div className="spinner-border text-danger" role="status"></div>
        )}
      </form>
      <br />
      <br />
      <br />
    </div>
  );
}
