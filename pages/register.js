
import { useState ,useEffect, useContext } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import {SyncOutlined} from '@ant-design/icons';
import Link from 'next/link';
import { Context } from "../context";
import {useRouter} from 'next/router';
const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [loading,setLoading]=useState(false)

    const {state:{user}}=useContext(Context)


    const router=useRouter();

    useEffect(()=>{
        if(user!==null) {router.push('/')}
    },[user])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
             const {data}=await axios.post(`https://udemybackends.herokuapp.com/api/register`,
                {
                    name: name, email: email, password: Password
                })
                console.log(data)
                setLoading(false)
                toast.success("Regiser sucess. please login")
                router.push('/login');

        } 
        catch (err) {
            toast.error(err.response.data)
            console.log(err)
            setLoading(false)

        }

    }

    return (
        <>
            <h1 className="jumbotron text-center bg-primary square">Register</h1>
            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input type="text" className="form-control mb-4 p-4"
                        value={name} onChange={(e) => setName(e.target.value)}
                        placeholder='user name'
                        required />
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
                    disabled={!name ||!email||!Password||loading}>{loading ? <SyncOutlined spin/>: "Submit"}</button>
                    

                </form>
                <p className="text-center p-3">Already registser ? 
                <Link href='/login'><a>Login</a></Link>
                </p>

            </div>
        </>
    )
}
export default Register;