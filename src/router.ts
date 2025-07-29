import Router from "express";
import { createProduct, deleteProduct, getAllProducts, getProductByID, updateAvailability, updateProduct } from './handlers/Producto';
import { handleInputErrors } from "./middleware";
import { body, param } from "express-validator";
import { isDataType } from "sequelize-typescript";
const router = Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor Curvo de 49 Pulgadas
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */

router.get('/', getAllProducts, (req, res) => {
    res.send("Llamando a Routimus Prime")
})
//create

router.get('/:id', param('id').isNumeric().isInt().withMessage('Id no es numerico'), handleInputErrors, getProductByID, (req, res) => {
    res.send("Hola desde get by id")
})


router.post('/', body('name').notEmpty().withMessage('tonto te falto el nombre'), body('price').notEmpty().withMessage('tonto te falto el precio').isNumeric().withMessage('NO ES EL TIPO DE DATO CORRECTO').custom(value => value > 0).withMessage('valor no valido'), handleInputErrors, createProduct)

router.put('/:id', body('name').notEmpty().withMessage('tonto te falto el nombre'), body('price').notEmpty().withMessage('tonto te falto el precio').isNumeric().withMessage('NO ES EL TIPO DE DATO CORRECTO').custom(value => value > 0).withMessage('valor no valido'), param('id').isNumeric().isInt().withMessage('Id no es numerico'), handleInputErrors, updateProduct, (req, res) => {
    res.send("Hola desde get by id")
})

router.patch('/:id',
    param('id').isInt().withMessage('Id no valido'), handleInputErrors, updateAvailability
)



router.delete('/:id', param('id').isInt().withMessage('Id no valido'), handleInputErrors, updateAvailability, deleteProduct, (req, res) => {

    res.send("Hola desde delete")
})
export default router
