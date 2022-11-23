import { useState } from "react"
import { Form } from "react-bootstrap";


const Search = ()=> {

  const [search,setSearchQuery] = useState('')

  const handdleSearchFormSubmit = () => {
    return null;
  }

  return (
    <>
      <Form>
        <input type="text" placeholder="คุณกำลังมองหารถรุ่นอะไรอยู่"></input>
        <select></select>
      </Form>
    </>
  )
}


export default Search