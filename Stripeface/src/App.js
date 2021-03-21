import pay from './pay.jpeg';
import './App.css';
import StripeCheckout from "react-stripe-checkout"
import { useState } from 'react';

function App() {

  const [product, setProduct] = useState ({
    name: "React",
    price: 10,
    productBy: "facebook"
  })

const makePayment = token => {
   const body = {
     token,
     product
   }
   const headers = {
     "Content-Type": "Application/json"
   }


   return fetch(`http://localhost:8282/payment`, {
     method: "POST",
     headers,
     body: JSON.stringify(body)
   }).then(response => {
     console.log("RESPONSE ", response)
     const {status} = response;
     console.log("STATUS", status)
   })
   .catch(error => console.log(error))
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={pay} className="App-logo" alt="logo" />
       
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Transaction Manager
        </a>
        <StripeCheckout 
        stripeKey="pk_test_51HX41GCzeG5OnntccstcCCMn3272XB1nj5ifUMihe0NKrkO0yQqJ1jdXrZAkLqWxVIEalOwBs73uVVpi7XEoHk5D00Gppa4w93"
        token={makePayment}
        name="Buy Api/Template"
        amount= {product.price * 100}
         >
         <button className="btn-large pink"> Buy Api/Template {product.price}$10 </button>
         </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
