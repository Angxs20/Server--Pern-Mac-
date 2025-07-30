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
 *          Usuario:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: El id del usuario
 *                      example: 1
 *                  username:
 *                      type: string
 *                      description: El nombre del usuario
 *                      example: Alejandro
 *                  email:
 *                      type: string
 *                      description: el email del usuario
 *                      example: alealejandroang20@gmail.com
 *                  password:
 *                      type: string
 *                      description: La contraseña del usuario
 *                      example: salsa12
 *                  role:
 *                      type: user
 *                      description: Define el rol del usuario
 *                      example: user
 *                  isActive:
 *                      type: boolean
 *                      description: Define si el usuario esta activo o no
 *                      example: true
 */

/**
 * 
 * @swagger
 * /api/products:
 *      get:
 *          summary: Obtener una lista de los productos
 *          tags:
 *              - Products
 *          description: Regresa una lista de productos
 *          responses:
 *              200:
 *                  description: Respuesta exitosa 
 *                  content:
 *                      aplication/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
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
