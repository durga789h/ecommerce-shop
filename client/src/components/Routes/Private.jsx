import{useState,useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import Spinner from '../Spinner';
export default function PrivateRoute(){
    const[ok,setOK]=useState(false);
    const {auth}=useAuth();
    useEffect(()=>{
        const authCheck=async()=>{
            const res=await axios.get('http://localhost:8000/api/user-auth')
             
            if(res.data.ok){
                setOK(true)
            }
            else{
                setOK(false)
            }
        }
        if(auth?.token) authCheck()
     
    },[auth?.token])
    return ok ?<Outlet></Outlet>:<Spinner/>
}