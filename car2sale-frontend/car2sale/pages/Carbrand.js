function Carbrand({carbrands}) {
    return (
        <>
            {carbrands.map(carbrand => {
                    return (
                        <option key={carbrand.cb_id} value={carbrand.cb_id}>{carbrand.cb_name}</option>
                    )
                })
            }
        </>
    )
}

export default Carbrand

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3333/getcarbrand')
    const data = await res.json()

    return {
        props: {
            carbrands: data,
        },
    }
}