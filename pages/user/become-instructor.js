import axios from 'axios';
import {Context} from '../../context';
import {Button} from 'antd';
import {
    AppstoreOutlined,LoginOutlined,UserAddOutlined,LogoutOutlined, 
    CoffeeOutlined,CarryOutOutlined,TeamOutlined, UserSwitchOutlined, SettingFilled
} from '@ant-design/icons';
import { toast } from 'react-toastify';
import UserRoute from '../../components/routes/UserRoute';
import { useContext, useState } from 'react';
 

const BecomeInstructor=()=>{




    const [loading,setLoading]=useState(false);
    const {state:{user},}=useContext(Context);


    const becomeInstructor=()=>{
        setLoading(true)
        axios.post('/api/make-instructor').then(res=>{
            console.log(res)
            window.location.href=res.data;
        })
        .catch(err=>{
            console.log(err.response.status)
            toast('Stripe onbording failed try again ')
            setLoading(false);
        })
    }

    return(<>
    <h1 className='jumbotron  text-center square'>BecomeInstructor cource</h1>
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 text-center'>
                <div className='pd-4'>
                    <UserSwitchOutlined className='display-1 pb-3'/>
                    <br/> 
                    <h2> Setup payout public classs cources on edemy</h2>
                    <p className='lead text-warning'> Edemy partner  partner with strip to transfer earning to you bank  account</p>

                    <Button
                    className='mb-3'
                    type='primary'
                    block
                    shape='round'
                    icon={loading?<LoginOutlined/>:<SettingFilled/>}
                    size='large'
                    onClick={becomeInstructor}
                    disabled={user&&user.role&&user.role.includes("Instructor")||loading}

                    >

                        {loading?"Processing..?":"payout"}

                    </Button>
                    <p className='lead'> You will be redirected to stripe to complete onboarding process </p>

                </div>


            </div>
        </div>

    </div>
    
    </>)
}

export default BecomeInstructor;