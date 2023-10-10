import React, {useEffect, useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar } from "@mui/material";
import Bars from 'react-loading-icons/dist/esm/components/bars';


const Students = (props) => {

  // useEffect(() => {
  //   console.log("Students in students component", props.students)
  // },[props.students])

  // const convertArrayToObject = (arr) => {
  //   if (arr.length === 0) return {}; // Return an empty object if the array is empty
  //   const [email, number] = arr[0]; // Destructure the values from the array
  //   return { email, number }; // Create an object with meaningful keys
  // };

  // const convertedObject = convertArrayToObject(props.students);



  // const rows = [
  //   {
  //     sn: 1,
  //     name: "Suman Kc",
  //     img: "../../../assets/Images/userprofile.jpg",
  //     sem: "6",
  //     roll: 191650,
  //     email: "suman.191650@ncit.edu.np",
  //   },
  //   {
  //     sn: 2,
  //     name: "Arun Bikram Khatri",
  //     img: "../../../assets/Images/userprofile.jpg",
  //     sem: "6",
  //     roll: 191610,
  //     email: "suman.191650@ncit.edu.np",
  //   },
  //   {
  //     sn: 3,
  //     name: "Rikesh Silwal Khatri",
  //     img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
  //     sem: "4",
  //     roll: 191634,
  //     email: "rikesh.191634@ncit.edu.np",
  //   },
    
  // ];

  let rows = [];
  for(let i=0; i<props.students.length; i++){
    rows.push({
      sn: i+1,
      name: props.students[i][2],
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      sem: 6,
      roll: props.students[i][1],
      email: props.students[i][0],
    })
  }
  // let count = 0;
  // const rows = props.students.map(([email, roll]) => ({
  //   sn : ++count,
  //   email,
  //   roll,
  //   img: "../../../assets/Images/userprofile.jpg",
  // }));
  if(!rows) return <Bars class='w-5 h-5' style={{width : '20px', height:'20px'}} />;
  if(rows) return (
    <TableContainer component={Paper} className="table dark:bg-gray-200">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">S.N.</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Avatar</TableCell>
            <TableCell className="tableCell">Semester</TableCell>
            <TableCell className="tableCell">Roll</TableCell>
            <TableCell className="tableCell">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.sn}>
              <TableCell className="tableCell">{row.sn}</TableCell>
              <TableCell className="tableCell">{row.name}</TableCell>
              <TableCell className="tableCell">
                <Avatar src={row.img} />
              </TableCell>
              <TableCell className="tableCell">{row.sem}</TableCell>
              <TableCell className="tableCell">{row.roll}</TableCell>
              <TableCell className="tableCell">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Students;

