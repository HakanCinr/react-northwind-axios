import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Products() {
  const [productname, setproductname] = useState("")
  const [unitprice, setunitprice] = useState("")
  const [productid, setproductid] = useState("")

  const [products, setproducts] = useState([])

  useEffect(() => {
    load()
  }, [])

  const load = () => {
    axios.get("https://northwind.vercel.app/api/products")
      .then(res => {
        setproducts(res.data)
      })
      .catch(err => {
        console.log(err);
      });
  }

  const update = (id) => {
    const filter = products.find((product) => product.id === id)
    if (filter) {
      const updatedProduct = {
        ...filter,
        name: productname,
        unitPrice: unitprice
      }
      axios.put(`https://northwind.vercel.app/api/products/${id}`, updatedProduct)
        .then(res => {

          load();
        })
        .catch(err => {
          console.error(err)
        });
    } else {
      console.error("Product not found.");
    }
  }
  
  const itemClick = (item) => {
    setproductid(item.id);
    setproductname(item.name);
    setunitprice(item.unitPrice);
  }

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div>
          <div className="table-responsive">
            <table className="table table-primary">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Unitprice</th>
                </tr>
              </thead>
              <tbody>
              {products.map(item => (
                <tr key={item.id} onClick={() => itemClick(item)}>
                  <td scope="row">{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.unitPrice}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <label>Name</label>
          <input type='text' value={productname} onChange={(e) => setproductname(e.target.value)}></input>
          <label>unitPrice</label>
          <input type='number' value={unitprice} onChange={(e) => setunitprice(e.target.value)}></input>
          <button onClick={() => update(productid)}>Update</button>
        </div>
      </div>
    </>
  )
}

export default Products
