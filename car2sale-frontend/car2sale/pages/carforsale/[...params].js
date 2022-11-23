import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react'
import { Button, Card, Pagination, Overlay, Tooltip } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Ad from '../../comps/Ad';
import Searchcarbrand from '../../comps/Searchcarbrand';

const carbrand = ({ cardata, provinces, carbrand, year, paramsquery,carmodel }) => {

    const router = useRouter()
    const { params = [] } = router.query
    const [car, setCar] = useState(cardata);
    const [page, setPage] = useState(cardata.page);
    const [pagesize, setPagesize] = useState(cardata.pagesize);
    const [carbrands, setCarbrand] = useState(carbrand);
    const [paramsquerys, setParamsquerys] = useState(paramsquery);

    useEffect(() => {
        setCar(cardata)
    }, [cardata]);

    const Cardcar = (props) => {

        function Contactel(props) {
            const [show, setShow] = useState(false);
            const target = useRef(null);
            const [tel, setTel] = useState("ติดต่อผู้ขาย")

            const Contactel = (e) => {
                navigator.clipboard.writeText(e.target.value)
                setShow(!show)
                setTel(e.target.value)
            }
            useEffect(() => {
                const timer = setTimeout(() => { setShow(false) }, 1500);
                return () => clearTimeout(timer);
            }, [Contactel]);

            return (
                <>
                    <Button className='w-100 py-1' ref={target} onClick={Contactel} value={props.member_tel}>
                        {tel}
                    </Button>
                    <Overlay target={target.current} show={show} placement="right" delay={{ show: 250, hide: 250 }}>
                        <Tooltip id="overlay-example" {...props}>
                            Copied!
                        </Tooltip>
                    </Overlay>
                </>
            );
        }

        return (
            <>
                {car.results.slice(props.start, props.end).map((car) => {
                    return (
                        <Card className='my-2 shadow-sm' key={car.c_id}>
                            <div className="row g-2 p-2">
                                <div className='col'>
                                    <div key={car.c_id} className="col">
                                        <img className='img-thumbnail' src={car.c_imgpath + '/' + car.c_photo1} />
                                    </div>
                                </div>
                                <div className='col'>
                                    <Link href={'/for-sale/' + car.cb_name + "-" + car.cm_name + "/" + car.c_id}>
                                        <h5>{car.c_ad_title.length > 50 ?
                                            `${car.c_ad_title.substring(0, 50)}...` : car.c_ad_title
                                        }
                                        </h5>
                                    </Link>
                                    <h5>{car.c_sellingprice} บาท</h5>
                                </div>
                                <div className='col'>
                                    <p>{car.cb_name} {car.cm_name}</p>
                                    <p>mile {car.c_mile} กม.</p>
                                    <p>จังหวัด {car.name_th}</p>
                                    <Contactel member_tel={car.m_tel} />
                                    {/* <Button className='w-100 my-1' value={car.m_tel} onClick={Contactel}>ติดต่อผู้ขาย</Button> */}
                                    <Button className='w-100 my-1' href={"https://line.me/ti/p/~" + car.m_idline} target="_blank">ติดต่อทางไลน์</Button>
                                </div>
                            </div>
                        </Card>
                    )
                })
                }
            </>
        )
    }

    const Paginated = () => {
        var fetchcar = `http://localhost:3333/carforsale?`
        if (paramsquery.pricemin && paramsquery.pricemax) {
            fetchcar += `&pricemin=${paramsquery.pricemin}&pricemax=${paramsquery.pricemax}`
        }
        if (paramsquery.min_year && paramsquery.max_year) {
            fetchcar += `&min_year=${paramsquery.min_year}&min_year=${paramsquery.max_year}`
        }
        if (paramsquery.min_mile && paramsquery.max_mile) {
            fetchcar += `&min_mile=${paramsquery.min_mile}&max_mile=${paramsquery.max_mile}`
        }
        if (paramsquery.gear) {
            fetchcar += `&gear=${paramsquery.gear}`
        }
        if (paramsquery.color) {
            fetchcar += `&color=${paramsquery.color}`
        }
        if (paramsquery.keyword) {
            fetchcar += `&keyword=${paramsquery.keyword}`
        }
        if (paramsquery.provincesname) {
            fetchcar += `&provincesname=${paramsquery.provincesname}`
        }
        const onClickPrevbtn = async () => {
            const res = await fetch(fetchcar += `&page=${car.previous}&page_size=${car.limit}`)
            const data = await res.json()
            const cardata = data
            setCar(cardata)
            scrollTo(0, 0)
        }
        const onClickNextbtn = async () => {
            const res = await fetch(fetchcar += `&page=${car.nextpage}&page_size=${car.limit}`)
            const data = await res.json()
            const cardata = data
            setCar(cardata)
            scrollTo(0, 0)
        }
        const onClickFirstbtn = async () => {
            const res = await fetch(fetchcar += `&page=1&page_size=${car.limit}`)
            const data = await res.json()
            const cardata = data
            setCar(cardata)
            scrollTo(0, 0)
        }
        const onClickLastbtn = async () => {
            const res = await fetch(fetchcar += `&page=${car.totalpage}&page_size=${car.limit}`)
            const data = await res.json()
            const cardata = data
            setCar(cardata)
            scrollTo(0, 0)
        }
        if (car.totalpage == 1) {
            return null
        }
        const Item = () => {
            return (
                <>
                    {car.previous != null ?
                        <Pagination.Item key={car.previous} onClick={onClickPrevbtn}>
                            {car.previous}
                        </Pagination.Item> : null
                    }
                    <Pagination.Item key={car.page} active>
                        {car.page}
                    </Pagination.Item>
                    {car.nextpage != null ?
                        <Pagination.Item key={car.nextpage} onClick={onClickNextbtn}>
                            {car.nextpage}
                        </Pagination.Item> : null
                    }
                </>
            )
        }
        return (
            <Pagination>
                <Pagination.First onClick={onClickFirstbtn}>
                    หน้าแรก
                </Pagination.First>
                <Pagination.Prev onClick={onClickPrevbtn} />
                <Item />
                <Pagination.Next onClick={onClickNextbtn} />
                <Pagination.Last onClick={onClickLastbtn}>
                    หน้าสุดท้าย
                </Pagination.Last>
            </Pagination>
        );
    }

    if (params.length === 1) {
        const Breadcrumb1 = () => {
            return (
                <Breadcrumb>
                    <Link href="/">Home
                    </Link>
                    <Breadcrumb.Item >
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                    </Breadcrumb.Item>
                    <Link href="/carforsale">รถ</Link>
                    <Breadcrumb.Item >
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        {params[0]}
                    </Breadcrumb.Item>
                </Breadcrumb>
            )
        }
        return (
            <div className='container'>
                <Breadcrumb1 />
                <div className='row'>
                    <div className='col-3 d-none d-xl-block'>
                        <Searchcarbrand carbrand={params[0]} paramsquery={paramsquerys} carbrands={carbrand} provinces={provinces} year={year} carmodels={carmodel}/>
                    </div>
                    <div className='col'>
                        <Cardcar start={0} end={5} />
                        {car.datatotal > 5 ? <Ad /> : null}
                        <Cardcar start={5} end={10} />
                        {car.datatotal > 10 ? <Ad /> : null}
                        <Cardcar start={10} end={15} />
                        {car.datatotal > 15 ? <Ad /> : null}
                        <Cardcar start={15} end={20} />
                        {car.datatotal > 20 ? <Ad /> : null}
                        <Cardcar start={20} end={25} />
                        <div className='d-flex justify-content-center'>
                            <Paginated />
                        </div>
                    </div>
                    <div className='col-2 d-none d-xl-block'>ad</div>
                </div>
            </div>
        )
    }

    if (params.length === 2) {
        const Breadcrumb1 = () => {
            return (
                <Breadcrumb>
                    <Link href="/">Home
                    </Link>
                    <Breadcrumb.Item >
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                    </Breadcrumb.Item>
                    <Link href="/carforsale">รถ
                    </Link>
                    <Breadcrumb.Item >
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                    </Breadcrumb.Item>
                    <Link href="/carforsale">{params[0]}
                    </Link>
                    <Breadcrumb.Item >
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        {params[1]}
                    </Breadcrumb.Item>
                </Breadcrumb>
            )
        }
        return (
            <div className='container'>
                <Breadcrumb1 />
                <div className='row'>
                    <div className='col-3 d-none d-xl-block'>
                        <Searchcarbrand carbrand={params[0]} paramsquery={paramsquerys} carbrands={carbrand} provinces={provinces} year={year} carmodels={carmodel}/>
                    </div>
                    <div className='col'>
                        <Cardcar start={0} end={5} />
                        {car.datatotal > 5 ? <Ad /> : null}
                        <Cardcar start={5} end={10} />
                        {car.datatotal > 10 ? <Ad /> : null}
                        <Cardcar start={10} end={15} />
                        {car.datatotal > 15 ? <Ad /> : null}
                        <Cardcar start={15} end={20} />
                        {car.datatotal > 20 ? <Ad /> : null}
                        <Cardcar start={20} end={25} />
                        <div className='d-flex justify-content-center'>
                            <Paginated />
                        </div>
                    </div>
                    <div className='col-2 d-none d-xl-block'>ad</div>
                </div>
            </div>
        )
    }

}

