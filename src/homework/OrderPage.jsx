import axios from 'axios'
import React, { useEffect, useState } from 'react'


function OrderPage() {

  const [order, setorder] = useState([])

const load=() =>{
  axios.get('https://northwind.vercel.app/api/orders')
  .then(res => {
    setorder(res.data)    
    })
  }
  useEffect(() => {
    load()
    }, [])

    const deleteCategory = (id) => {
      axios.delete('https://northwind.vercel.app/api/orders/'+id)
      .then(res => {
        load()
       
        })        
    }


  return (
    <>
    <div> <h1>Order Count: {order.length} </h1> </div>
    <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>shipName</th>
                    <th>shipVia</th>
                    <th>Id</th>
                </tr>
            </thead>
            <tbody>
                {
                    order && order.map(item => {
                        return <tr>
                            <td>{item.id}</td>
                            <td>{item.shipName}</td>
                            <td>{item.shipVia}</td>
                            <td><button onClick={()=>deleteCategory(item.id)} >Delete</button></td>
                        </tr>
                    })
                }
            </tbody>
        </table>

    
    
    
    </>
  )
}

export default OrderPage