import { useRouter } from 'next/router';
import { useState } from 'react'
import PostEditor from '../../comps/PostEditor';
import styles from './userdashboard.module.css'

const userid = ({ userdata }) => {

    const [userdetail, setUserdetail] = useState(userdata[0]);
    const [hidepass, setHidepass] = useState(true);
    const [newemail, setNewEmail] = useState(userdetail.m_email);
    const [newtel, setNewTel] = useState(userdetail.m_tel);
    const [newline, setNewLine] = useState(userdetail.m_idline);
    const [oldpassword, setOldpassword] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [renewpassword, setRenewpassword] = useState('');

    const router = useRouter();


    const ChangeEmail = (e) => {
        setNewEmail(e.target.value)
    }
    const ChangeTel = (e) => {
        setNewTel(e.target.value)
    }
    const ChangeLine = (e) => {
        setNewLine(e.target.value)
    }

    const changepassword = async () => {
        const id = userdetail.m_id;
        if (newpassword === renewpassword) {
            const res = await fetch('http://localhost:3333/changepassword', {
                method: 'POST',
                body: JSON.stringify({ id, newpassword, oldpassword }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await res.json()
            if (data.status === "ok") {
                alert("เปลี่ยนรหัสผ่านเสร็จเรียบร้อย")
                router.reload();
            }
            if (data.status === "fail") {
                alert("รหัสผ่านปัจจุบันผิด")
            }
        }
        if (newpassword != renewpassword) {
            alert("รหัสผ่านใหม่ ไม่ตรงกับ รหัสผ่านอีกครั้ง")
        }
    }

    const updateprofile = async () => {
        const id = userdetail.m_id
        const res = await fetch('http://localhost:3333/updateprofile', {
            method: 'PUT',
            body: JSON.stringify({ id, newemail, newtel, newline }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        console.log(data);
    }

    if (userdetail.Role == "Admin") {

        const [title, setTitle] = useState('')

        const [text, setText] = useState('')

        const Ontextchange = () => {
            setText(this.target.value)
        }

        return (
            <>
                {userdata.map((data) => {
                    return (
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <div key={data.id}>
                                        <img className={styles.avatar} src={data.m_imgpath + data.m_imgname} />
                                        <h3 className='mt-2'>{data.m_fname}</h3>
                                        <h5>{data.m_email}</h5>
                                    </div>
                                    <ul>
                                        <li>Dashboard</li>
                                        <li>Posts</li>
                                    </ul>
                                </div>
                                <div className='col-md-9'>
                                    <div name="profile" className='mx-auto'>
                                        <h1>Post</h1>
                                        <input placeholder='text input' ></input>
                                        <PostEditor/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }
    else {
        return (
            <>
                {userdata.map((data) => {
                    return (
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <div key={data.id}>
                                        <img className={styles.avatar} src={data.m_imgpath + data.m_imgname} />
                                        <h3 className='mt-2'>{data.m_fname}</h3>
                                        <h5>{data.m_email}</h5>
                                    </div>
                                    <ul>
                                        <li>Dashboard</li>
                                        <li>รายการรถยนต์
                                            <ul>
                                                <li>จัดการข้อมูลรถ</li>
                                                <li>สร้างประกาศ</li>
                                                <li>แก้ไขราคารถ</li>
                                            </ul>
                                        </li>
                                        <li>รายการรถจักรยานยนต์
                                            <ul>
                                                <li>จัดการข้อมูลรถ</li>
                                                <li>สร้างประกาศ</li>
                                                <li>แก้ไขราคารถ</li>
                                            </ul>
                                        </li>
                                        <li>ข้อมูลส่วนตัว
                                            <ul>
                                                <li>แก้ไขข้อมูลส่วนตัว</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className='col-md-9'>
                                    <div name="profile" className='mx-auto'>
                                        <h1>ข้อมูลส่วนตัว</h1>
                                        <p className='mt-2'>ชื่อผู้ใช้</p>
                                        <input value={data.m_email} disabled="disabled"></input><br />
                                        <button className='mt-2' onClick={() => { setHidepass(!hidepass) }}>เปลี่ยนรหัสผ่าน</button>
                                        {hidepass ? null :
                                            <>
                                                <p>รหัสผ่านปัจจุบัน</p>
                                                <input onChange={(e) => { setOldpassword(e.target.value) }} value={oldpassword} ></input>
                                                <p>รหัสผ่านใหม่</p>
                                                <input onChange={(e) => { setNewpassword(e.target.value) }} value={newpassword}></input>
                                                <p>ใส่รหัสผ่านใหม่อีกครั้ง</p>
                                                <input onChange={(e) => { setRenewpassword(e.target.value) }} value={renewpassword}></input>
                                                <button className='mt-2' onClick={changepassword}>อัพเดทรหัสผ่าน</button>
                                            </>
                                        }
                                        <p className='mt-2'>ประเภทสมาชิก</p>
                                        <input value={data.Role} disabled="disabled"></input>
                                        <p className='mt-2'>ชื่อ</p>
                                        <input value={data.m_fname} disabled="disabled"></input>
                                        <p className='mt-2'>นามสกุล</p>
                                        <input value={data.m_lname} disabled="disabled"></input>
                                        <p className='mt-2'>อีเมล์</p>
                                        <input value={newemail} onChange={ChangeEmail}></input>
                                        <p className='mt-2'>เบอร์โทรศัพท์</p>
                                        <input value={newtel} onChange={ChangeTel}></input>
                                        <p className='mt-2'>ไลน์</p>
                                        <input value={newline} onChange={ChangeLine}></input><br />
                                        <button className='mt-2' onClick={updateprofile}>อัพเดทข้อมูล</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }
}

export default userid

export async function getServerSideProps(context) {
    const { params } = context
    const res = await fetch(`${process.env.HOST}/user/${params.userid}`)
    const data = await res.json()
    return {
        props: {
            userdata: data,
        },
    }
}