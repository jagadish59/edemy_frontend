
import { useContext , useEffect, useState} from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import axios from "axios";
import Link from "next/link";
import {Avatar} from 'antd';
import { PlayCircleFilled, PlayCircleOutlined, SyncOutlined } from "@ant-design/icons";


const UserIndex = () => {
    const [courses,setCoursee]=useState([]);
    const[loading,setLoading]=useState(false);

    const { state: { user }, } = useContext(Context);
    useEffect(async()=>{


        setLoading(true)
const {data}=await axios.get(`/api/user-courses`)
setCoursee(data);

setLoading(false)


    },[])

    console.log(courses);



    return (
        <UserRoute>
            {loading?<>
                <SyncOutlined
                 spin
                 className="d-flex justify-content-center display-1 text-danger"
                 />
                 </>
            :<>
            

                <h1 className="jumbotron text-center square">
                    User  Dashbord
                </h1>

                {courses&&courses.map(course=>(
                    <div key={course._id} className="media pt-2 pb-2">
                        <Avatar size={80} shape='square' src={course.image?course.image:"Course.png"} />

                        <div className="media-body pl-1">
                            <div className="row">
                                <div className="col">
                                    <Link href={`/user/course/${course.slug}`}className='pointer'>
                                        <a><h5 className="mt-2 text-primary ">{course.name} </h5></a>

                                    </Link>
                                    <p style={{marginTop:'-10px'}}  >{course.lessons.length} Lessons </p>
                                    <p className="text-muted" style={{marginTop:'-15px'}}>BY {course.instructor[0].name} </p>


                                </div>
                                <div className="col-md-3 mt-3 text-center">
                                    <Link className='' href={`/user/course/${course.slug}`}>
                                        <a><PlayCircleOutlined className="h2 pointer text-primary"/> </a>
                                    </Link>

                                </div>

                            </div>

                        </div>



                    </div>
                ))}

            

</> }
        </UserRoute>
    )
}

export default UserIndex;