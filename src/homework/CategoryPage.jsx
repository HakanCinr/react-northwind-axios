import axios from 'axios'
import React, { useEffect, useState } from 'react'


function CategoryPage() {

const [categoryName, setcategoryName] = useState("")
const [categoryDesc, setcategoryDesc] = useState("")

const [category, setcategory] = useState([])

useEffect(() => {
    load()
},[])

const load = () =>{
    axios.get('https://northwind.vercel.app/api/categories')
    .then(res => {
        setcategory(res.data)
        })
}

const add = () =>{
    let newcategory = {
        name : categoryName,
        description : categoryDesc
    }
    axios.post('https://northwind.vercel.app/api/categories', newcategory)
    .then(res => {
        load()
        })
        }



  return (
<>


<div> <h1>Category Page</h1> </div>
<div>
<label>Name</label> <input type='text' value={categoryName} onChange={(e)=> setcategoryName(e.target.value)} ></input>

</div>
<div>
<label>Description</label> <input type='text' value={categoryDesc} onChange={(e)=> setcategoryDesc(e.target.value)} ></input>

</div>

<div><button onClick={()=> add()} >Add</button></div>

<div>
<div> <h1>Category List</h1> </div>
<table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {
                    category && category.map(item => {
                        return <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>


</div>






</>
  )
}

export default CategoryPage