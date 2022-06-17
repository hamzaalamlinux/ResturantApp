import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../assets/styles/style.css";

function AddFood() {
  // React States
   //use state from add values//
   const [food_name , setFoodName] = useState("");
   const [file , setFile] = useState("");
   const [food_category , setFood_category] = useState("");
   const [location , setFood_Location] = useState("");

  function AddFood(event){
     const formData = new FormData();
     formData.append('food_name' , food_name);
     formData.append('file' , file);
     formData.append('food_category' , food_category);
     formData.append('location' , location);
     let result =  fetch("http://127.0.0.1:8000/api/AddFood" , {
         method : 'POST',
         body : formData
     }).then((response) => response.json())
     .then((responseData) => {
    
       if(responseData.statusCode == 200){
          alert(responseData.Message);
          setFoodName('');
          setFile('');
          setFood_category('');
          setFood_Location('');

       }else{
           alert(responseData.Message);
       }
     })
       
   }
  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form >
        <div className="input-container">
          <label>Username </label>
          <input type="text" name = "food_name" value={food_name} onChange={(e)=>setFoodName(e.target.value)} required />
         
        </div>
        <div className="input-container">
          <label>File: </label>
          <input type="file" name="file"  onChange={(e)=>setFile(e.target.files[0])}  required />
         
        </div>
        
        <div className="input-container">
          <label>Category: </label>
          <input type="text" name="category" value = {food_category}  onChange={(e)=>setFood_category(e.target.value)}  required />
         
        </div>
        <div className="input-container">
          <label>Location: </label>
          <input type="text" name="location" value={location}  onChange={(e)=>setFood_Location(e.target.value)}  required />
         
        </div>
        <div className="button-container">
          <input type="button" value="Add Food" onClick={AddFood} />
        </div>
      </form>
    </div>
  );

  return (
    <div className="login_app">
      <div className="login-form">
        <div className="title">Add Food</div>
        {renderForm}
      </div>
    </div>
  );
}

export default  AddFood;