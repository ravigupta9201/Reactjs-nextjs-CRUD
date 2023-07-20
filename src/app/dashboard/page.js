'use client'

import React from 'react'
import Link from 'next/link'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Table } from 'react-bootstrap';
import { MdEditSquare, MdDelete } from 'react-icons/md';

const Dashboard = () => {

    // const router = useRouter();
    // const { items } = router.query; // Access the "items" query parameter
  
    // useEffect(() => {
    //   // Convert the "items" query parameter back to an array using JSON.parse
    //   const parsedItems = items ? JSON.parse(items) : [];
    //   // Now you have the array of table data in "parsedItems"
    //   console.log(parsedItems);
    // }, [items]);
  





    const router = useRouter();
  // Check if router.query exists and if the 'items' property is available
  const items = router.query && router.query.items ? JSON.parse(router.query.items) : [];

  useEffect(() => {
    // Now you have the array of table data in "items"
    console.log(items);
  }, [items]);

  return (
    <div>
      <h1>Profile Dashboard</h1>

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
                    {items.map((curElem) => {
                        return (
                        <tr key={curElem.id}>
                            <td>{index + 1}</td>
                            <td>{curElem.name.username}</td>
                            <td>{curElem.name.email}</td>
                            <td>{curElem.name.phone}</td>
                            <td>{curElem.name.dob}</td>
                            <td>
                            {curElem.name.city}, {curElem.name.district}, {curElem.name.province} - {curElem.name.country}
                            </td>
                            <td>
                            <MdEditSquare />
                            <MdDelete onClick={() => deleteItem(curElem.id)} />
                            </td>
                        </tr>
                        );
                    })}
                        
                </tbody>
                </Table>
            </div>

      <Link href="/">Back to home</Link>
    </div>
  )
}

export default Dashboard
