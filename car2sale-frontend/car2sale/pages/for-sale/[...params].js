import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Accordion, Breadcrumb, Button, Card, Carousel } from "react-bootstrap"
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"

const carbrand = (cardata) => {
    const router = useRouter()
    const { params = [] } = router.query
    const [car, setCar] = useState(cardata.cardata[0]);
    const hrefsearch = "/carforsale/"
    const carbrandname = car.cb_name
    const hrefbrand = hrefsearch + carbrandname

    const carimg = [];
    if (car.c_photo1) {
        carimg.push({ original: `${car.c_imgpath}/${car.c_photo1}`,thumbnail:`${car.c_imgpath}/${car.c_photo1}`});
    }
    if (car.c_photo2) {
        carimg.push({ original: `${car.c_imgpath}/${car.c_photo2}`,thumbnail:`${car.c_imgpath}/${car.c_photo2}` });
    }
    if (car.c_photo3) {
        carimg.push({ original: `${car.c_imgpath}/${car.c_photo3}`,thumbnail:`${car.c_imgpath}/${car.c_photo3}` });
    }
    if (car.c_photo4) {
        carimg.push({ original: `${car.c_imgpath}/${car.c_photo4}`,thumbnail:`${car.c_imgpath}/${car.c_photo4}` });
    }
    if (car.c_photo5) {
        carimg.push({ original: `${car.c_imgpath}/${car.c_photo5}`,thumbnail:`${car.c_imgpath}/${car.c_photo5}` });
    }
    if (car.c_photo6) {
        carimg.push({ original: `${car.c_imgpath}/${car.c_photo6}`,thumbnail:`${car.c_imgpath}/${car.c_photo6}` });
    }
    if (car.c_photo7) {
        carimg.push({ original: `${car.c_imgpath}/${car.c_photo7}`,thumbnail:`${car.c_imgpath}/${car.c_photo7}` });
    }
    if (car.c_photo8) {
        carimg.push({ original: `${car.c_imgpath}/${car.c_photo8}`,thumbnail:`${car.c_imgpath}/${car.c_photo8}` });
    }
    if (car.c_photo9) {
        carimg.push({ original: `${car.c_imgpath}/${car.c_photo9}`,thumbnail:`${car.c_imgpath}/${car.c_photo9}` });
    }
    if (car.c_photo10) {
        carimg.push({ original: `${car.c_imgpath}/${car.c_photo10}`,thumbnail:`${car.c_imgpath}/${car.c_photo10}` });
    }
    console.log(carimg);

    function Breadcrumb1() {
        return (
            <Breadcrumb>
                <Link href="/">Home</Link>
                <Breadcrumb.Item>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                </Breadcrumb.Item>
                <Link href="/carforsale">รถ</Link>
                <Breadcrumb.Item>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                </Breadcrumb.Item>
                <Link href={hrefbrand}>{car.cb_name}</Link>
                <Breadcrumb.Item>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                </Breadcrumb.Item>
                <Link href={hrefsearch + car.cb_name + "/" + car.cm_name}>{car.cm_name}</Link>
                <Breadcrumb.Item>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    {car.c_id}
                </Breadcrumb.Item>
            </Breadcrumb>
        )
    }

    const Cardcar = () => {
        const Slide = () => {
            return (   
                <ImageGallery items={carimg} />
            )
        }
        const Cardetail = () => {
            return (
                <div className="row g-4 mb-2">
                    <div className="col">
                        <Card>
                            <Card.Body>
                                <label>gear</label>
                                <p>{car.c_gear}</p>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col">
                        <Card>
                            <Card.Body>
                                <label>ปีที่ผลิต</label>
                                <p>{car.c_year}</p>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col">
                        <Card>
                            <Card.Body>
                                <label>เลขไมล์</label>
                                <p>{car.c_mile} km</p>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col">
                        <Card>
                            <Card.Body>
                                <label>เครื่องยนต์</label>
                                <p>{car.c_cc} cc</p>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col">
                        <Card>
                            <Card.Body>
                                <label>สี</label>
                                <p>{car.c_color}</p>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            )
        }
        return (
            <>
                <div className="col-8">
                    <Slide />
                </div>
                <h1 className="mt-2">ราคา {car.c_sellingprice}</h1>
                <Cardetail />
            </>
        )
    }
    const CardProfile = () => {
        return (
            <Card>
                <Card.Body className="mx-auto">
                    <img width="75" height="75" className="rounded-circle" src={car.m_imgpath + car.m_imgname} />
                    <Link href={"/user/" + car.m_id}>
                        <span className="p-2">{car.m_fname} {car.m_lname}</span>
                    </Link>
                    <Card.Body className="row g-0">
                        <Button className="my-2">Tel</Button>
                        <Button className="my-2">Line</Button>
                    </Card.Body>
                </Card.Body>
            </Card>
        )
    }
    const Description = () => {
        return (<><Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0" >
                <Accordion.Header>รายละเอียดเพิ่มเติมของผู้ขาย</Accordion.Header>
                <Accordion.Body>
                    <p>{car.c_description}</p>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        </>)
    }

    if (params.length === 2) {
        return (
            <div className="container">
                <Breadcrumb1 />
                <h1>{car.c_ad_title}</h1>
                <p>date {car.datesave}</p>
                <Cardcar />
                <div className="row">
                    <div className="col my-2">
                        <Description />
                    </div>
                    <div className="col-3 my-2">
                        <CardProfile />
                    </div>
                </div>
            </div>
        )
    }
    if (params.length === 1) {
        return (
            <div>
                <h1>404</h1>
            </div>
        )
    }
}

export default carbrand

export async function getServerSideProps(context) {
    const { params } = context
    const res = await fetch(`http://localhost:3333/forsale/${params.params[1]}`)
    const cardata = await res.json()
    return {
        props: {
            cardata
        },
    }
}