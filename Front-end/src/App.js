import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  let [students, setStudents] = useState({
    name: "",
    surname: "",
    email: "",
    contact: ""
  });

  let [studentsData, setStudentsData] = useState([])
  let [id, setID] = useState(undefined)

  function handleChange(e) {
    // console.log(e.target.id);
    setStudents({ ...students, [e.target.id]: e.target.value })
  };

  function handleSubmit(e) {
    e.preventDefault();
    // alert("hii")
    // console.log(students);

    if (id === undefined) {
    axios.post("http://localhost:8080/students", students)
      .then((res) => {
        console.log(res.data.data);
        loadData()
      })
    } else {
    axios.put(`http://localhost:8080/students/${id}`, students)
      .then((res) => {
        console.log(res.data);
        loadData();
        setStudents({
          name: "",
          surname: "",
          email: "",
          contact: ""
        })
        setID(undefined)

      })
    }
  };

  function loadData() {
    axios.get("http://localhost:8080/students")
      .then((res) => {
        console.log(res.data.data);
        setStudentsData(res.data.data)
      })
  };

    

  useEffect(() => {
    loadData()
  }, []);

  function handleDelete(id) {

    // alert(id)
    axios.delete(`http://localhost:8080/students/${id}`)
      .then((res) => {
        console.log(res.data);
        loadData();

      }).catch((err) => {
        console.log(err)
      }
      )
  };

  function handleUpdate(id) {
    setID(id)
    axios.get("http://localhost:8080/students/" + id)
      .then((res) => {
        console.log(res.data);
        loadData()

        setStudents({
          name: res.data.name,
          surname: res.data.surname,
          email: res.data.email,
          contact: res.data.contact
        })
      })
  };

  return (
    <>
      <div className='container'>
        <div className='row mt-1'>
          <div className='col-lg-12'>
            <h2 className='mt-5' style={{ textAlign: "center" }}>CRUD with MongoDB & NodeJS</h2>
          </div>
        </div><hr />
        <div className='row mt-3'>


          <div className="col-lg-5">
            <div className='mt-4 mb-4'>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input value={students.name} onChange={handleChange} type="text" className="form-control" id="name" />

              </div>

              <div className="mb-3">
                <label className="form-label">Surname</label>
                <input value={students.surname} onChange={handleChange} type="text" className="form-control" id="surname" />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input value={students.email} onChange={handleChange} type="text" className="form-control" id="email" />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input value={students.contact} onChange={handleChange} type="text" className="form-control" id="contact" />
              </div>


              <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>


          <div className="col-lg-7">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">firstName</th>
                  <th scope="col">lastName</th>
                  <th scope="col">email</th>
                  <th scope="col">contact</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>

              {
                studentsData

                  ?

                  <tbody>

                    {

                      studentsData.map((eachvalue, i) => {
                        return (
                          <tr key={i}>
                            <th scope='row'>{i + 1}</th>
                            <td>{eachvalue.name}</td>
                            <td>{eachvalue.surname}</td>
                            <td>{eachvalue.email}</td>
                            <td>{eachvalue.contact}</td>

                            <td>
                              <button onClick={(() => handleUpdate(eachvalue._id))} className='btn btn-primary m-1'><i class="fa-solid fa-pencil"></i></button>
                              <button onClick={(() => handleDelete(eachvalue._id))} className='btn btn-danger'><i class="fa-solid fa-trash"></i></button>
                            </td>
                          </tr>
                        )
                      })
                    }


                  </tbody>

                  :

                  <div className="div">
                    <h1>No Data found...</h1>
                  </div>

              }

            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
