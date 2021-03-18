const cors = require("cors");
const express =  require("express")
const stripe = require("stripe") ("sk_test_51HX41GCzeG5OnntcAd0pGKbtOzHjP0qiAW5hxai7NQJ9F8MCKpK1Fr8jYhhWJEITEg9T7cmMJrtVw0HN2cGpVZsi00r3Yqc82B")
const uuid = require("uuid")

const app = express();

//middleware
app.use(express.json())
app.use(cors())

//routes
app.get("/", (req, res) => {
 res.send("It works at this website");
});
app.post("/payment", (req, res) => {
 const {product, token} = req.body;
 console.log("PRODUCT", product);
 console.log("PRICE", product.price);

 const idempontencyKey = uuid() 

 return stripe.customers.create({
     email: token.email,
     source: token.id
 }).then(customer => {
     stripe.charges.create({
         amount: product.price * 100,
         currency: 'usd',
         customer: customer.id,
         receipt_email: toke_email,
         description: `purchase of product.name`,
         shipping: {
             name: token.card.name,
             address: {
                 country: token.card.address_country
             }
         }
 }, {idempontencyKey}
 );
 })
  .then(result => res.status(200).json(result))
  .catch(err => console.log(err) );
});


//listen
app.listen(8282, () => console.log("Listening at Port 8282"))