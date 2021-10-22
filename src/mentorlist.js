import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export function MentorList() {
  const [mentors, setMentors] = useState([]);
  const [change, setChange] = useState(false);
  const history = useHistory();
  function loadUsers() {
    fetch("https://guvi-assign-mentor.herokuapp.com/user/mentorData", {
      method: "GET"
    })
      .then((data) => data.json())
      .then((result) => setMentors(result));
  }

  useEffect(() => {
    loadUsers();
  }, [change]);

  function DeleteMentor(Mentor_id) {
    fetch(
      `https://guvi-assign-mentor.herokuapp.com/user/mentors/${Mentor_id}`,
      {
        method: "DELETE"
      }
    )
      .then((data) => data.json())
      .then((data) => {
        alert(data.message);
        setChange(true);
      });
  }

  return (
    <div className="TableList">
      <h4>MENTOR LIST</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Mentor Name</th>
            <th scope="col">Mentor_id</th>
            <th scope="col">No: of students</th>
            <th scope="col">Students_id</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {mentors.length ? (
            mentors.map((mentors, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{mentors.Mentor_name}</td>
                <td>{mentors.Mentor_id}</td>
                <td>{mentors.Student_id?.length || "-"}</td>
                <td>
                  {mentors?.Student_id?.map((student, index) => (
                    <>
                      <h6>{student || "Loading..."}</h6>
                    </>
                  )) || "-"}
                  {mentors.Student_id ? (
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
                    onClick={() => DeleteMentor(mentors.Mentor_id)}
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
