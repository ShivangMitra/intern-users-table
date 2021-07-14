import React, { useEffect, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, TextField } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import axios from 'axios'

import './userContainer.css'

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

function UserContainer() {

    const classes = useStyles();

    const nameRef = useRef()
    const usernameRef = useRef()
    const emailRef = useRef()
    const phoneRef = useRef()
    const websiteRef = useRef()

    const editNameRef = useRef()
    const editUsernameRef = useRef()
    const editEmailRef = useRef()
    const editPhoneRef = useRef()
    const editWebsiteRef = useRef()

    const [users, setUsers] = useState([])
    const [editui, setEditui] = useState(false)
    const [indexOfEdit, setIndexOfEdit] = useState(-1)

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                setUsers(response.data);
            })
            .catch(err => {
                console.log("ERROR lamao: ", err)
            })
    }, [])

    function addUser(){

        setUsers([
            
            {
              id: users[users.length - 1].id + 1,
              email: emailRef.current.value,
              name: nameRef.current.value,
              phone: phoneRef.current.value,
              website: websiteRef.current.value,
              username: usernameRef.current.value
            },
            ...users
          ]);
    }

    function deleteUser(id){
        let index = -1

        let i = 0
        for(i=0;i<users.length;i++){
            if(users[i].id === id){
                index = i;
                break;
            }
        }

        if (index > -1) {
            users.splice(index, 1);
        }

        setUsers([
            ...users
          ]); 
    }

    function editUser(id){
        setIndexOfEdit(id)
        setEditui(true)
    }

    function updateUser(id){
        let index = -1

        let i = 0
        for(i=0;i<users.length;i++){
            if(users[i].id === id){
                index = i;
                break;
            }
        }

        if (index > -1) {
            users[index].name = editNameRef.current.value;
            users[index].username = editUsernameRef.current.value;
            users[index].email = editEmailRef.current.value;
            users[index].phone = editPhoneRef.current.value;
            users[index].website = editWebsiteRef.current.value;
        }

        setUsers([
            ...users
          ]); 
        
        setEditui(false)
    }

    if(editui){
        return (
            <div>
                <h1>Edit User on Table</h1>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Username</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Phone</TableCell>
                            <TableCell align="left">Website</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {users.map((user) => {
                            if(user.id === indexOfEdit){
                                return(
                                    <TableRow key={user.id}>
                                    <TableCell component="th" scope="row">
                                    <TextField id="standard-basic" label="Name" inputRef={editNameRef} defaultValue={user.name} />
                                    </TableCell>
                                    <TableCell align="left"><TextField id="standard-basic" label="Username" inputRef={editUsernameRef} defaultValue={user.username} /></TableCell>
                                    <TableCell align="left"><TextField id="standard-basic" label="Email" inputRef={editEmailRef} defaultValue={user.email} /></TableCell>
                                    <TableCell align="left"><TextField id="standard-basic" label="Phone" inputRef={editPhoneRef} defaultValue={user.phone} /></TableCell>
                                    <TableCell align="left"><TextField id="standard-basic" label="Website" inputRef={editWebsiteRef} defaultValue={user.website} /></TableCell>
                                    <TableCell align="left"><Button color="secondary" onClick={() => updateUser(user.id)} >Save</Button></TableCell>
                                    </TableRow>
                                )
                            }
                            else{
                                return(
                                    <TableRow key={user.id}>
                                    <TableCell component="th" scope="row">
                                        {user.name}
                                    </TableCell>
                                    <TableCell align="left">{user.username}</TableCell>
                                    <TableCell align="left">{user.email}</TableCell>
                                    <TableCell align="left">{user.phone}</TableCell>
                                    <TableCell align="left">{user.website}</TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                        </TableBody>
                    </Table>
                    </TableContainer>
            </div>
        )
    }
    else{
        return (
            <div>
                <h1>Users Table</h1>
                <div className="input-container">
                    <TextField id="standard-basic" label="Name" inputRef={nameRef} />
                    <TextField id="standard-basic" label="Username" inputRef={usernameRef} />
                    <TextField id="standard-basic" label="Email" inputRef={emailRef} />
                    <TextField id="standard-basic" label="Phone" inputRef={phoneRef} />
                    <TextField id="standard-basic" label="Website" inputRef={websiteRef} />
                    <Button variant="contained" color="primary" onClick={addUser} >Add User</Button>
                </div>

                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Username</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Phone</TableCell>
                            <TableCell align="left">Website</TableCell>
                            <TableCell align="left">Delete User</TableCell>
                            <TableCell align="left">Edit/Update User</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                            <TableCell component="th" scope="row">
                                {user.name}
                            </TableCell>
                            <TableCell align="left">{user.username}</TableCell>
                            <TableCell align="left">{user.email}</TableCell>
                            <TableCell align="left">{user.phone}</TableCell>
                            <TableCell align="left">{user.website}</TableCell>
                            <TableCell align="left"><Button color="secondary" onClick={() => deleteUser(user.id)} >Delete</Button></TableCell>
                            <TableCell align="left"><Button color="primary" onClick={() => editUser(user.id)} >Edit/Update</Button></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
            </div>
        )
    } 

}

export default UserContainer
