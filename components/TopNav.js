import {Menu} from 'antd'
import Link from 'next/link';
import { useEffect,useState,useContext } from 'react';
const {Item ,SubMenu,ItemGroup}=Menu;
import {
    AppstoreOutlined,LoginOutlined,UserAddOutlined,LogoutOutlined, CoffeeOutlined,CarryOutOutlined,TeamOutlined
} from '@ant-design/icons';

import { toast } from 'react-toastify';
import { Context } from '../context';
import axios from 'axios';
import { useRouter } from 'next/router';

const TopNav=()=>{ 
    const [current,setCurrent]=useState("")
    const {state,dispatch}=useContext(Context);
    const route =useRouter();
    const {user}=state;

    useEffect(()=>{
        process.browser && setCurrent(window.location.pathname)
        console.log(window.location.pathname);
    },[process.browser && window.location.pathname])

    const  logout=async()=>{
        dispatch({type:"LOGOUT"})
        window.localStorage.removeItem('user');
        const {data}=await axios.get('https://udemybackends.herokuapp.com/api/logout');
        toast(data.message);
        route.push('/login');


    }
    return(
        <>
        <Menu mode="horizontal" selectedKeys={[current]}  className='mb-2'>
            <Item  icon={<AppstoreOutlined />}
            onClick={(e)=>{setCurrent(e.key)}}

            key="/"
            >
                <Link href='/'>
                    <a>
                        App
                    </a>
                </Link>

            </Item>

        {user && user.role && !user.role.includes("Instructor")?(
                            <Item  icon={<CarryOutOutlined />}
                            onClick={(e)=>{setCurrent(e.key)}}
    
                            key="/instructor/course/create"
                >
                    <Link href='/instructor/course/create'>
                        <a>
                            Creat course
                        </a>
                    </Link>
    
                </Item>


        ):
        
        
        (
            <Item  icon={<TeamOutlined />}
            onClick={(e)=>{setCurrent(e.key)}}

            key="/user/become-instructor"
>
    <Link href='/user/become-instructor'>
        <a>
            Become Instructor
        </a>
    </Link>

</Item>
        )}

{user && user.role && user.role.includes("Instructor")&&(<>

    <Item  icon={<UserAddOutlined />}
            onClick={(e)=>{setCurrent(e.key)}}

            key="/instructor"
>
    <Link href='/instructor'>
        <a>
            Instructor
        </a>
    </Link>

</Item>



</>)}


            {user == null &&(
                <>
                <Item  icon={<LoginOutlined />}
                        onClick={(e)=>{setCurrent(e.key)}}

                        key="/login"
            >
                <Link href='/login'>
                    <a>
                        Login
                    </a>
                </Link>

            </Item>
            <Item  icon={<UserAddOutlined />}
                        onClick={(e)=>{setCurrent(e.key)}}

                        key="/register"
            >
                <Link href='/register'>
                    <a>
                        Register
                    </a>
                </Link>

            </Item>

                </>


            ) }


            {user !==null &&(
                <SubMenu icon={ <CoffeeOutlined/>} title={user &&user.name} className="float-start ">
                    <ItemGroup>
                    <Item  key="/user" className=" " icon={<LogoutOutlined/>}>
                         <Link href='/user'><a>Dashboard</a></Link></Item>

                    <Item onClick={logout} key="/logout" className="float-start " icon={<LogoutOutlined/>}>
                         Logout</Item>

                    </ItemGroup>
                     

                </SubMenu>
            )}
                     
                     
                       
            
            
        </Menu>
        </>
    )

}
export default TopNav;