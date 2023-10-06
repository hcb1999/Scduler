import Fab from '@material-ui/core/Fab';           
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import React, { useEffect , useState } from 'react';
import './App.css';
import axios from 'axios';
import { MuiPickersUtilsProvider, DateTimePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

function AddFriend() {

    const location=useLocation();
    const {id} = location.state;
    
const [findid, setfindid] = useState('');
const [status, setstatus] = useState('');

const onChange = (event) =>{
   setfindid(event.target.value);
}
const onClick = () =>{
    axios.post('http://localhost:5000/api/test', {
        id:findid,
        
      }).then((response)=>{

          if(response.data.message){
              setstatus(response.data.message);
          } else{
              setstatus(response.data[0].name);
          }
       console.log(response);
      })
};
console.log(id);

const navigate= useNavigate();
const addfriend = () => {
   axios.post("http://localhost:5000/api/AddFriend",{
   fid:findid,   
   id:id,
   date:16,

   }).then(()=>{
    alert('등록 완료!');
    navigate(-1);
   });
}

      return(
    <div>
        <div>{findid}</div> 
          <TextField  name='find' value ={findid} onChange ={onChange} label ="연락처로 찾기" /> 
          <button onClick={onClick}>검색</button>
          <div>{status}</div> <button onClick ={addfriend}>추가</button>
   </div>

      );
}
export default AddFriend;