import { List ,Avatar } from "antd";

const SingleCourseLesson=({lessons,showModal,setPreview,setShowModal})=>{

    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col lession-list">
                    {lessons&&<h4>{lessons.length} Lessons</h4>}
                    <hr/>




                    <List itemLayout='horizontal' dataSource={lessons} 
                            renderItem={(item,index)=>(
                                <List.Item>

                                    <List.Item.Meta
                                    avatar=  {<Avatar>{index+1}</Avatar>}
                                    title={item.title}
                                    />
                                    
                                 
                                    
                                    
                                    {item.video&& item.free_preview&&(
                                    <span onClick={()=>{
                                        setPreview(item.video)
                                        setShowModal(!showModal)
                                    }}
                                    className='pointer text-primary'
                                    >Preview

                                    </span>
                                )}





                                

                                    
                                    

                                    
                                </List.Item>
                            )

                            }>

                                

                            </List>

                    






                </div>
                </div> 

        </div>
        
        </>
    )
}
export default SingleCourseLesson;