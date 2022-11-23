import React, { useEffect, useState } from 'react'

const testupload = () => {

    const [image, setImage] = useState({});
    const [imgIDCard, setImgIDCard] = useState({});
    const [imgCarRegistrationCard, setImgCarRegistrationCard] = useState({});


    const changeimage = (e) => {
        setImage([...e.target.files]);
    }
    const changeimgidcard = (e) => {
        setImgIDCard(e.target.files);
    }
    const changeimgcarregistrationcard = (e) => {
        setImgCarRegistrationCard(e.target.files);
    }


    const sendimage = async () => {
        const formdata = new FormData();
        for (var i = 0; i < image.length; i++) {
            formdata.append('imgcar', image[i]);
        }
        formdata.append('imgidcard', imgIDCard[0]);
        formdata.append('imgcarregister', imgCarRegistrationCard[0]);
        const res = await fetch('http://localhost:3333/uploadimgcar', {
            method: 'POST',
            body: formdata
        });
        const data = await res.json();
        console.log(data);
    };

    return (
        <div>
            <input name="imgcar" type="file" accept='image' placeholder="Enter your Avater image" onChange={changeimage} multiple />
            <input name="imgidcard" type="file" accept='image' placeholder="Enter your idcard image" onChange={changeimgidcard} />
            <input name="imgcarregistration" type="file" accept='image' placeholder="Enter your car registration image" onChange={changeimgcarregistrationcard} />
            <button onClick={sendimage}>upload</button>
        </div>
    )
}

export default testupload