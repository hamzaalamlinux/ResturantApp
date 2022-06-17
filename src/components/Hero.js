import React, { useState, useEffect } from 'react'
import { useModalContext } from '../context/modal_context'
import { FaCamera } from 'react-icons/fa'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Card, Input } from 'semantic-ui-react'
// import { QrReader } from 'react-qr-reader'
const url = 'http://127.0.0.1:8000/api/GetFoods'
const Hero = () => {
 const [products, setProducts] = useState([])
 const { isModalOpen, closeModal } = useModalContext()
 const [searchInput, setSearchInput] = useState('')
 const fetchData = async () => {
  try {
   const { data } = await axios.get(url)
   setProducts(data)
  } catch (error) {}
 }

 useEffect(() => {
  fetchData()
 }, [])

 return (
  <Wrapper>
   <div className="form-control">
    <input
     type="text"
     name="text"
     placeholder="search"
     className="search-input"
     value="search"

    />
   </div>

   <div
    className={`${isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay'}`}
   >
    <div className="modal-container">
     <button className="close-modal-btn" onClick={closeModal}>
      <FaCamera></FaCamera>
     </button>
    </div>
   </div>
   {products.map((product) => {
    const { id, food_name, file_path, food_category, location } = product
    return (
     <div className="container" key={id}>
      <div
       className="card"
       style={{
        background: `url(http://127.0.0.1:8000/${file_path}) no-repeat center center`,
        backgroundSize: `cover`,
       }}
      >
       <div className="contentBx" >
        <div className="content-title" style={{ padding: '0.25rem' }}>
         <p>{food_name}</p>
        </div>

        <div className="color" >
         <p>{food_category}</p>
         <p>{location}</p>
         <a href="/">View</a>
        </div>
       </div>
      </div>
     </div>
    )
   })}
  </Wrapper>
 )
}

