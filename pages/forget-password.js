
import { useState,useContext, useEffect, } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import {SyncOutlined} from '@ant-design/icons';
import Link from 'next/link';
import { Context } from "../context";
import {useRouter} from 'next/router';



const ForgetPassword=()=>{
    const [email,setEmail]=useState('')
    const [success,setSuccess]=useState(false)
    const [code,setCode]=useState('')
    const [newpassword,setNewPassword]=useState('')
    const [loading,setLoading]=useState(false)

    //context
    const {state:{user},}=useContext(Context);

    //router
    const router=useRouter();


    useEffect(()=>{
        if(user!==null) router.push('/')

    },[user])


    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            setLoading(true);
            const {data}=await axios.post('/api/forget-password',{email:email});
            setSuccess(true);
            toast(`Check your email ${email}`)
            
            setLoading(false);
        }
        catch(err){
            setLoading(false)
            console.log(err.response.data)
        }

    }


    const resetPassword=async(e)=>{
        e.preventDefault()
        try{
            setLoading(true);

            const {data}=await axios.post('/api/reset-password',{email,code,newpassword});
            toast(`Password Reset successifully`)

            setCode('')
            setEmail('')
            setNewPassword('')
            setSuccess(false)


            setLoading(false)
    


        }
        catch(err){
            console.log(err);
            setLoading(false)
        }
    }



    return(<>
        
        <h1 className="jumbotron text-center bg-primary square">
            Forget password
        </h1>
        <div className="container col-md-4 offset-md-4 pb-5" >
            <form onSubmit={success? resetPassword: handleSubmit}>
                <input
                type="email"
                className=" row from-control mb-4 p-4"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                placeholder="Enter email"
                required
                />
                {success &&(<>
                                    <input
                                    type="text"
                                    className=" row from-control mb-4 p-4"
                                    value={code}
                                    onChange={(e)=>{setCode(e.target.value)}}
                                    placeholder="Enter your code"
                                    required
                                    />

                                    <input
                                    type="password"
                                    className=" row from-control mb-4 p-4"
                                    value={newpassword}
                                    onChange={(e)=>{setNewPassword(e.target.value)}}
                                    placeholder="Enter New password"
                                    required
                                    />
                                    </>
                                    
                )}
                <br/>
                <button className=" row btn btn-primary btn-block"
                disabled={loading||!email}
                >
                    {loading? < SyncOutlined spin/>:"Submit"}
                </button>

            </form>

        </div>
        
        </>)


}

export default ForgetPassword;