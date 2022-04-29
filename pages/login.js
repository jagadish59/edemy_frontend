
import { useState,useContext, useEffect, } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import {SyncOutlined} from '@ant-design/icons';
import Link from 'next/link';
import { Context } from "../context";
import {useRouter} from 'next/router';
const Login = () => {

    const [email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [loading,setLoading]=useState(false)


    const router=useRouter();
    //state
    console.log("contxt",Context)
    const {state:{user},dispatch}=useContext(Context);
    

    useEffect(()=>{
        if(user!==null) {router.push('/')}

    },[user])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
             const {data}=await axios.post(`http://udemybackends.herokuapp.com/api/login`,
                {
                 email: email, password: Password
                })
                console.log(data)
                setLoading(false)
                toast.success(" sucessfully login")

                console.log("user",data)
                console.log('called');

                dispatch({
                    type:"LOGIN",
                    payload:data
                })
                // savein local storage
                window.localStorage.setItem('user',JSON.stringify(data))
                // redirect
                // router.push('/user');
            }
        catch (err) {
            toast.error(err.response.data)
            console.log(err)
            setLoading(false)

        }

    }

    return (
        <>
            <h1 className="jumbotron text-center bg-primary square">Login</h1>
            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>

                    <input type="email" className="form-control mb-4 p-4"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        required />
                    <input type="password" className="form-control mb-4 p-4"
                        value={Password} onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        required />
                    <br />

                    <button type="submit" className="btn btn-block btn-primary " 
                    disabled={!Password||loading}>{loading ? <SyncOutlined spin/>: "Submit"}</button>
                    

                </form>
                <p className="text-center pt-3">You don't  registser here. 
                <Link href='/register'><a>Regiser</a></Link>
                </p>
                <p className="text-center pt-2">

                <Link href='/forget-password'><a className="text-danger">Forget password</a></Link>
                </p>

            </div>
        </>
    )
}
export default Login;