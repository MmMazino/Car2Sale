import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styles from '../styles/signin.module.css'

const register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [tel, setTel] = useState('')
    const [idline, setIdline] = useState('')
    const [image, setImage] = useState({})
    const date = new Date();
    const role = "Member"

    const bgcolor = {
        background: "rgba(248, 248, 248, 0.9)",
    }

    const router = useRouter();

    const handleSummit = async () =>{
        let formdata = new FormData();
        formdata.append("avatar",image);
        if (password === repassword) {
            const res = await fetch('http://localhost:3333/uploadavatar', {
                method: 'POST',
                body: formdata
            });
            const data = await res.json();
            const imgname = data.imagename;
            if (data.status === 'ok') {
                const res1 = await fetch('http://localhost:3333/register', {
                    method: 'POST',
                    body: JSON.stringify({ email, password, fname, lname, tel, idline, imgname, date, role }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                const data = await res1.json()
                if (data.status === "ok") {
                    alert("สมัครสมาชิกเรียบร้อย")
                    router.push('/signin')
                }
            }
        }
        else { alert("Your Password not match") }
    };

    const changeimage = (e)=> {
        setImage(e.target.files[0]);
    }

    return (
        <div className={styles.content}>
            <div className='col-md-8 col-lg-6 col-xxl-4 px-5 mx-auto pb-4' style={bgcolor}>
                <h1 className="text-center mt-3">
                    Register
                </h1>
                <div className='d-flex flex-column justify-content-center mt-3 mx-auto'>
                    <label>Email</label>
                    <input className={styles.inputbox} name="username" type="text" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input className={styles.inputbox} name="new-password" type="password" placeholder="**********" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label>RePassword</label>
                    <input className={styles.inputbox} name="current-password" type="password" placeholder="**********" value={repassword} onChange={(e) => setRepassword(e.target.value)} />
                    <label>Firstname</label>
                    <input className={styles.inputbox} name="fname" type="text" placeholder="Enter your Firstname" value={fname} onChange={(e) => setFname(e.target.value)} />
                    <label>Lastname</label>
                    <input className={styles.inputbox} name="lname" type="text" placeholder="Enter your Lastname" value={lname} onChange={(e) => setLname(e.target.value)} />
                    <label>Tel</label>
                    <input className={styles.inputbox} name="tel" type="text" placeholder="Enter your Tel" maxLength={10} value={tel} onChange={(e) => setTel(e.target.value)} />
                    <label>Idline</label>
                    <input className={styles.inputbox} name="idline" type="text" placeholder="Enter your idline" value={idline} onChange={(e) => setIdline(e.target.value)} />
                    <label>Photo Avatar</label>
                    <input name="Avatar" type="file" accept='image' placeholder="Enter your Avater image" onChange={changeimage} />
                    <button className={styles.signin} type="submit" onClick={handleSummit}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default register