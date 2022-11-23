import { useState } from "react"
import CardNews from "../../comps/CardNews"

const news = (news) => {
    const [newsdata, setNewdata] = useState(news.news);
    return (
        <div className="container">
            <h3>อัพเดทข่าวรถยนต์</h3>
            {newsdata.map((data)=>{
                return <CardNews data={data} key={data.post_id}/>
            })}
        </div>
    )
}

export default news

export async function getServerSideProps() {
    const res = await fetch(`http://localhost:3333/readpost`)
    const news = await res.json()
    return {
        props: {
            news
        },
    }
}