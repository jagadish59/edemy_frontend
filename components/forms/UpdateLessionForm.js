
import { CloseCircleFilled } from "@ant-design/icons";
import { Button, Progress, Tooltip,Switch } from "antd";
import ReactPlayer from 'react-player'

const UpdateLessionForm=({current,
    setCurrent,
    handlevideo,
    handleUploadlessons,

    uploadVideoButtonText,
    progress,
    uploading,
    


})=>{

     return <div> 

<div className="container">
    <form onSubmit={handleUploadlessons}>

        <pre>{JSON.stringify(current)}</pre>
        <input 
        type='text'
        className="form-control square"
        onChange={(e)=>setCurrent({...current,title:e.target.value})}
        value={current.title}
        required
        />
        <textarea 
        cols='?'
        rows='?'
        
        className="form-control mt-3"
        onChange={(e)=>setCurrent({...current,content:e.target.value})}
        value={current.content}
        
        required
        
        >


        </textarea>
        <div className="">



        {!uploading &&current.video &&(<>
        
        <div className="pt-2 d-flex justify-content-center">
            <ReactPlayer
            url={current.video}
            width='420px'
            height='240px'
            controls

            />
        </div>
        
        </>)}



        <label className="btn btn-dark btn-block text-left mt-3">
            {uploadVideoButtonText}
            <input onChange={handlevideo}
            type='file'
            accept="video/*"
            hidden

             
             
            />
        </label>
        </div>
        {progress && <Progress className="d-flex justify-containt-center pt-2"
    percent={progress}
    steps=    {10}
    />
    
    }

    <div className="d-flex justify-content-between">

        <span className="pt-3 badge">Preview</span>
        <Switch
        className="float-right mt-2"
        disabled={uploading}
        defaultChecked={current.free_preview}
        name="free_preview"
        onChange={v=>setCurrent({...current,free_preview:v})}
        />
    </div>




        <Button 
        onClick={handleUploadlessons}
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

export default UpdateLessionForm;