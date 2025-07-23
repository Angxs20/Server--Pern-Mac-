import {Request, Response} from 'express'
import { error, log } from 'console';
import products from '../models/Producto.mo';
import {check, ExpressValidator, validationResult} from 'express-validator';
import { errorMonitor } from 'events';


export const createProduct = async (req : Request, res : Response)=>{
    /*
    const product = new Product(req.body) product.save() console.log(req.body)
    */
   //validar nombre y precio

   
    // await check('name').notEmpty().withMessage('tonto te falto el nombre').run(req)
    // await check('price')
    // .notEmpty().withMessage('Falto el precio')
    // .isNumeric().withMessage('El formato es invalid0')
    // .custom((value)=> value > 0).withMessage('El valor no es aceptado en precio')
    // .run(req)
    
    const product = await products.create(req.body)
    res.json({data: product})
    




    }
//Get Products
export const getAllProducts = async (req:Request,res:Response )=>{
    try {
        const product = await products.findAll(
            {
                order:[
                    ['price','DESC'] 
                ]
                
            }
        );
        res.json({data: product})
    } catch (error) {
        console.log(error);
    }

    // const productos = await products.findAll()
    // if(products.length === 0){
    //     return res.status(404).json({error: "No hay productos"})
    // }
    // res.json({data:products})
    // //res.send("Hola desde get all")
    
};

//Get Product by ID
export const getProductByID = async (req:Request,res:Response )=>{
    try {
        const {id} = req.params;
        const product = await products.findByPk(id);
        if(!product){
            return res.status(404).json({
                error: 'producto no encontrado'
            })
        }
       res.json
    } catch (error) {
        console.log(error);
        
    }


    // const {id} = req.params;
    // const product = await products.findByPk(id)
    // if(!product){
    //     return res.status(404).json({error: "No existe el producto"})
    // }
    // res.json({data:product})
    // //res.send("Hola desde get by id")
    
    
}

//UPDATE product
export const updateProductByID = async (req:Request,res:Response )=>{

    try {
        const {id} = req.params;
        const product = await products.findByPk(id);
        if(!product){
            return res.status(404).json({
                error: 'producto no encontrado'
            })
        }
          await product.update(req.body)
          await product.save()  

            res.json({data:product});
      }catch(error){
        console.log(error);
      }
    };


    

    // const {id} = req.params;
    // const product = await products.findByPk(id)
    // console.log(req.body)
    // if(!product){
    //     return res.status(404).json({error: "No existe el producto",  data: product})
    // }
    // //actualizar
    // await product.update(req.body)
    // res.json({data:product})
    // //res.send("Hola desde put")
    



//Delete product
export const deleteProductById = async (req:Request,res:Response )=>{
    try {
        const {id} = req.params;
        const product = await products.findByPk(id);
        if(!product){
            return res.status(404).json({
                error: 'producto no encontrado'
            })
        }
        await product.destroy()
        res.json({data: product});
    } catch (error) {
        console.log(error);
    }


    // const {id} = req.params;
    // const product = await products.findByPk(id)
    // if(!product){
    //     return res.status(404).json({error: "No existe el producto"})
    // }
    // //borrar
    // await product.destroy()
    // res.json({data:product})
    // //res.send("Hola desde delete")
    
    
};

export const updateAvailabilty = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const product = await products.findByPk(id);
        if(!product){
            return res.status(404).json({
                error: 'producto no encontrado'
            })
        }
        product.availability = !product.dataValues.availability;
        await product.save()
       res.json(`{data: product deleted id: ${id}}`);
    } catch (error) {
        console.log(error);
        
    }
};
