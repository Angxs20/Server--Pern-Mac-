// src/handlers/product.ts
import { Request, Response } from 'express';
import Product from '../models/Producto.mo';


export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: 'Error al crear producto' });
  }
};


export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [['price', 'DESC']],
    });
    // 👉 los tests usan res.body.data como array
    return res.json({ data: products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener productos' });
  }
};


export const getProductByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      // 👉 tests esperan 404 (no validan body)
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // 👉 tests hacen expect(res.body.name)
    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener producto' });
  }
};


export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await product.update(req.body);

    // 👉 tests leen res.body.name/price
    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al actualizar producto' });
  }
};


export const updateAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    product.availability = !product.availability;
    await product.save();


    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al actualizar availability' });
  }
};


export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCount = await Product.destroy({ where: { id } });

    if (!deletedCount) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    return res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al eliminar producto' });
  }
};
