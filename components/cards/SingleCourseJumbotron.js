
import { currencyFormatter } from "../../utils/helpers";
import ReactPlayer from 'react-player';
import { Badge ,Button } from "antd";
import { LoadingOutlined,SafetyOutlined} from '@ant-design/icons';


const SingleCourseJumbotron=({
    
    course,
    showModal,
    setShowModal,
    preview,
    setPreview,
    user,
    loading,
    handlePaidEnrollment,
    handleFreeEnrollment,
    enrollment

})=>{

    
    const {name,description,instructor,price,image,paid,catagory,createdAt,lessons,updatedAt}=course;

    return(<>
    
    
    <div className="jumbotron bg-primary square">
                    <div className="row">
                        <div className="col-md-8">

                            {/*title*/}
                            <h1 className="text-light font-weight-bold">{name}</h1>
                            <p className="lead">{description &&description.substring(0,160)}... </p>
                            <Badge count={catagory} style={{backgroundColor:'#03a9f4'}} className='pb-4 mr-2'/>

                            <p> Created By {instructor[0].name}</p>
                            <p>Last Update {new Date(updatedAt).toLocaleDateString()} </p>
                            <h4 className="text-light">{paid?currencyFormatter({
                                amount:price,
                                currency:'usd'
                            }):"Free"} </h4>



                        </div>
                        <div className="col-md-4">
                            {lessons[0].video?
                            
                            <div className=" continer pb-2 " onClick={()=>{
                                setPreview(lessons[0].video)
                                setShowModal(!showModal)
                                }}>
                                <ReactPlayer
                                className='react-player-div'
                                url={lessons[0].video}
                                width="100%"
                                height='225px'
                                />

                            </div>:(
                                <>
                                <img
                                src={image}
                                alt={name}
                                className="img img-fluid"
                                />

                                
                                </>
                            )}


                            {loading?<div className="d-flex justify-content-center pt-2" >
                                <LoadingOutlined className='h1 text-danger'/>

                            </div>:(<Button className="mb-3 mt-3"
                            type="danger"
                            block
                            shape="round"
                            icon={<SafetyOutlined/>}
                            size="large"
                            disabled={loading}
                            onClick={paid?handlePaidEnrollment:handleFreeEnrollment}
                            
                            >{user?enrollment.status?"Go to Course":'Enroll':"Login to Enroll"} </Button>
                            )}
                            

                        </div>

                    </div>

                </div>
    </>)
}

export default SingleCourseJumbotron;