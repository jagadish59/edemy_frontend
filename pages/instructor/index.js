import axios from 'axios'
import { useContext, useState,useEffect } from 'react';
import { Context } from '../../context';

 
import InstructorRoute from '../../components/routes/InstructorRoute';
import { Avatar, Tooltip } from 'antd';
import Link from 'next/link';
import { CheckCircleFilled,CloseCircleFilled} from '@ant-design/icons';



const InstructorIndex=()=>{
  
    const [courses,setCourses]=useState();

    const {state:{user}}=useContext(Context)


    useEffect(()=>{
        loadingCourses();
    },[]);

    
  const  loadingCourses=async()=>{
      const {data}=await axios.get('https://udemybackends.herokuapp.com/api/current-courses');

      setCourses(data)

    }



    const myStyle={marginTop:'-15px',fontSize:'10px'}

     
    return(<InstructorRoute>
    <h1 className='jumbotron  text-center square'>Instructor Dashbord</h1>


    {/* <pre>{JSON.stringify(courses,null,4)}</pre> */}
    {courses && courses.map((course)=>{
        return(
        <>
        <div className='media pt-2' >
            <Avatar 
            size={80}
            src={course.image?course.image:"/course.jpg"}
            
            > </Avatar>
            <div className='media-body pl-2'>
                <div className='row'>
                    <div className='col'>
                        <Link className='pointer' href={`/instructor/course/view/${course.slug}`} >
                            <a className='mt-1 text-primary'><h5 className='pt-2' >{course.name}</h5></a>
                        
                        </Link>

                        <p style={{marginTop:"-10px"}} className='mt-2'>
                            {course.lessons.length} Lession

                        </p>

                        {course.lessons.length<5? <p style={myStyle}> At list 5 lession is require for publish</p>
                        
                        :course.published?(<p style={myStyle}>Your course is taken in marketplace</p>):(<p style={myStyle}>Your course is ready for publish</p>)}

                    </div>
                <div className='col text-center'>

                    {course.published?
                        <Tooltip  title='Publish'
                        className=''
                        >
                        <CheckCircleFilled className='h5 pointer text-success '/>
                        </Tooltip>
                    :
                        <Tooltip  title='UnPublish' className=''>
                        <CloseCircleFilled className='h5 pointer text-danger '/>
                        </Tooltip>
                        
                        }
                </div>


                </div>


            </div>


        </div>
        </>)
    })}
    
    </InstructorRoute>)
    
}
export default InstructorIndex;