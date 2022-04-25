import { useEffect,useState,useContext } from "react";
import axios from "axios";
import {useRouter} from 'next/router';
import SingleCourseJumbotron from '../../components/cards/SingleCourseJumbotron';
import PreviewModal from '../../components/modal/PreviewModal';
import SingleCourseLesson from "../../components/cards/SingleCourseLesson";
import {Context} from '../../context';

import { toast } from "react-toastify";


const SingleCourse=({course})=>{




    //videos preview
    const [showModal,setShowModal]=useState(false)

    const[preview,setPreview]=useState('');
    const[loading,setLoading]=useState(false);
    const[enrollment,setEnrollment]=useState([]);

const{state:{user},}=useContext(Context);

const router=useRouter();

useEffect(async ()=>{
if(user&&course){
    const {data}= await axios.get(`/api/check-enrollment/${course._id}`)
    console.log('data',data)
    setEnrollment(data)
}
},[user|course])






    const handlePaidEnrollment=()=>{

        console.log(enrollment)

        try{

        }
        catch(err){

            console.log(err)

        }

    }
    const handleFreeEnrollment= async(e)=>{
        
        console.log(enrollment.status)
        try{
            if(!user)router.push('/login')
            if(enrollment.status)router.push(`/user/course/${enrollment.courses.slug}`)
            setLoading(true)
            const {data}=await axios.post(`/api/free-enrollment/${course._id}`)
            toast(data.message);
            setLoading(false)
            router.push(`/user/course/${data.course.slug}`)
            


        }
        catch(err){
            console.log(err)
            
        }



    }
    return(
        <>
        <SingleCourseJumbotron
        course={course}
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
        setPreview={setPreview}
        user={user}
        loading={loading}
        handlePaidEnrollment={handlePaidEnrollment}
        handleFreeEnrollment={handleFreeEnrollment}
        enrollment={enrollment}
        />


                {/* {showModal?course.lessons[0].video:"don't show"} */}
                <PreviewModal
                showModal={showModal}
                setShowModal={setShowModal}
                preview={preview}
                />

                {course.lessons && (
                    <SingleCourseLesson
                    setPreview={setPreview}
                    lessons={course.lessons}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    />
                )}





        
        </>
    )
}
export async function getServerSideProps({query}){
    const {data}=await axios.get(` http://localhost:8000/api/course/${query.slug}`)
    console.log(data)
    return({
        props:{course:data}
    })
}


export default SingleCourse;