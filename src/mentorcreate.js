import { useState } from "react";
import { useHistory } from "react-router-dom";

export function MentorCreate() {
  const [mentorName, setMentorName] = useState("");
  const [mentorId, setMentorId] = useState("");
  const history = useHistory();
  const [disable, setDisable] = useState(false);
  function CreateMentor(event) {
    setDisable(true);
    if (mentorName && mentorId) {
      event.preventDefault();
      fetch("https://guvi-assign-mentor.herokuapp.com/user/mentor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Mentor_name: mentorName, Mentor_id: mentorId })
      })
        .then((data) => data.json())
        .then((data) => {
          alert(data.message);
          setMentorName("");
          setMentorId("");
          setDisable(false);
          history.push("./mentorlist");
        });
    } else {
      alert("enter the field");
      setDisable(false);
    }
  }

  return (
    <div>
      <h3>Add Mentor</h3>
      <form className="Myform">
        <div className="form-group">
          <label for="exampleInputEmail1">Mentor Name</label>
          <input
            type="text"
            onChange={(event) => setMentorName(event.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Mentor Id</label>
          <input
            type="text"
            onChange={(event) => setMentorId(event.target.value)}
            className="form-control"
            id="exampleInputPassword1"
          />
          <small id="emailHelp" className="form-text text-muted">
            eg: Guvi_1
          </small>
        </div>
        {disable === false ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={CreateMentor}
          >
            Submit
          </button>
        ) : (
          <div className="spinner-border text-danger" role="status"></div>
        )}
      </form>
    </div>
  );
}
