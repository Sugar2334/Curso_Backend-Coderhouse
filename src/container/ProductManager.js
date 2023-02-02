import fs from "fs/promises";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      return JSON.parse(read);
    } catch (err) {
      console.log(err);
    }
  }

  async addProduct(obj) {
    try {

      if (obj.title && obj.description && obj.code && obj.price && obj.stock && obj.category) {
        const read = await fs.readFile(this.path, "utf-8");
        const prods = JSON.parse(read);
        const id = prods.length === 0 ? 0 : Number(prods[prods.length - 1].id) + 1
        prods.push({ id, status: true, ...obj });
        await fs.writeFile(this.path, JSON.stringify(prods, null, 2), "utf-8");
        return { message: 'Producto agregado correctamente' }
      } else {
        return { error: 'error' }
      }

    } catch (err) {
      console.log(err);
    }
  }

  async getProductById(id) {
    const read = await fs.readFile(this.path, "utf-8");
    const prods = JSON.parse(read);
    const isHere = prods.find((e) => e.id === id);
    if (isHere) {
      return isHere;
    } else {
      return { error: 'No se encuentra' };
    }
  }

  async updateProduct(id, field, elem) {
    const read = await fs.readFile(this.path, "utf-8");
    const prods = JSON.parse(read);
    const isHere = prods.find((e) => e.id === id);
    if (isHere) {
      let item = prods.find((e) => e.id === id);
      item[field] = elem;
      prods.splice(id, 1, item);
      await fs.writeFile(this.path, JSON.stringify(prods, null, 2), "utf-8");
      return { mesage: 'Producto actualizado' }
    } else {
      return { error: 'No encontrado' };
    }
  }

  async deleteProduct(id) {
    const read = await fs.readFile(this.path, "utf-8");
    const prods = JSON.parse(read);
    const isHere = prods.find((e) => e.id === id);
    if (isHere) {
      const filter = prods.filter((e) => e.id !== id);
      await fs.writeFile(this.path, JSON.stringify(filter, null, 2), "utf-8");
      return { message: 'Producto eliminado' }
    } else {
      return { error: 'No encontrado' };
    }
  }
}

export default ProductManager;