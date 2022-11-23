import Link from "next/link"
import { Card } from "react-bootstrap"
const CardNews = (props) => {

    return (
        <Card className='my-2 shadow-sm'>
            <div className="row g-2 p-2">
                <div className='col-3'>
                </div>
                <div className='col'>
                    <Link href={"/posts/news/"+props.data.post_id}>
                        <h5>{props.data.post_title}</h5>
                    </Link>
                    <span dangerouslySetInnerHTML={{ __html: (props.data.post_content.substring(0, 110)) + "..." }}></span>
                </div>
            </div>
        </Card>
    )
}

export default CardNews