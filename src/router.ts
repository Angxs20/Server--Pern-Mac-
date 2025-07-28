import  Router  from "express";
import { createProduct, deleteProduct, getAllProducts, getProductByID, updateAvailability, updateProduct } from './handlers/Producto';
import { handleInputErrors } from "./middleware";
import { body, param } from "express-validator";
import { isDataType } from "sequelize-typescript";
const router = Router();


router.get('/', getAllProducts,(req, res)=>{
    res.send("Llamando a Routimus Prime")
})
//create

router.get('/:id',param('id').isNumeric().isInt().withMessage('Id no es numerico'),handleInputErrors, getProductByID, (req, res)=>{
    res.send("Hola desde get by id")
})


router.post('/', body('name').notEmpty().withMessage('tonto te falto el nombre'), body('price').notEmpty().withMessage('tonto te falto el precio').isNumeric().withMessage('NO ES EL TIPO DE DATO CORRECTO').custom(value => value>0).withMessage('valor no valido'),handleInputErrors,createProduct)

router.put('/:id',body('name').notEmpty().withMessage('tonto te falto el nombre'), body('price').notEmpty().withMessage('tonto te falto el precio').isNumeric().withMessage('NO ES EL TIPO DE DATO CORRECTO').custom(value => value>0).withMessage('valor no valido'),param('id').isNumeric().isInt().withMessage('Id no es numerico'),handleInputErrors, updateProduct, (req, res)=>{
    res.send("Hola desde get by id")
})

 router.patch('/:id',
    param('id').isInt().withMessage('Id no valido'),handleInputErrors,updateAvailability
 )


router.delete('/:id',param('id').isInt().withMessage('Id no valido'),handleInputErrors,updateAvailability,deleteProduct,(req,res)=>{
   
    res.send("Hola desde delete")
})
export default router
