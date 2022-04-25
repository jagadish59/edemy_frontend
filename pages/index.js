import axios from "axios";
import { useState,useEffect } from "react";
import CourseCard from '../components/cards/CourseCard';



const Index=({courses})=>{


    // const [courses,setCourses]=useState([]);
    // useEffect(async()=>{

    //     const {data}=await axios.get('/api/courses')

    
        

      
    //    setCourses(data)
    //    console.log('Called getData',courses)
    

    // },[])

    console.log('outside',courses)
    return(
        <>
        <h1 className='jumbotron text-center bg-primary square'>Online Education Marketplace</h1>
       <div className="container-fluid">
        <div className="row">

        {courses&& courses.map((course)=>(
            <div className="col-md-4" key={course._id}>
             <CourseCard course={course}/>



            </div>
        ))}
        


        </div>
        </div>
        </>
    )
}


export async function getServerSideProps(content){
    const {data}=await axios.get(` http://localhost:8000/api/courses`)
    console.log(data)
    return({
        props:{courses:data}
    })
}
export default Index;