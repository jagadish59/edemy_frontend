
import { Avatar, Button, Menu } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect, createElement } from 'react';
import StudentRoute from '../../../components/routes/StudentRoute';
import ReactPlayer from 'react-player';
import ReactMarkdown from 'react-markdown';
import { CheckCircleFilled, MenuFoldOutlined, MenuUnfoldOutlined, MinusCircleFilled, PlayCircleOutlined } from '@ant-design/icons';

const { Item } = Menu

const SingleCourse = () => {


    const [clicked, setClicked] = useState(-1);
    const [collapsed, setCollapsed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState({ lessons: [] });
    const [completeLesson, setCompleteLesson] = useState([]);

    //router

    const router = useRouter();
    const slug = router.query.slug;

    useEffect(async () => {

        //for loading course
        if (slug) {
            try {
                console.log('slug is', slug)
                setLoading(true)
                const { data } = await axios.get(`https://udemybackends.herokuapp.com/api/user/course/${slug}`)
                setCourse(data);
                setLoading(false)

            }
            catch (err) {
                console.log(err);
                setLoading(true)
            }
        }

    }, [slug])

    console.log('slug out is', slug)

    useEffect(async () => {
        // for lession complete
        if (course) {
            const { data } = await axios.post(`https://udemybackends.herokuapp.com/api/list-complete`, {
                courseId: course._id,

            })

            console.log("complete list=", data)
            setCompleteLesson(data);
        }

    }, [course])

    const markCompleted = async () => {

        try {
            const { data } = await axios.post(`https://udemybackends.herokuapp.com/api/mark-completed`, {
                courseId: course._id,
                lessonsId: course.lessons[clicked]._id,
            })

            console.log(data);
            setCompleteLesson(data);

        }
        catch (err) {
            console.log(err)
        }


    }
    const markInCompleted = async () => {

        try {
            const { data } = await axios.post(`https://udemybackends.herokuapp.com/api/mark-incompleted`, {
                courseId: course._id,
                lessonsId: course.lessons[clicked]._id,
            })

            console.log(data);
            setCompleteLesson(data)

        }
        catch (err) {
            console.log(err)
        }


    }



    return (
        <StudentRoute>
            <div className='row'>

                <div style={{ maxWidth: 320 }}>
                    <Button onClick={() => setCollapsed(!collapsed)} className='text-primary mt-1 btn-block mb-2'>
                        {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                        {!collapsed && "Lessons"}
                    </Button>
                    <Menu
                        defaultSelectedKeys={[clicked]}
                        inlineCollapsed={collapsed}
                        style={{ height: '80vh', overflow: 'scroll' }}
                    >
                        {course.lessons.map((lesson, index) => (
                            <Item key={index} icon={<Avatar>{index + 1} </Avatar>} onClick={() => setClicked(index)}>
                                {lesson.title}{" "}{
                                    completeLesson.includes(lesson._id) ? (<CheckCircleFilled
                                        className='text-primary float-right ml-2'
                                        style={{ marginTop: '13px' }}
                                    />) :
                                        (<MinusCircleFilled
                                            className='text-danger float-right ml-2'
                                            style={{ marginTop: "13px" }}
                                        />)
                                }
                            </Item>
                        ))}
                    </Menu>

                </div>
                <div className='col'>
                    {clicked !== -1 ? (<>



                        <div className='col alert  alert-primary square'>
                            <b>{course.lessons[clicked].title.substring(0, 30)} </b>
                            {completeLesson.includes(course.lessons[clicked]._id) ? (

                                <span className='float-right pointer' onClick={markInCompleted}>
                                    Mark as Incomplete
                                </span>


                            ) : (
                                <span className='float-right pointer' onClick={markCompleted}>
                                    Mark as Complete
                                </span>
                            )}

                        </div>

                        {course.lessons[clicked].video && (
                            <>
                                <div className='wrapper'>
                                    <ReactPlayer
                                        className='player'
                                        url={course.lessons[clicked].video}


                                        width="80%"
                                        height="80%"
                                        controls
                                        onEnded={markCompleted}

                                    />




                                </div>

                            </>
                        )}
                        <ReactMarkdown
                            children={course.lessons[clicked].content}
                            className='point'
                        />
                    </>) : (

                        <div className='d-flex justify-content-center p-5'>
                            <div className='text-centre p-5'>
                                <PlayCircleOutlined className='text-primary display-1 p-5' />
                                <p>Click on the lessson to start learning</p>

                            </div>
                        </div>

                    )}


                    {/* {clicked!==-1? JSON.stringify(course.lessons[clicked],null,4):"Click the Title to learned"} */}


                </div>



            </div>

        </StudentRoute>
    )
}

export default SingleCourse;