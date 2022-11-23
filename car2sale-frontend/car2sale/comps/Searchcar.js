import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { Button } from 'react-bootstrap';

const Searchcar = ({paramsquery,carbrands,provinces,year}) => {

    const router = useRouter();
    const [carbrand, setCarbrand] = useState(null);
    const [pricemin, setPricemin] = useState(paramsquery.pricemin);
    const [pricemax, setPricemax] = useState(paramsquery.pricemax);
    const [min_year, setMin_year] = useState(paramsquery.min_year);
    const [max_year, setMax_year] = useState(paramsquery.max_year);
    const [min_mile, setMin_mile] = useState(paramsquery.min_mile);
    const [max_mile, setMax_mile] = useState(paramsquery.max_mile);
    const [gear, setGear] = useState(paramsquery.gear);
    const [color, setColor] = useState(paramsquery.color);
    const [keyword, setKeyword] = useState(paramsquery.keyword);
    const [provincesname, setProcincesname] = useState(paramsquery.provincesname);

    const [gearAutoChecked, setGearAutoChecked] = useState(false);
    const [gearManualChecked, setGearManualChecked] = useState(false);

    const handleOnGearAutoChecked = () => {
        setGearAutoChecked(!gearAutoChecked);
        setGearManualChecked(false)
        if (gearAutoChecked && gearManualChecked == false) {
            setGear(null)
        }
    };
    useEffect(() => {
        if (gearAutoChecked == true) {
            setGear("Automatic")
        }
    }, [gearAutoChecked]);

    const handleOnGearManualChecked = () => {
        setGearManualChecked(!gearManualChecked);
        setGearAutoChecked(false)
        if (gearManualChecked && gearAutoChecked == false) {
            setGear(null)
        }
    };

    useEffect(() => {
        if (gearManualChecked == true) {
            setGear("Manual")
        }
    }, [gearManualChecked]);

    const Searchcarbrand = (e) => {
        setCarbrand(e.target.value)
        router.push('/carforsale/' + e.target.value)
    }

    const Search = () => {
        const searcharr = {};
        if (pricemin && pricemax) {
            searcharr.pricemin = pricemin;
            searcharr.pricemax = pricemax;
            if (min_year && max_year) {
                searcharr.min_year = min_year;
                searcharr.max_year = max_year;
            }
            if (min_mile && max_mile) {
                searcharr.min_mile = min_mile;
                searcharr.max_mile = max_mile;
            }
            if (gear) {
                searcharr.gear = gear;
            }
            if (color) {
                searcharr.color = color;
            }
            if (keyword) {
                searcharr.keyword = keyword;
            }
            if (provincesname) {
                searcharr.provincesname = provincesname;
            }
        }
        else if (min_year && max_year) {
            searcharr.min_year = min_year;
            searcharr.max_year = max_year;
            if (min_mile && max_mile) {
                searcharr.min_mile = min_mile;
                searcharr.max_mile = max_mile;
            }
            if (gear) {
                searcharr.gear = gear;
            }
            if (color) {
                searcharr.color = color;
            }
            if (keyword) {
                searcharr.keyword = keyword;
            }
            if (provincesname) {
                searcharr.provincesname = provincesname;
            }
        }
        else if (min_mile && max_mile) {
            searcharr.min_mile = min_mile;
            searcharr.max_mile = max_mile;
            if (gear) {
                searcharr.gear = gear;
            }
            if (color) {
                searcharr.color = color;
            }
            if (keyword) {
                searcharr.keyword = keyword;
            }
            if (provincesname) {
                searcharr.provincesname = provincesname;
            }
        }
        else if (gear) {
            searcharr.gear = gear;
            if (color) {
                searcharr.color = color;
            }
            if (keyword) {
                searcharr.keyword = keyword;
            }
            if (provincesname) {
                searcharr.provincesname = provincesname;
            }
        }
        else if (color) {
            searcharr.color = color;
            if (keyword) {
                searcharr.keyword = keyword;
            }
            if (provincesname) {
                searcharr.provincesname = provincesname;
            }
        }
        else if (keyword) {
            searcharr.keyword = keyword;
            if (provincesname) {
                searcharr.provincesname = provincesname;
            }
        }
        else if (provincesname) {
            searcharr.provincesname = provincesname;
        }
        else {
            router.push({
                pathname: '/carforsale'
            })
        }
        router.push({
            pathname: '/carforsale',
            query: searcharr
        })
    }

    useEffect(() => {
        if (color == "all") {
            setColor(null)
        }
        if (provincesname == "all") {
            setProcincesname(null)
        }
    }, [color][provincesname]);

    const ClearSearch = ()=>{
        setPricemin({})
        setPricemax({})
        setMin_year({})
        setMax_year({})
        setMin_mile({})
        setMax_mile({})
        setGear({})
        setGearAutoChecked(false)
        setGearManualChecked(false)
        setColor({})
        setKeyword("")
        setProcincesname({})
        router.push('/carforsale')
    }
    return (
        <div>
            <div className='d-flex justify-content-end'>
                <span onClick={ClearSearch}>ล้างการค้นหา</span>
            </div>
            <select className="form-select my-2" onChange={Searchcarbrand}>
                <option>ยี่ห้อ</option>
                {carbrands.map((carbrand) => {
                    return (
                        <option key={carbrand.cb_id} value={carbrand.cb_name}>{carbrand.cb_name} ({carbrand.cb_count})</option>
                    )
                })
                }
            </select>
            <select className="form-select my-1" onChange={(e) => { setProcincesname(e.target.value) }} value={provincesname}>
                <option value={null}>จังหวัด</option>
                <option value="all">ทั้งหมด</option>
                {provinces.map((province) => {
                    return (
                        <option key={province.id} value={province.name_th}>{province.name_th} ({province.cb_count})</option>
                    )
                })
                }
            </select>
            <div>
                <label className='my-1'>ราคา</label>
                <div className='d-flex'>
                    <select className="form-select my-2 mx-2" onChange={(e) => { setPricemin(e.target.value) }} value={pricemin}>
                        <option>ราคาต่ำสุด</option>
                        <option value={25000}>25,000</option>
                        <option value={50000}>50,000</option>
                        <option value={75000}>75,000</option>
                        <option value={100000}>100,000</option>
                        <option value={200000}>200,000</option>
                        <option value={250000}>250,000</option>
                        <option value={300000}>300,000</option>
                        <option value={400000}>400,000</option>
                        <option value={500000}>500,000</option>
                        <option value={600000}>600,000</option>
                        <option value={800000}>800,000</option>
                        <option value={1000000}>1,000,000</option>
                        <option value={1500000}>1,500,000</option>
                        <option value={2000000}>2,500,000</option>
                        <option value={10000000}>10,000,000</option>
                        <option value={50000000}>50,000,000</option>
                    </select>
                    <select className="form-select my-2 mx-2" onChange={(e) => { setPricemax(e.target.value) }} value={pricemax}>
                        <option>ราคาสูงสุด</option>
                        <option value={25000}>25,000</option>
                        <option value={50000}>50,000</option>
                        <option value={75000}>75,000</option>
                        <option value={100000}>100,000</option>
                        <option value={200000}>200,000</option>
                        <option value={250000}>250,000</option>
                        <option value={300000}>300,000</option>
                        <option value={400000}>400,000</option>
                        <option value={500000}>500,000</option>
                        <option value={600000}>600,000</option>
                        <option value={800000}>800,000</option>
                        <option value={1000000}>1,000,000</option>
                        <option value={1500000}>1,500,000</option>
                        <option value={2000000}>2,500,000</option>
                        <option value={10000000}>10,000,000</option>
                        <option value={50000000}>50,000,000</option>
                    </select>
                </div>
            </div>
            <div>
                <label className='my-1'>ปี</label>
                <div className='d-flex'>
                    <select className="form-select my-2 mx-2" onChange={(e) => { setMin_year(e.target.value) }} value={min_year}>
                        <option>ปี (เก่าสุด)</option>
                        {year.map((year, index) => {
                            return (
                                <option key={index} value={year.c_year}>{year.c_year} ({year.cyear_count})</option>
                            )
                        })
                        }
                    </select>
                    <select className="form-select my-2 mx-2" onChange={(e) => { setMax_year(e.target.value) }} value={max_year}>
                        <option>ปี (ใหม่สุด)</option>
                        {year.map((year, index) => {
                            return (
                                <option key={index} value={year.c_year}>{year.c_year} ({year.cyear_count})</option>
                            )
                        })
                        }
                    </select>
                </div>
            </div>
            <div>
                <label className='my-1'>เลขไมล์</label>
                <div className='d-flex'>
                    <select className="form-select my-2 mx-2" onChange={(e) => { setMin_mile(e.target.value) }} value={min_mile}>
                        <option>ไมล์ (ต่ำสุด)</option>
                        <option value={0} >0 กม.</option>
                        <option value={5000} >5,000 กม.</option>
                        <option value={10000} >10,000 กม.</option>
                        <option value={15000} >15,000 กม.</option>
                        <option value={20000} >20,000 กม.</option>
                        <option value={25000} >25,000 กม.</option>
                        <option value={30000} >30,000 กม.</option>
                        <option value={35000} >35,000 กม.</option>
                        <option value={40000} >40,000 กม.</option>
                        <option value={45000} >45,000 กม.</option>
                        <option value={50000} >50,000 กม.</option>
                        <option value={55000} >55,000 กม.</option>
                        <option value={60000} >60,000 กม.</option>
                        <option value={65000} >65,000 กม.</option>
                        <option value={70000} >70,000 กม.</option>
                        <option value={75000} >75,000 กม.</option>
                        <option value={80000} >80,000 กม.</option>
                        <option value={85000} >85,000 กม.</option>
                        <option value={90000} >90,000 กม.</option>
                        <option value={95000} >95,000 กม.</option>
                        <option value={100000} >100,000 กม.</option>
                        <option value={110000} >110,000 กม.</option>
                        <option value={120000} >120,000 กม.</option>
                        <option value={130000} >130,000 กม.</option>
                        <option value={140000} >140,000 กม.</option>
                        <option value={150000} >150,000 กม.</option>
                        <option value={160000} >160,000 กม.</option>
                        <option value={170000} >170,000 กม.</option>
                        <option value={180000} >180,000 กม.</option>
                        <option value={190000} >190,000 กม.</option>
                        <option value={200000} >200,000 กม.</option>
                        <option value={250000} >250,000 กม.</option>
                        <option value={300000} >300,000 กม.</option>
                        <option value={350000} >350,000 กม.</option>
                        <option value={400000} >400,000 กม.</option>
                        <option value={450000} >450,000 กม.</option>
                        <option value={500000} >500,000 กม.</option>
                    </select>
                    <select className="form-select my-2 mx-2" onChange={(e) => { setMax_mile(e.target.value) }} value={max_mile}>
                        <option>ไมล์ (สูงสุด)</option>
                        <option value={0} >0 กม.</option>
                        <option value={5000} >5,000 กม.</option>
                        <option value={10000} >10,000 กม.</option>
                        <option value={15000} >15,000 กม.</option>
                        <option value={20000} >20,000 กม.</option>
                        <option value={25000} >25,000 กม.</option>
                        <option value={30000} >30,000 กม.</option>
                        <option value={35000} >35,000 กม.</option>
                        <option value={40000} >40,000 กม.</option>
                        <option value={45000} >45,000 กม.</option>
                        <option value={50000} >50,000 กม.</option>
                        <option value={55000} >55,000 กม.</option>
                        <option value={60000} >60,000 กม.</option>
                        <option value={65000} >65,000 กม.</option>
                        <option value={70000} >70,000 กม.</option>
                        <option value={75000} >75,000 กม.</option>
                        <option value={80000} >80,000 กม.</option>
                        <option value={85000} >85,000 กม.</option>
                        <option value={90000} >90,000 กม.</option>
                        <option value={95000} >95,000 กม.</option>
                        <option value={100000} >100,000 กม.</option>
                        <option value={110000} >110,000 กม.</option>
                        <option value={120000} >120,000 กม.</option>
                        <option value={130000} >130,000 กม.</option>
                        <option value={140000} >140,000 กม.</option>
                        <option value={150000} >150,000 กม.</option>
                        <option value={160000} >160,000 กม.</option>
                        <option value={170000} >170,000 กม.</option>
                        <option value={180000} >180,000 กม.</option>
                        <option value={190000} >190,000 กม.</option>
                        <option value={200000} >200,000 กม.</option>
                        <option value={250000} >250,000 กม.</option>
                        <option value={300000} >300,000 กม.</option>
                        <option value={350000} >350,000 กม.</option>
                        <option value={400000} >400,000 กม.</option>
                        <option value={450000} >450,000 กม.</option>
                        <option value={500000} >500,000 กม.</option>
                    </select>
                </div>
            </div>
            <div>
                <label>ระบบเกียร์</label>
                <input type="checkbox" className="btn-check" name="options" id="option1" autocomplete="off" checked={gearAutoChecked} onChange={handleOnGearAutoChecked}></input>
                <label className="btn btn-outline-primary my-2 mx-2" for="option1">อัตโนมัติ</label>
                <input type="checkbox" className="btn-check" name="options" id="option2" autocomplete="off" checked={gearManualChecked} onChange={handleOnGearManualChecked}></input>
                <label className="btn btn-outline-primary my-2 mx-2" for="option2">ธรรมดา</label>
            </div>
            <label>สี</label>
            <select className="form-select my-2" onChange={(e) => { setColor(e.target.value) }} value={color}>
                <option value="all">ทั้งหมด</option>
                <option value="White" >สีขาว</option>
                <option value="Gold" >สีทอง</option>
                <option value="Gray" >สีเทา</option>
                <option value="Silver" >สีเงิน</option>
                <option value="Blue" >สีน้ำเงิน</option>
                <option value="Bluelight" >สีฟ้า</option>
                <option value="Green" >สีเขียว</option>
                <option value="Black" >สีดำ</option>
                <option value="Cream" >สีครีม</option>
                <option value="Brown" >สีน้ำตาล</option>
                <option value="Yellow" >สีเหลือง</option>
                <option value="Orange" >สีส้ม</option>
                <option value="Red" >สีแดง</option>
                <option value="Pink" >สีชมพู</option>
                <option value="Purple" >สีม่วง</option>
                <option value="Orther" >อื่นๆ</option>
            </select>
            <label >คีย์เวิร์ด</label>
            <input type="text" className="form-control my-2" placeholder="เช่น Honda Civic" onChange={(e) => { setKeyword(e.target.value) }} value={keyword}></input>
            <Button className='w-100 mx-auto' onClick={Search}>ค้นหารถ</Button>
        </div>
    )
}


export default Searchcar