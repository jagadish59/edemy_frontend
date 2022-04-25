import {useContext, useEffect } from  'react';
import {Context} from '../../context';
import {SyncOutline} from '@ant-design/icons';
import axios from 'axios';



const StripeCallback=()=>{
    const {state:{user},dispatch}=useContext(Context);
    useEffect(()=>{
        if (user){
            axios.post("api/get-account-status").then((res)=>{
                // console.log(res)
                dispatch({
                    type:'LOGIN',
                    payload:res.data
                    
                });
                window.localStorage.setItem("user",JSON.stringify(res.data));
                window.location.href="/instructor"

            })
        }
    },[user])
    return(
        <SyncOutline spin
        className='d-flex justify-content-center display-1 text-denger p-5'/>
    )
}