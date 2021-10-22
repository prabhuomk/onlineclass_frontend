import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export function StudentList() {
  const [allStudents, setAllStudents] = useState([]);
  const [change, setChange] = useState(false);
  const history = useHistory();

  function loadUsers() {
    fetch("https://guvi-assign-mentor.herokuapp.com/user/studentList", {
      method: "GET"
    })
      .then((data) => data.json())
      .then((result) => setAllStudents(result));
  }

  useEffect(() => {
    loadUsers();
  }, [change]);

  function DeleteStudent(Student_id) {
    fetch(
      `https://guvi-assign-mentor.herokuapp.com/user/students/${Student_id}`,
      {
        method: "DELETE"
      }
    )
      .then((data) => data.json())
      .then((data) => setChange(true));
  }

  return (
    <div className="TableList">
      <h3>Student List</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Student Name</th>
            <th scope="col">Students_id</th>
            <th scope="col">Mentor Assigned(Mentor_id)</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {allStudents.length ? (
            allStudents.map((students, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{students.Student_name}</td>
                <td>{students.Student_id}</td>
                <td>
                  {students.Mentor_id || "-"}
                  {students.Mentor_id ? (
                    <i
                      class="fa fa-pencil"
                      aria-hidden="true"
                      style={{ cursor: "pointer" }}
                      onClick={() => history.push("./edit")}
                    ></i>
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  <i
                    class="fa fa-trash"
                    aria-hidden="true"
                    style={{ cursor: "pointer" }}
                    onClick={() => DeleteStudent(students.Student_id)}
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
                <h2 className="text-center">Loading...</h2>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
