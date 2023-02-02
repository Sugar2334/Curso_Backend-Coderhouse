import { Router } from "express";
import ProductManager from "../container/ProductManager.js";

const productRouter = new Router();

const path = new ProductManager("./src/database/productslist.json");

//  listar todos los prods
productRouter.get("/", async (req, res) => {
  const prods = await path.getProducts();
  const { limit = 0 } = req.query; // '/products?limit=5'
  // const limit = req.query.limit
  if (limit === 0) {
    res.json(prods);
  } else if (limit > prods.length) {
    res.json({ error: "Limit Exceeded" });
  } else {
    let arr = [];
    prods.map((e, i) => {
      if (i < limit) arr.push(e);
    });
    res.json(arr);
  }
});

// traer el prod seleccionado
productRouter.get("/:pid", async (req, res) => {
  const params = req.params;
  const prods = await path.getProductById(Number(params.pid));
  res.json(prods);
});

// agregar producto
productRouter.post("/", async (req, res) => {
  const response = await path.addProduct(req.body);
  res.json(response)
});

// actualizar producto seleccionado
productRouter.put("/:pid", async (req, res) => {
  const id = req.params;
  const field = Object.keys(req.body).toString();
  const elem = Object.values(req.body).toString();
  const result = await path.updateProduct(Number(id.pid), field, elem);
  res.json(result);
});

// borrar producto seleccionado
productRouter.delete("/:pid", async (req, res) => {
  const id = req.params;
  const result = await path.deleteProduct(Number(id.pid));
  res.json(result)
});

export default productRouter;