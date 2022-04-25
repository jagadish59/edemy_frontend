import axios from 'axios'

import { Avatar, Button, Modal, Tooltip, List } from 'antd';

 
import InstructorRoute from '../../../../components/routes/InstructorRoute';
import { useEffect,useState } from 'react';
import  CourceEditForm  from '../../../../components/forms/CourseEditForm';
import   UpdateLessionForm from '../../../../components/forms/UpdateLessionForm';

import {toast} from 'react-toastify';

import {getDownloadURL,deleteObject , getStorage, uploadBytesResumable} from '@firebase/storage';
import { ref } from "@firebase/storage";

import {storage} from '../../../../components/FirebaseStorage'
import { useRouter } from 'next/router';
import { DeleteOutlined } from '@ant-design/icons';












const CourceEdit=()=>{
    

    //state for session visibe
    const[visibe,setVisible]=useState(false);
    const[current,setCurrent]=useState({});
    const[uploadVideoButtonText,setUploadVideoButtonText]=useState('Upload videos');
    const[uploading,setUploading]=useState(false);
    const [progress,setProgress]=useState(0);



    const [values,setValues]=useState({
}) 







    const [preview,setPreview]=useState('')
    const [curentImage,setCurentImage] =useState();
    
    const [uploadButtenTxt,setUploadButtenText]=useState('Upload image')
    const router=useRouter();


    const slug=router.query.slug;

    useEffect(async()=>{
        const editData=await axios.get(`/api/course/${slug}`)
        console.log(editData.data)
        setValues(editData.data)


    },[(!slug?[]:slug)])




    
    const handlechange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value})
    }
    const handleImage= async(e)=>{
        const file=e.target.files[0];

        setPreview(window.URL.createObjectURL(e.target.files[0]))
        setUploadButtenText(file.name)
        setCurentImage(file)
        setValues({...values,loading:true})



        const refstorage=ref(storage,`/image/${file.name}`);
        const uploadTask=uploadBytesResumable(refstorage,file);
      
        uploadTask.on("state_changed",(snapshot)=>{
            const prog= (snapshot.bytesTransferred/snapshot.totalBytes)*100
            toast(`Uploading: ${prog}`);
      
        },(err)=>console.log(err),()=>{
            getDownloadURL(uploadTask.snapshot.ref).then( async (url)=>{console.log(url);
                
            setValues({...values,image:url,loading:false})
            })
        })


        




    }

    const handleImageRemove=()=>{


        
        console.log(curentImage)
        console.log(curentImage.name)

        const storage = getStorage();
        const desertRef = ref(storage, `image/${curentImage.name}`);
        deleteObject(desertRef).then(() => {
            // File deleted successfully
            console.log('remove the image')

            
        setPreview();

            
          }).catch((error) =>{
            // Uh-oh, an error occurred!
            console.log(error)
          });
        
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();

        try{

            console.log(values.price)
            const {data}=await axios.put(`/api/course/${slug}`,{
                ...values,
            
            })
            toast("Greet courser is Edit successessifully")
            router.push('/instructor');
            console.log(data.data)
        }catch(err){
            console.log(err)  ;
              }

    }

    const handleDrag=(e,index)=>{
        console.log('drag',index)
        e.dataTransfer.setData('indexItem',index)

    }
    const handleDrop= async(e,index)=>{
        console.log('drop',index)

        const movingIndex=e.dataTransfer.getData('indexItem')
        const targetItemIndex=index;
        let allLesson=values.lessons
        let movingItem=allLesson[movingIndex]

        allLesson.splice(movingIndex,1) // remove the target item from lessons

        allLesson.splice(targetItemIndex,0,movingItem) // add Itme after the target item index
        setValues({...values,lessons:[...allLesson]})

        
        console.log(values.image)
        const {data}=await axios.put(`/api/course/${slug}`)
        toast("Greet lessons is Edit successessifully")

        console.log(values.lessons)



    }

 //   lesssion delete

    const handleDelete=async(index,item)=>{
        const answer=window.confirm("Are you sure want to delete")
        if(!answer){return}
        let allLesson=values.lessons
       const remove= allLesson.splice(index,1)
        setValues({...values,lessons:allLesson});
        console.log(remove[0]._id)
        const {data}= await axios.put(`/api/course/${slug}/${remove[0]._id}`)
        toast('Remove this lesson')

    }



    // lession videos 

    const handlevideo= async(e)=>{

        console.log('handle videos')
        if(current.video){

            setCurrent({...current,video:''})


        
        }

        //videos upload
        try{
            setUploading(true)

            const file=e.target.files[0]
            setUploadVideoButtonText(file.name)
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
                setCurrent({...current,video:url})
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
const handleUploadlessons=async()=>{
    console.log('lession handle')
const  {data}=await axios.put(`/api/course/lesson/${slug}/${current._id}`,current)
setUploadVideoButtonText('Upload videos');
setProgress(0)
setUploading(false)
console.log(data.ok)
if(data.ok){
let arr=values.lessons
const index=arr.findIndex(el=>el._id===current._id);
arr[index]=current
setValues({...values,lessons:arr})
toast("lession update successifullu")


}


} 

const handleVideoRemove=()=>{
    console.log('handleVideoRemove')
}


    return(<InstructorRoute>
    <h1 className='jumbotron  text-center square'>Edit cource</h1>
    <div className='pt-3 pb-3 m-2'>
        <CourceEditForm 
        handleSubmit={handleSubmit}
        handlechange={handlechange}
        handleImage={handleImage}
        values={values}
        setValues={setValues}
        preview={preview}
        uploadButtenTxt={uploadButtenTxt}
        handleImageRemove={handleImageRemove}


        />




    </div>
    <br/>
    {values.lessons&&(<>  <div className='row pb-5'>
                        <div className='col lesson-list'>
                            <h4>
                                {/* {course &&course.lessons&& course.lessons.length} Lessons */}
                                { values.lessons.length} Lession

                            </h4>
                            <List 
                            itemLayout='horizontal' 
                            onDragOver={(e)=>e.preventDefault()}
                            dataSource={values &&values.lessons} 
                            renderItem={(item,index)=>(
                                <List.Item
                                draggable
                                onDragStart={e=>handleDrag(e,index)}
                                onDrop={e=>handleDrop(e,index)}
                                
                                onClick={()=>{
                                    setVisible(true)
                                    setCurrent(item)

                                }}
                                >
                                    
                                   {<Avatar>{index+1}</Avatar>}
                                    {item.title}
                                    <DeleteOutlined className='text-danger float-right' 
                                    onClick={()=>handleDelete(index,item)}/>
                                    

                                    
                                </List.Item>
                            )

                            }>

                                

                            </List>

                        </div>
                        
                        
                     </div>
                     
                     </>)}
                     <Modal
                     title='update lessons'
                     visible={visibe}
                     centered
                     onCancel={()=>setVisible(false)}
                     footer={null}

                     
                     >
                         
                     <UpdateLessionForm 
                     current={current}
                     setCurrent={setCurrent}
                     handlevideo={handlevideo}
                     handleUploadlessons={handleUploadlessons}

                     uploadVideoButtonText={uploadVideoButtonText}
                     progress={progress}
                     uploading={uploading}
                     

                     
                     
                     />


                     </Modal>



    </InstructorRoute>)
}

export default CourceEdit;