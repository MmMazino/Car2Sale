import Link from "next/link"
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';

const Carouselcar = ({ cardata }) => {
    const Cardcar = (props) => {
        return (
            <div className="row g-4 my-5">
                {cardata.slice(props.start, props.end).map((car) => {
                    return (
                        <div key={car.c_id} className="col">
                            <Card>
                                <Card.Img variant="top" src={car.c_imgpath + '/' + car.c_photo1} />
                                <Card.Body>
                                    <Card.Title>{car.c_ad_title}</Card.Title>
                                    <h4>{car.c_sellingprice} บาท</h4>
                                </Card.Body>
                            </Card>
                        </div>
                    );
                })}
            </div>
        );
    }
    return (
        <>
            <div className="d-flex justify-content-between">
                <h2>รถแนะนำหรับคุณ</h2>
                <Link href="/carforsale">ดูรถทั้งหมด
                </Link>
            </div>
            <div>
                <Carousel>
                    <Carousel.Item>
                        <Cardcar start={0} end={5} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <Cardcar start={5} end={10} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <Cardcar start={10} end={15} />
                    </Carousel.Item>
                </Carousel>
            </div>
        </>
    )
}


export default Carouselcar
