import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar } from "@mui/material";
import Bars from 'react-loading-icons/dist/esm/components/bars';


const Teachers = (props) => {
  // const rows = [
  //   {
  //     sn: 1,
  //     name: "Rishi Marseni",
  //     img: "../../../assets/Images/userprofile.jpg",
  //     phone: 9810319562,
  //     email: "rishi.marseni@ncit.edu.np",
  //   },
  //   {
  //     sn: 2,
  //     name: "Subash Manandhar",
  //     img: "../../../assets/Images/userprofile.jpg",
  //     phone: 9843518899,
  //     email: "subash@ncit.edu.np",
  //   },
  //   {
  //     sn: 3,
  //     name: "Niranjan Khakurel",
  //     img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
  //     phone: 9843518888,
  //     email: "principal@ncit.edu.np",
  //   },
    
  // ];
  let rows = [];
  for(let i=0; i<props.teachers.length; i++){
    rows.push({
      sn: i+1,
      name: props.teachers[i][1],
      img: "../../../assets/Images/userprofile.jpg",
      // phone: 9810319562,
      email: props.teachers[i][0],
    })
  }
  if(!rows) return <Bars class='w-5 h-5' style={{width : '20px', height:'20px'}} />;
  if(rows) return (
    <TableContainer component={Paper} className="table dark:bg-gray-200">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">S.N.</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Avatar</TableCell>
            {/* <TableCell className="tableCell">Contact</TableCell> */}
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
              {/* <TableCell className="tableCell">{row.phone}</TableCell> */}
              <TableCell className="tableCell">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Teachers;