const Wrapper = styled.div`
 display: grid;
 align-items: center;
 justify-content: center;
 width: 100%;
 height: 100%;
 grid-gap: 3rem;
 /* In Size Order */
 .show-modal {
  visibility: visible;
  z-index: 100000000;
 }
 .qr-container {
  height: 70vh;
  width: 50vh;
  background: var(--mainGrey);
 }
 .modal-container {
  background: var(--offWhite);
  border-radius: var(--radius);
  margin: auto;
  width: 100%;
  height: 100%;
  max-width: var(--fixed-width);
  text-align: center;
  display: grid;
  place-items: center;
  position: relative;
 }

 .close-modal-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  background: transparent;
  border-color: transparent;
  color: var(--clr-red-dark);
  cursor: pointer;
 }
 .container {
  .card {
   position: relative;
   width: 100%;
   height: 100%;
   border-radius: 20px;
   overflow: hidden;

   display: flex;
   align-items: center;
   justify-content: center;
  }
  .card:before {
   content: '';
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;

   transition: 0.5s ease-in-out;
  }
  .card:after {
   position: absolute;
   top: 20%;
   left: -20%;
   /* font-size: 12em;
   font-weight: 800; */
   font-style: italic;
   background: blue;
  }

  .contentBx {
   position: absolute;
   height: 30vh;
   width: 30vh;
   margin-bottom: 2rem;
   text-align: center;
   transition: 1s;
   z-index: 10;
   background-color: var(--mainBlack);
   border-radius: 10%;
   font-family: roboto;
   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
   overflow-wrap: break-word;
   display: grid;
   justify-content: center;
   align-items: center;
  }
  .card:hover .contentBx {
   height: 100%;
   display: grid;
   grid-gap: 1.5rem;
   width: 22vh;

   border-radius: 0;
   margin-bottom: 0rem;
   margin-left: 0rem;
  }
  .card .contentBx p {
   position: relative;
   font-weight: 600;
   letter-spacing: 1px;
   border-radius: 20%;
   color: var(--mainWhite);
   margin: 0;
  }

  .size,
  .container .card .contentBx .color {
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 8px 20px;
   transition: 0.5s;
   opacity: 0;
   visibility: hidden;
   padding-top: 0;
   padding-bottom: 0;
  }
  .card:hover .contentBx .size {
   opacity: 1;
   visibility: visible;
   transition-delay: 0.5s;
  }
  .card:hover .contentBx .color {
   opacity: 1;
   visibility: visible;
   transition-delay: 0.6s;
  }
  .card .contentBx .size h3,
  .container .card .contentBx .color h3 {
   color: white;
   font-weight: 300;
   font-size: 14px;
   text-transform: uppercase;
   letter-spacing: 2px;
   margin-right: 10px;
  }
  .card .contentBx .size span {
   width: 26px;
   height: 26px;
   text-align: center;
   line-height: 26px;
   font-size: 14px;
   display: inline-block;
   color: #111;
   background: #fff;
   margin: 0 5px;
   transition: 0.5s;
   color: #111;
   border-radius: 4px;
   cursor: pointer;
  }
  h3 {
   color: var(--offWhite);
  }

  .card .contentBx a {
   display: inline-block;
   padding: 10px 20px;
   background: #fff;
   border-radius: 4px;
   margin-top: 10px;
   text-decoration: none;
   font-weight: 600;
   color: #111;
   opacity: 0;
   transform: translateY(50px);
   transition: 0.5s;
   margin-top: 0;
  }
  .card:hover .contentBx a {
   opacity: 1;
   transform: translateY(0px);
   transition-delay: 0.75s;
  }
 }
 .card .contentBx p {
  font-size: 2rem;
 }
 .contentBx .color p {
  font-size: 1.5rem;
 }
 /* Extra small devices (phones, 600px and down) */
 @media only screen and (max-width: 600px) {
  padding: 2rem;
  .container {
   height: 45vh;
   width: 40vh;
  }
  .container .contentBx {
   height: 30vh;
   width: 30vh;
  }
  .card .contentBx p {
   font-size: 2.2rem;
  }
  .contentBx .color p {
   font-size: 1.4rem;
  }
 }
 /* Small devices (portrait tablets and large phones, 600px and up) */
 @media only screen and (min-width: 600px) {
  padding: 3rem;

  .container {
   height: 50vh;
   width: 45vh;
  }

  .modal-container {
   width: 100%;
   height: 100%;
  }
  .container .contentBx {
   height: 32vh;
   width: 32vh;
  }
  .card .contentBx p {
   font-size: 2.5rem;
  }
  .contentBx .color p {
   font-size: 1.5rem;
  }
 }
 /* Medium devices *landscape tablets, 768px and up) */
 @media only screen and (min-width: 768px) {
  .container {
   height: 53vh;
   width: 48vh;
  }

  .modal-container {
   width: 75vh;
   height: 75vh;
  }
  .container .contentBx {
   height: 35vh;
   width: 35vh;
  }
  .card .contentBx p {
   font-size: 2.3rem;
  }
  .contentBx .color p {
   font-size: 1.5rem;
  }
 }
 /* Large devices (lapto/desktops, 992px and up) */
 @media only screen and (min-width: 992px) {
  .container {
   height: 58vh;
   width: 52vh;
  }

  .modal-container {
   width: 75vh;
   height: 75vh;
  }
  .container .contentBx {
   height: 40vh;
   width: 40vh;

  }
  .card .contentBx p {
   font-size: 2.4rem;
  }
  .contentBx .color p {
   font-size: 1.6rem;
  }
 }
 /* Extra large devices (large laptops and desktops, 1200px and up) */
 @media only screen and (min-width: 1200px) {
  .container {
   height: 62vh;
   width: 55vh;
  }
  .modal-container {
   width: 75vh;
   height: 75vh;
  }
  .container .contentBx {
   height: 40vh;
   width: 40vh;
  }
  .card .contentBx p {
   font-size: 2.7rem;
  }
  .contentBx .color p {
   font-size: 1.6rem;
  }
 }
`
export default Hero
