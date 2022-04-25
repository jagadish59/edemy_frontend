import axios from 'axios';
import InstructorRoute from '../../../../components/routes/InstructorRoute';
import {useEffect,useState} from 'react';
import {Menu} from 'antd';
import { List } from 'antd';
const {Item}=Menu;

import { Avatar, Button, Modal, Tooltip } from 'antd';
import { CheckOutlined, CloseOutlined, EditFilled, QuestionOutlined, UploadOutlined, UserSwitchOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import AddLessionForm from '../../../../components/forms/AddLessionForm';
import { toast } from 'react-toastify';



import {getDownloadURL,deleteObject , getStorage, uploadBytesResumable} from '@firebase/storage';
import { ref } from "@firebase/storage";

import {storage} from '../../../../components/FirebaseStorage'
import { useRouter } from 'next/router';
import { async } from '@firebase/util';

 const CourseView=()=>{

     const [values,setValues]=useState({
         title:'',
         content:'',
         
     })

     const [video,setVideo]=useState('');

     const [uploading,setUploading]=useState(false);
     const [uploadButtonText,setUploadButtenText]=useState('upload videos');

     const [progress,setProgress]=useState(0);
    const router=useRouter();
    const slug=router.query;

    const [course,setCourse]=useState({});
    const [visible,setVisible]=useState(false);
    const[studenEnroll,setStudentEnroll]=useState(0);


    useEffect(async()=>{

        

        const cource = await axios.get(`/api/course/${slug.slug}`).then(respon=>{
            console.log(respon)
            setCourse(respon.data);


        }).catch(err=>console.log(err))
        
      
        
        

      



    },[slug])

    useEffect(async()=>{
        // student count enroll
        try{
            if(course){

                const {data}=await axios.post(`api//instructor/student-conunt`,{
                    courseId:course._id,

                })
                setStudentEnroll(data.length);
            }

            

        }
        catch(err){
            console.log(err)
        }




    },[course])



    // Founction for add lession 
    const handleAddlession=async(e)=>{
        e.preventDefault()
        try{
            console.log(course)

            console.log(course.instructor[0]._id)
            
        const {data}=await axios.post(`/api/course/lesson/${slug.slug}/${course.instructor[0]._id}`,{values,video})
        console.log(data)
        setValues({...values,title:'',content:''})
        setVideo('')

        setUploadButtenText('Upload videos')
       
        setUploading(false)
        setProgress(0)
    
        
    

        }catch(err){
            console.log(err)
        }


    
    }

    // viseos handle

    const hadleVideos=async (e)=>{
        try{
            setUploading(true)

            const file=e.target.files[0]
            setUploadButtenText(file.name)
            const videoData=new FormData();
            videoData.append('file',file)
            // save the progress bar and send videos data to backend 



            const refstorage=ref(storage,`/video/${file.name}`);
        const uploadTask=uploadBytesResumable(refstorage,file);
      
        uploadTask.on("state_changed",(snapshot)=>{
            const prog= (snapshot.bytesTransferred/snapshot.totalBytes)*100
           setProgress(prog.toFixed(2));
      
        },(err)=>console.log(err),()=>{
            getDownloadURL(uploadTask.snapshot.ref).then( async (url)=>{console.log(url);
                setVideo(url)
                toast('Videos save in firebase')
                setUploading(false)

                
            })
        })



            //data response is recived 

        } catch(err){
            console.log(err)
            toast('Videos upload filed')
        }

    }

    //remove videos

    const handleVideoRemove= ()=>{



        setUploading(true)
        const storage = getStorage();
        const desertRef = ref(storage, `video/${uploadButtonText}`);
        deleteObject(desertRef).then(() => {
            // File deleted successfully
            setUploadButtenText('Upload videos')
            setProgress(0)
            setUploading(false)
            setVideo('');
            console.log('remove the videos')
            toast('vidoes remove')

            
          }).catch((error) =>{
            // Uh-oh, an error occurred!
            console.log(error)
          });


        }



        const handleUnpublish=async (e,courseId)=>{
            try{

                let answer=window.confirm("Once publish your course on market place")
                if(!answer)return
                const data=await axios.put(`/api/course/unpublish/${courseId}`)
                setCourse(data.data)
                toast("Congratulation your course is unpublish")

            }
            catch(err){
                console.log(err)
                toast("Your course is not unpublish Error:!!!")
            }


        }
        
        const handlePublish=async (e,courseId)=>{

            try{
                let answer=window.confirm("Once unpublish your course on market place no inroll for user in market")
            if(!answer)return
            const data=await axios.put(`/api/course/publish/${courseId}`)
            setCourse(data.data)
            toast(" Congratulation your course is published ")
            

            }
            catch(err){
                console.log(err)
                toast('Publish error ')
            }
            
            
        }



    return(<InstructorRoute>


        <div className='container-fluid pt-3'>
            {course &&(

                <div className='container-fluid pt-1'>
                    <div className='media pt-2'>
                        <Avatar
                        size={80}
                        src={course.image?course.image:'course.png'}


                        />
                        <div className='media-body pt-2 pl-3'>
                            <div className='row'>
                                <div className='col'>
                                    <h5 className='mt-2 text-primary'>
                                        {course.name}

                                    </h5>
                                    <p className=''> {course.lessons && course.lessons.length} Lession
                                    </p>
                                    <p>
                                        {course.catagory }
                                    </p>

                                </div>
                                
                        <div className='d-flex'>
                        <Tooltip title= {`${studenEnroll} Enroll`}>
                                <UserSwitchOutlined className='h5 pointer text-info mr-4'/>

                            </Tooltip>
                            <Tooltip title='Edit'>
                                <EditFilled onClick={()=>router.push(`/instructor/course/edit/${slug.slug}`)} className='h5 pointer text-warning mr-4'/>

                            </Tooltip>


                            {course.lessons&& course.lessons.length<5 ?(
                                <Tooltip title='Min 5 lession is require to publish'>
                                    <QuestionOutlined className='h5 pointer text-danger'/>
                                </Tooltip>
                            ):course.published?<Tooltip title='Unpublish'>
                                <CloseOutlined className='h5 pointer text-danger'
                                onClick={(e)=>handleUnpublish(e,course._id)}
                                />

                            </Tooltip>: <Tooltip title='Publish'>
                                <CheckOutlined className='h5 pointer text-success'
                                onClick={(e)=>handlePublish(e,course._id)}
                                />
                                </Tooltip>}







                        </div>

                            </div>

                        </div>

                    </div>

                    <div className='row'>
                        <div className='col'>
                            <ReactMarkdown children={course.description}/>
            
                        </div>

                    </div>
                    <div className='row'>
                        <Button 
                        onClick={()=>setVisible(true)}
                        size='large'
                        icon={<UploadOutlined/>}
                        shape='round'
                        className='text-center offset-md-3 col-md-3'
                        >
                            add Lession


                        </Button>

                    </div>
                    <Modal
                    title='title lession'
                    visible={visible}
                    onCancel={()=>setVisible(false)}
                    footer={null}
                    centered
                    >
                      <AddLessionForm values={values}

                      setValues={setValues}
                      handleAddlession={handleAddlession}
                      uploading={uploading}
        
                      uploadButtonText={uploadButtonText}
                      hadleVideos={hadleVideos}
                      progress={progress}
                      handleVideoRemove={handleVideoRemove}
                      video={video}
                      />


                    </Modal>

                    
{course.lessons&&(<>  <div className='row pb-5'>
                        <div className='col lesson-list'>
                            <h4>
                                {/* {course &&course.lessons&& course.lessons.length} Lessons */}
                                { course.lessons.length} Lession

                            </h4>
                            <List itemLayout='horizontal' dataSource={course &&course.lessons} 
                            renderItem={(item,index)=>(
                                <List.Item>
                                    
                                   {<Avatar>{index+1}</Avatar>}
                                    {item.title}
                                    
                                    

                                    
                                </List.Item>
                            )

                            }>

                                

                            </List>

                        </div>
                        
                        
                     </div>
                     
                     </>)}


                  

                </div>
            ) }

        </div>



    </InstructorRoute>)
}


export default CourseView;