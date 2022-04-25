import { CloseCircleFilled } from "@ant-design/icons";
import { Button, Progress, Tooltip } from "antd";


const AddLessionForm=({values,
    setValues,
    handleAddlession,uploading,
    uploadButtonText,
    hadleVideos,
    progress,
    handleVideoRemove,
    video,

})=>{

     return <div> 

<div className="container">
    <form onSubmit={handleAddlession}>
        <input 
        type='text'
        className="form-control square"
        onChange={(e)=>setValues({...values,title:e.target.value})}
        value={values.title}
        placeholder='Title of viseos'
        required
        />
        <textarea 
        cols='?'
        rows='?'
        
        className="form-control mt-3"
        onChange={(e)=>setValues({...values,content:e.target.value})}
        value={values.content}
        placeholder='Content  of viseos'
        required
        
        >


        </textarea>
        <div className="d-flex justify-content-center">
        <label className="btn btn-dark btn-block text-left mt-3">
            {uploadButtonText}
            <input onChange={hadleVideos}
            type='file'
            accept="video/*"
            hidden

             
             
            />
        </label>


        {!uploading &&video &&(
            <Tooltip title='remove'>
               <span onClick={handleVideoRemove} className='pt-1 pl-3'>
                   <CloseCircleFilled 
                   className="text-danger d-flex justify-content-center pt-4 pointer"
                   /> 
               </span>
            </Tooltip>
        )}
        </div>
        {progress && <Progress className="d-flex justify-containt-center pt-2"
    percent={progress}
    steps=    {10}
    />
    
    }

        <Button 
        onClick={handleAddlession}
         className='col mt-3'
         size="large"
         type="primary"
         loading={uploading}
         shape='round'
        
        
        >  save </Button>


    </form>
    
    
    </div>         
     </div>


}

export default AddLessionForm;