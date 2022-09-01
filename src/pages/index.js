import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

const ProductTitle = styled.p`
  font-weight: 800;
  font-size: 24px;
  text-align: center;
`
const ProductDescription = styled.p`
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  color: #57554d;
`
const Price = styled.button`
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  color: #57554d;
  display: block;
  margin: auto;
`
const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  border: 1px solid #57554d;
  border-radius: 3px;
  ::placeholder {
    color: #57554d;
  }
  color: #57554d;
`

// const Image = styled.img`
//   width: 100px;
//   height: 100px;
// `

const CardWrapper = styled.div`
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 30px;

  @media (max-width: 750px) {
    grid-template-columns: auto;
    padding: 10px;
  }
`
const IndexPage = ({ data: { products } }) => {
  const [filterData, setFilterData] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    setFilterData(products.nodes)
  }, [])
  const filterFunction = e => {
    let search = e.target.value
    if (search !== "" && search.length > 2) {
      setSearch(search)
      let results = filterData.filter(searchItem => {
        return searchItem.name.toLowerCase().includes(search.toLowerCase())
      })

      setFilterData(results)
    } else {
      setFilterData(products.nodes)
    }
  }
  return (
    <>
      <Input placeholder="search by name" onKeyUp={e => filterFunction(e)} />
      <Grid>
        {filterData.map((product, index) => (
          <CardWrapper key={index}>
            <ProductTitle key={product.name}>{product.name}</ProductTitle>
            <ProductDescription key={product.description}>
              {product.description}
            </ProductDescription>
            <Price key={product.price}>$ {product.price}</Price>
            {/* <Image images={product.image} /> */}
          </CardWrapper>
        ))}
      </Grid>
    </>
  )
}

export const query = graphql`
  query {
    products: allProductsJson {
      nodes {
        name
        description
        price
      }
    }
  }
`

export default IndexPage
