import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
const Addtodo = () => {
  const [head, setHead] = useState("Heading");
  const [desc, setDesc] = useState();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("Add");
  const [idx, setIdx] = useState();

  const mystyle = status === "Add" ? { backgroundColor: "rgb(156, 199, 235)" } : { backgroundColor: "rgb(102, 241, 234)" };

  const addtodo = useCallback((event) => {
    let id = event.target.value;
    if (head === "" || desc === "") {
      alert("Empty Heading or Description cannot make ");
    } else if (status === "Add") {
      Axios.post("http://localhost:3000/add", {
        head,
        desc,
      }).then((response) => {
        if (response.data) {
          alert("Todo Added");
          gettodo();
        } else {
          alert("Failed Server Error");
        }
      });
    } else {
      console.log(id);
      Axios.post("http://localhost:3000/update", {
        id: idx,
        head,
        desc
      }).then((response) => {
        if (response.data)
          setStatus("Add");
      })
    }
  }, [desc, head, status, idx]);

  const gettodo = () => {
    Axios.get("http://localhost:3000/getAll").then((response) => {
      if (response.data) {
        let raw = response.data;
        setData(raw);
      }
    });
  };

  const deltodo = (event) => {
    let id = event.target.value;
    Axios.post("http://localhost:3000/del", {
      id
    }).then((response) => {
      console.log(response.data);
      gettodo();
    })
  }

  const comptodo = (event) => {
    let id = event.target.value;
    Axios.post("http://localhost:3000/comp", {
      id
    }).then((response) => {
      console.log(response.data);
    })
  }

  const updatetodo = (event) => {
    setStatus("Update");
    setIdx(event.target.value);
  }

  const comment = (event) => {
    let id = event.target.value;
    const cmnt = prompt("Type Your Comment");
    Axios.post("http://localhost:3000/comment", {
      id,
      cmnt
    }).then((response) => {
      console.log(response.data);
    })
  }

  useEffect(() => {
    gettodo();
  }, [addtodo]);


  return (
    <>
      <div className="todowrite">
        <div className="todoformbody" style={mystyle}>
          <input
            type="text"
            name="heading"
            placeholder={head}
            id="heading"
            className="todoheading"
            required
            onChange={(event) => {
              setHead(event.target.value);
            }}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            id="description"
            className="tododescription"
            required
            onChange={(event) => {
              setDesc(event.target.value);
            }}
          />
          <button className="addtodo" onClick={addtodo}>
            {status}
          </button>
        </div>
      </div>

      <h1>Todo List</h1>
      <div className="todolist">
        {data.map((val, key) => {
          return (
            <div className="todolistbody">
              <h3 className="tol">Status:{val.status}</h3>
              <h3 className="tol">Heading:{val.head}</h3>
              <h3 className="tol" style={{ wordWrap: "break-word" }}>Description:{val.desc}</h3>
              <h3 className="tol">Comments:{val.cmnt}</h3>
              <div className="options">
                <button
                  className="deltodo"
                  onClick={deltodo}
                  value={val._id}
                  style={{ backgroundColor: "rgb(248, 163, 163)" }}
                >
                  Delete
                </button>
                <button
                  className="deltodo"
                  onClick={updatetodo}
                  value={val._id}
                  style={{ backgroundColor: "rgb(102, 158, 241)" }}
                >
                  Update
                </button>
                <button
                  className="deltodo"
                  onClick={comment}
                  value={val._id}
                  style={{ backgroundColor: "rgb(102, 241, 234)" }}
                >
                  Comments
                </button>
                <button
                  className="deltodo"
                  onClick={comptodo}
                  value={val._id}
                  style={{ backgroundColor: "rgb(102, 241, 234)" }}
                >
                  Done
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Addtodo;
