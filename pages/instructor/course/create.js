import axios from 'axios'

 
import InstructorRoute from '../../../components/routes/InstructorRoute';
import { useEffect,useState } from 'react';
import  CourceCreateform  from '../../../components/forms/CourseCreateForm';
import {toast} from 'react-toastify';
import Resizer from 'react-image-file-resizer';

import {getDownloadURL,deleteObject , getStorage, uploadBytesResumable} from '@firebase/storage';
import { ref } from "@firebase/storage";

import {storage} from '../../../components/FirebaseStorage'
import { useRouter } from 'next/router';












const CourceCreate=()=>{
    const [url, setUrl] = useState('');
    const [currentImage,setCurrentImage]=useState();
    const [values,setValues]=useState({

        name:'',
        description:"",
        price:'9.99',
        uploading:false,
        paid:true,
        loading:false,
        catagory:'',
        imagePreview:"",

    }) 







    const [preview,setPreview]=useState('')
    
    const [uploadButtenTxt,setUploadButtenText]=useState('Upload image')
    const router=useRouter();
    
    const handlechange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value})
    }
    const handleImage= async(e)=>{
        const file=e.target.files[0];
        setCurrentImage(file);

        setPreview(window.URL.createObjectURL(e.target.files[0]))
        setUploadButtenText(file.name)
        setValues({...values,loading:true})



        const refstorage=ref(storage,`/image/${file.name}`);
        const uploadTask=uploadBytesResumable(refstorage,file);
      
        uploadTask.on("state_changed",(snapshot)=>{
            const prog= (snapshot.bytesTransferred/snapshot.totalBytes)*100
            toast(`Uploading: ${prog}`);
      
        },(err)=>console.log(err),()=>{
            getDownloadURL(uploadTask.snapshot.ref).then( async (url)=>{console.log(url);
                setUrl(url);
                
            let {data}=await axios.post("https://udemybackends.herokuapp.com/api/course/upload-image",{image:url})
            setValues({...values,loading:false})
            console.log(data)
            })
        })


        



        // resize image 

        // Resizer.imageFileResizer(file,720,500,"JPEG",100,0,async(uri)=>{

        //     try{
        //         let {data}=await axios.post("/api/course/upload-image",{image:uri})
        //         console.log("image uploaded data",data);
  
        //         setValues({...values,loading:false})
                

        //     }catch(err){
        //         console.log(err)
        //         setValues({...values,loading:false})
        //         toast("image upload failed")
        //     }
        // })
    }

    const handleImageRemove=()=>{


        
        console.log(currentImage)
        console.log(currentImage.name)

        const storage = getStorage();
        const desertRef = ref(storage, `image/${currentImage.name}`);
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
            const {data }=await axios.post('https://udemybackends.herokuapp.com/api/course',{
                ...values,
                image:url,
            })
            toast("Greet courser is created")
            router.push('/instructor');
        }catch(err){
            console.log(err)  ;
              }

    }

    return(<InstructorRoute>
    <h1 className='jumbotron  text-center square'>Creat cource</h1>
    <div className='pt-3 pb-3 m-2'>
        <CourceCreateform 
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

    </InstructorRoute>)
}

export default CourceCreate;