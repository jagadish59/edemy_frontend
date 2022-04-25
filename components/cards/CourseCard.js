import {Card, Badge} from 'antd';

import Link from 'next/link';
import {currencyFormatter} from '../../utils/helpers';

const {Meta}=Card;

const CourseCard=({course})=>{
    const {name,instructor,price,image,slug,paid,catagory}=course;
    return(

        <>
        <Link href={`/course/${slug}`}>
            <a>
                <Card
                className='mb-4'
                cover={
                    <img
                    src={image}
                    style={{height:'200px',objectFit:'cover'}}
                    className='p-1'
                    />
                }
                >
                    <h2 className='font-weight-bold'>{name}</h2>
                    <p>by {instructor[0].name}</p>
                    <Badge className='pb-2 mr-2' count={catagory} style={{backgroundColor:"#03a9f4"}}  />
                    <h4 className='pt-2 '>{paid?currencyFormatter({
                        amount:price,
                        currency:'usd'
                    }):"Free"}</h4>
                </Card>
            </a>
        
        </Link>
        
        </>
    )
}

export default CourseCard;