export default carbrand


export async function getServerSideProps(context) {
    const { query } = context
    var fetchcar = `http://localhost:3333/carforsale/${query.params[0]}?page=1&page_size=25`
    if (query.params.length > 1) {
        var fetchcar = `http://localhost:3333/carforsale/${query.params[0]}/${query.params[1]}?page=1&page_size=25`
    }
    if (query.pricemin && query.pricemin) {
        fetchcar += `&pricemin=${query.pricemin}&pricemax=${query.pricemax}`
    }
    if (query.min_year && query.max_year) {
        fetchcar += `&min_year=${query.min_year}&min_year=${query.max_year}`
    }
    if (query.min_mile && query.max_mile) {
        fetchcar += `&min_mile=${query.min_mile}&max_mile=${query.max_mile}`
    }
    if (query.gear) {
        fetchcar += `&gear=${query.gear}`
    }
    if (query.color) {
        fetchcar += `&color=${query.color}`
    }
    if (query.keyword) {
        fetchcar += `&keyword=${query.keyword}`
    }
    if (query.provincesname) {
        fetchcar += `&provincesname=${query.provincesname}`
    }
    const res1 = await fetch(fetchcar)
    const data = await res1.json()
    const res2 = await fetch('http://localhost:3333/searchprovince')
    const data2 = await res2.json()
    const res3 = await fetch('http://localhost:3333/searchcarbrand')
    const data3 = await res3.json()
    const res4 = await fetch('http://localhost:3333/searchyear')
    const data4 = await res4.json()
    const res5 = await fetch(`http://localhost:3333/searchcarmodel/${query.params[0]}`)
    const data5 = await res5.json()
    return {
        props: {
            cardata: data,
            provinces: data2,
            carbrand: data3,
            year: data4,
            paramsquery: query,
            carmodel:data5
        },
    }
}
