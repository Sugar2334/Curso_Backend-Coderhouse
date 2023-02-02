import express from "express";
import cartRouter from './src/routes/cart-router.js'
import productRouter from './src/routes/products-router.js'

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/cart', cartRouter)
app.use('/api/products', productRouter)

app.listen("8080", () => {
    console.log("200 OK");
});

export default app