import Search from '../comps/Search'
import styles from '../styles/index.module.css'
import Carouselcar from '../comps/Carouselcar'


export default function Home({cardata}) {
  return (
    <div className={styles.index}>
      <div className="container">
        <h1 className='pt-5'>Car2Sale</h1>
        <h2 className='mt-5'>ซื้อขายรถของคุณได้อย่างง่ายดายและรวดเร็ว</h2>
        <Search/>
        <Carouselcar cardata={cardata}/>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3333/getdatasalecar/all')
  const data = await res.json()

  return {
      props: {
          cardata: data,
      },
  }
}

