import React, { useEffect, useState } from 'react'
import Ex from '../img/ex.jpg';
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const salecar = ({ carbrands, provinces }) => {

    const { status, data: session } = useSession();
    const router = useRouter()
    useEffect(() => {
        if (status === "unauthenticated") {
            alert('กรุณาลงชื่อเข้าใช้งานก่อน')
            router.push('/signin');
        }
    }, [status])

    const [carbrand, setCarbrand] = useState('');
    const [carmodel, setCarmodel] = useState('');
    const [manufacturingyear, setManufacturingyear] = useState('');
    const [gear, setGear] = useState('');
    const [cc, setCC] = useState(0);
    const [mile, setMile] = useState(0);
    const [regisyear, setRegisyear] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [province, setProvince] = useState('');
    const [amphure, setAmphure] = useState('');
    const [district, setDistrict] = useState('');
    const [imgIDCard, setImgIDCard] = useState({});
    const [imgCarRegistrationCard, setImgCarRegistrationCard] = useState({});
    const [idcardnumber, setIdcardnumber] = useState('');
    const [phonenumber, setPhonenumber] = useState('');

    //input price minmax//
    const min = 0;
    const max = 99999999;

    const pricechange = (e) => {
        const value = Math.max(min, Math.min(max, Number(e.target.value)));
        setPrice(value);
    };

    //multiplefile//
    const MAX_COUNT = 10
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [fileLimit, setFileLimit] = useState(false)

    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    alert(`You can only add a maximum of ${MAX_COUNT} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
        })
        if (!limitExceeded) setUploadedFiles(uploaded)
    }

    const handleFileEvent = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles);
    }
    //multiplefile//



    const [getcarmodel, setGetcarmodel] = useState([])
    const [getamphures, setGetamphures] = useState([])
    const [getdistricts, setGetdistrict] = useState([])

    const getmodel = async () => {
        const res = await fetch('http://localhost:3333/getmodel', {
            method: 'POST',
            body: JSON.stringify({ carbrand }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        setGetcarmodel(data);
    }

    const getamphure = async () => {
        const res = await fetch('http://localhost:3333/getamphure', {
            method: 'POST',
            body: JSON.stringify({ province }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        setGetamphures(data);
    }

    const getdistrict = async () => {
        const res = await fetch('http://localhost:3333/getdistrict', {
            method: 'POST',
            body: JSON.stringify({ amphure }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        setGetdistrict(data);
    }

    const handlechange = (e) => {
        setCarbrand(e.target.value)
    }

    const changeprovince = (e) => {
        setProvince(e.target.value)
    }

    const changeamphure = (e) => {
        setAmphure(e.target.value)
    }

    const changecolor = (e) => {
        setColor(e.target.value);
    }

    const changeimgidcard = (e) => {
        setImgIDCard(e.target.files);
    }
    const changeimgcarregistrationcard = (e) => {
        setImgCarRegistrationCard(e.target.files);
    }


    useEffect(() => {
        if (carbrand >= 1) {
            getmodel()
        }
    }, [carbrand]);

    useEffect(() => {
        if (province >= 1) {
            getamphure()
            setGetdistrict([])
        }
    }, [province]);

    useEffect(() => {
        if (amphure >= 1) {
            getdistrict()
        }
    }, [amphure]);

    const handlesend = async () => {
        if (uploadedFiles != null){
            const formdata = new FormData();
            for (var i = 0; i < uploadedFiles.length; i++) {
                formdata.append('imgcar', uploadedFiles[i]);
            }
            formdata.append('imgidcard', imgIDCard[0]);
            formdata.append('imgcarregister', imgCarRegistrationCard[0]);
            const res = await fetch('http://localhost:3333/salecar/uploadimgcar', {
                method: 'POST',
                body: formdata
            });
            const carupload = await res.json();
            if (carupload.status === 'ok') {
                const m_id = session.user.id
                const photo1 = carupload.imgcarname[0]
                const photo2 = carupload.imgcarname[1]
                const photo3 = carupload.imgcarname[2]
                const photo4 = carupload.imgcarname[3]
                const photo5 = carupload.imgcarname[4]
                const photo6 = carupload.imgcarname[5]
                const photo7 = carupload.imgcarname[6]
                const photo8 = carupload.imgcarname[7]
                const photo9 = carupload.imgcarname[8]
                const photo10 = carupload.imgcarname[9]
                const photoregistioncard = carupload.imgidcard
                const photoidcardname = carupload.imgcarregister
                const res1 = await fetch('http://localhost:3333/salecar/uploadcar', {
                    method: 'POST',
                    body: JSON.stringify(
                    { m_id, carbrand, carmodel, manufacturingyear, gear, cc, mile, regisyear, color, price, title, description, province, amphure, district,photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10,photoregistioncard,photoidcardname,idcardnumber,phonenumber }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                const carupload1 = await res1.json()
                if (carupload1.status === "ok") {
                    alert("ลงประกาศเรียบร้อยแล้ว")
                    router.push('/')
                }
            }
        }
    };

    if (status === "authenticated") {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 px-lg-5 mb-5 mt-3'>
                        <div className='d-flex flex-column justify-content-center mx-auto'>
                            <h5>ขั้นตอนที่ 1/4 รายละเอียดรถ</h5>
                            <label>ยี่ห้อ *</label>
                            <select name='carbrand' onChange={handlechange} value={carbrand}>
                                <option>กรุณาเลือก</option>
                                {carbrands.map(carbrand => {
                                    return (
                                        <option key={carbrand.cb_id} value={carbrand.cb_id}>{carbrand.cb_name}</option>
                                    )
                                })
                                }
                            </select>
                            <label>รุ่น *</label>
                            <select onChange={(e) => setCarmodel(e.target.value)} value={carmodel}>
                                <option>กรุณาเลือก</option>
                                {getcarmodel.map(carmodel => {
                                    return (
                                        <option key={carmodel.cm_id} value={carmodel.cm_id}>{carmodel.cm_name}</option>
                                    )
                                })}
                            </select>
                            <label>ปีที่ผลิต</label>
                            <input type="text" onChange={(e) => setManufacturingyear(e.target.value)} value={manufacturingyear} />
                            <label>ระบบเกียร์</label>
                            <select onChange={(e) => setGear(e.target.value)} value={gear}>
                                <option>กรุณาเลือก</option>
                                <option>Automatic</option>
                                <option>Manual</option>
                            </select>
                            <label>ความจุเครื่องยนต์(cc)</label>
                            <input type="text" onChange={(e) => setCC(e.target.value)} value={cc} />
                            <label>เลขไมล์</label>
                            <select onChange={(e) => setMile(e.target.value)} value={mile}>
                                <option>กรุณาเลือก</option>
                                <option value="2500">0 - 5K</option>
                                <option value="7500">5 - 10K</option>
                                <option value="12500">10 - 15K</option>
                                <option value="17500">15 - 20K</option>
                                <option value="22500">20 - 25K</option>
                                <option value="27500">25 - 30K</option>
                                <option value="32500">30 - 35K</option>
                                <option value="37500">35 - 40K</option>
                                <option value="42500">40 - 45K</option>
                                <option value="47500">45 - 50K</option>
                                <option value="52500">50 - 55K</option>
                                <option value="57500">55 - 60K</option>
                                <option value="62500">60 - 65K</option>
                                <option value="67500">65 - 70K</option>
                                <option value="72500">70 - 75K</option>
                                <option value="77500">75 - 80K</option>
                                <option value="82500">80 - 85K</option>
                                <option value="87500">85 - 90K</option>
                                <option value="92500">90 - 95K</option>
                                <option value="97500">95 - 100K</option>
                                <option value="102500">100 - 105K</option>
                                <option value="107500">105 - 110K</option>
                                <option value="112500">110 - 115K</option>
                                <option value="117500">115 - 120K</option>
                                <option value="122500">120 - 125K</option>
                                <option value="127500">125 - 130K</option>
                                <option value="132500">130 - 135K</option>
                                <option value="137500">135 - 140K</option>
                                <option value="142500">140 - 145K</option>
                                <option value="147500">145 - 150K</option>
                                <option value="152500">150 - 155K</option>
                                <option value="157500">155 - 160K</option>
                                <option value="162500">160 - 165K</option>
                                <option value="167500">165 - 170K</option>
                                <option value="172500">170 - 175K</option>
                                <option value="177500">175 - 180K</option>
                                <option value="182500">180 - 185K</option>
                                <option value="187500">185 - 190K</option>
                                <option value="192500">190 - 195K</option>
                                <option value="197500">195 - 200K</option>
                                <option value="202500">200 - 205K</option>
                                <option value="207500">205 - 210K</option>
                                <option value="212500">210 - 215K</option>
                                <option value="217500">215 - 220K</option>
                                <option value="222500">220 - 225K</option>
                                <option value="227500">225 - 230K</option>
                                <option value="232500">230 - 235K</option>
                                <option value="237500">235 - 240K</option>
                                <option value="242500">240 - 245K</option>
                                <option value="247500">245 - 250K</option>
                                <option value="252500">250 - 255K</option>
                                <option value="257500">255 - 260K</option>
                                <option value="262500">260 - 265K</option>
                                <option value="267500">265 - 270K</option>
                                <option value="272500">270 - 275K</option>
                                <option value="277500">275 - 280K</option>
                                <option value="282500">280 - 285K</option>
                                <option value="287500">285 - 290K</option>
                                <option value="292500">290 - 295K</option>
                                <option value="297500">295 - 300K</option>
                                <option value="Orther">อื่นๆ</option>
                            </select>
                            {mile == "Orther" ? <div className='mt-2 mb-2'><label>ใส่เลขไมล์ของท่าน</label><input type="number" onChange={(e) => setMile(e.target.value)} value={mile}></input></div> : ''}
                            <label>ปีที่จดทะเบียน</label>
                            <input type="text" onChange={(e) => setRegisyear(e.target.value)} value={regisyear} />
                            <label>สีรถ</label>
                            <select onChange={changecolor} value={color}>
                                <option>กรุณาเลือก</option>
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
                            <label>ราคาที่ต้องการขาย (บาท)</label>
                            <input type="number" value={price} onChange={pricechange} />
                            <label>หัวข้อโฆษณารถของคุณ</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <label>ข้อความโฆษณารถของคุณ</label>
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                            <label>พื้นที่  *</label>
                            <select name='province' onChange={changeprovince} value={province}>
                                <option>กรุณาเลือก</option>
                                {provinces.results.map(province => {
                                    return (
                                        <option key={province.id} value={province.id}>{province.name_th}</option>
                                    )
                                })
                                }
                            </select>
                            <label>อำเภอ *</label>
                            <select onChange={changeamphure} value={amphure}>
                                <option>กรุณาเลือก</option>
                                {getamphures.map(amphures => {
                                    return (
                                        <option key={amphures.id} value={amphures.id}>{amphures.name_th}</option>
                                    )
                                })}
                            </select>
                            <label>ตำบล *</label>
                            <select onChange={(e) => setDistrict(e.target.value)} value={district}>
                                <option>กรุณาเลือก</option>
                                {getdistricts.map(district => {
                                    return (
                                        <option key={district.id} value={district.id}>{district.name_th}</option>
                                    )
                                })}
                            </select>
                            <h5 className='mt-5'>ขั้นตอนที่ 2/4 รูป</h5>
                            <label>รูปรถ</label>
                            <input id='fileUpload' type='file' multiple
                                accept='image'
                                onChange={handleFileEvent}
                                disabled={fileLimit}
                            />
                            <label>บัตรประชาชน</label>
                            <input type="file" accept='image' onChange={changeimgidcard} />
                            <label>เล่มทะเบียนรถ</label>
                            <input type="file" accept='image' onChange={changeimgcarregistrationcard} />
                            <h5 className='mt-5'>ขั้นตอนที่ 3/4 ข้อมูลผู้ขาย</h5>
                            <label>อีเมล์ *</label>
                            <input type="text" value={session.user.email} />
                            <label>ชื่อ *</label>
                            <input type="text" value={session.user.fname} />
                            <label>นามสกุล *</label>
                            <input type="text" value={session.user.lname} />
                            <label>หมายเลขบัตรประจำตัวประชาชน / หมายเลขหนังสือเดินทาง *</label>
                            <input type="text" value={idcardnumber} onChange={(e) => setIdcardnumber(e.target.value)} />
                            <label>เบอร์โทรศัพท์มือถือ *</label>
                            <input type="text" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
                            <h5 className='mt-5'>ขั้นตอนที่ 4/4 กดยืนยันเพื่อประกาศขายรถ</h5>
                            <button className='mt-5' onClick={handlesend}>test</button>
                        </div>
                    </div>
                    <div className='col-md-6 px-5'>
                        <Image
                            src={Ex}
                            alt="Picture of the author"
                        />
                    </div>
                </div>
            </div>
        )
    }
}


export default salecar

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3333/getcarbrand')
    const resprovinces = await fetch('http://localhost:3333/provinces')
    const data = await res.json()
    const data1 = await resprovinces.json()

    return {
        props: {
            carbrands: data,
            provinces: data1,
        },
    }
}