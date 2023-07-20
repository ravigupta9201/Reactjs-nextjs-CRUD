
"use client"
import { useState, useEffect } from 'react';
import {Form, Button, Container, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

import { MdDelete, MdEditSquare } from "react-icons/md";

import styles from "@/app/styles/application.module.css"

import Link from 'next/link';

// get the localstorage data back
const getLocalData = () => {
    const lists = localStorage.getItem("myapplication");

    if(lists){
        return JSON.parse(lists)
    }else {
        return [];
    }
} 


const Applicaton = () => {

    const [userdata, setUserdata] = useState({
        username: "",
        email: "",
        phone: "",
        dob: "",
        city: "",
        district: "",
        province: "",
        country: ""
    });

    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("")

    const handleInput = (event)=>{
        const name = event.target.name;
        const value = event.target.value
        console.log(name, value)
        setUserdata( {...userdata , [name] : value});
        // console.log(userdata)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // if(!userdata) {
            // alert("plz Fill the data")
        // }
        // else{
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: userdata,
            }
            setItems([...items, myNewInputData])
        // }
        setUserdata({
            username: "",
            email: "",
            phone: "",
            dob: "",
            city: "",
            district: "",
            province: "",
            country: ""
        })        

    }

    // how to edit item
    const editItem = (index) => {
        const edit_crud_item = items.find( (curElem) => {
            return curElem.id === index;
        })

        setUserdata(edit_crud_item.name)
        setIsEditItem(index)

    }

    // how to delete item
    const deleteItem = (index) => {
        const updatedItem = items.filter( (curElem) => {
            return curElem.id !== index
        });
        setItems(updatedItem)
    }

    // removing all the element
    const removeAll = () => {
        setItems([])
    }

    // adding localStorage
    useEffect( () => {
        localStorage.setItem("myapplication", JSON.stringify(items))
    }, [items])

  return (
    <>
      <div className={styles.main_section}>
        <Container>
            
            <h1 style={{textAlign:"center", borderBottom: "1px solid #55555", margin:"50px", padding:"20px"}}>A Simple CRUD Application</h1>

            <div style={{width:"700px" , margin:"auto"}}>
                
                <Form onSubmit={handleSubmit}>
                    <div>
                        <h3 className='alert alert-success text-center'>Application Form</h3>
                    </div>

                    <Row>

                    <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <div className="d-flex align-items-center">
                            <Form.Control type="text" placeholder="Enter Your Name" required name='username' id='username' value={userdata.username} onChange={handleInput} />
                            {/* <BiUserCircle size={30} /> */}
                        </div>
                        {/* <Form.Control type="text" placeholder="Enter Your Name" />
                        <BiUserCircle size={30} /> */}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required name='email' id='email' value={userdata.email} onChange={handleInput} />
                    </Form.Group>

                    </Col>

                    <Col>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="number" placeholder="Enter Your Phone Number" min={7} required name='phone' id='phone' value={userdata.phone} onChange={handleInput} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control type="date" placeholder="DOB" name='dob' id='dob' value={userdata.dob} onChange={handleInput}  />
                    </Form.Group>

                    </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Row>
                            <Col>
                                <Form.Control className="mb-3" type="text" placeholder="City" name='city' id='city' value={userdata.city} onChange={handleInput}  />
                                <Form.Control className="mb-3" type="text" placeholder="District" name='district' id='district' value={userdata.district} onChange={handleInput} />
                            </Col>

                            <Col>
                                <Form.Select className="mb-3" placeholder="Province" aria-label="Default select example" name='province' id='province' value={userdata.province} onChange={handleInput}>
                                    <option>Provinance</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="3">4</option>
                                    <option value="3">5</option>
                                    <option value="3">6</option>
                                    <option value="3">7</option>
                                </Form.Select>
                                {/* <Form.Control className="mb-3" type="number" min={1} max={7} placeholder="Province" />   */}
                                <Form.Control className="mb-3" type="text" placeholder="Country 🚩" defaultValue="Nepal" name='country' id='country' value={userdata.country} onChange={handleInput} />
                            </Col>
                            
                        </Row>
                    </Form.Group>
                    {/* <Link href="/dashboard"> <Button variant="primary" type='submit'>Submit</Button> </Link> */}
                    <Button variant="primary" type='submit'>Submit</Button>
                </Form>
            </div>

            <div style={{margin:"50px"}}>
                <div>
                    <h3 className='alert alert-danger text-center'>User Data</h3>
                </div>      
                <Table className='table table-striped table-hover'>
                    <thead style={{ backgroundColor:"red"}}>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Date of Birth</th>
                        <th>Address</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
            {/* <tr> */}
                            
                {items.map((curElem) => {
                    return (
                        // <div>
                        <tr key={curElem.id}>
                            <td>1</td>
                            <td>{curElem.name.username}</td>
                            <td>{curElem.name.email}</td>
                            <td>{curElem.name.phone}</td>
                            <td>{curElem.name.dob}</td>
                            <td>{curElem.name.city} {curElem.name.district} {curElem.name.province} - {curElem.name.country}</td>
                            <td>
                            <MdEditSquare onClick={ () => editItem(curElem.id)} />
                            <MdDelete onClick={()=> deleteItem(curElem.id)} />
                            </td>
                        </tr>
                        // </div>
                    )
                })}
            
            {/* </tr> */}
            
                </tbody>
                </Table>
            </div>

                {/* <Link href={`/dashboard?items=${JSON.stringify(items)}`}><Button>Click to show</Button></Link> */}
                <Link href={{ pathname: '/dashboard', query: { items: JSON.stringify(items) } }}><Button>Click to show</Button></Link>
                

        </Container>
      </div>
    </>
  )
}

export default Applicaton
