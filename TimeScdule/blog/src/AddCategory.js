import TextField from '@material-ui/core/TextField';
import React, { useEffect , useState } from 'react';
import './App.css';
import axios from 'axios';
import { MuiPickersUtilsProvider, DateTimePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

function AddCategory() {

    const location=useLocation();
    const {id} = location.state;
    
const [cate, setcate] = useState('');

const onChange = (event) =>{
   setcate(event.target.value);
}
const navigate= useNavigate();
console.log(id);
console.log(cate);

const addcate = () => {
   axios.post("http://localhost:5000/api/AddCategory",{ 
   id:id,
   cate:cate,
   catecolor:16,
   madetime:16,
   }).then(()=>{
    alert('등록 완료!');
    navigate(-1);
   });
}

      return(
    <div>
        <div>{cate}</div> 
          <TextField  name='find' value ={cate} onChange ={onChange} label ="카테고리 만들기" /> 
          <button onClick ={addcate}>추가</button>
   </div>

      );
}
export default AddCategory;