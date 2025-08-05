import Router from "express";
import { createProduct, deleteProduct, getAllProducts, getProductByID, updateAvailability, updateProduct } from './handlers/Producto';
import { handleInputErrors } from "./middleware";
import { body, param } from "express-validator";
import { isDataType } from "sequelize-typescript";
import { createUser, deleteUsersById, getAllUsers, getUsersByID, updateAvailabilityu } from "./handlers/Usuario";
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

/**
 * 
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Obtener un producto por id
 *          tags:
 *              - Products
 *          description: Regresa un producto
 * 
 *          parameters:
 *              - in: path
 *                name: id
 *                description: El ID del producto a consultar
 *                required: true
 *                schema:
 *                  type: integer
 * 
 *          responses:
 *
 *              200:
 *                  description: Respuesta exitosa 
 *                  content:
 *                      aplication/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 *              404:
 *                  description: No encontrado
 *              400:
 *                  description: Solicitud erronea - ID invalido
 * 
 */


/**
 * @swagger
 * /api/products:
 *       post:
 *          summary: Crea un nuevo producto
 *          tags: 
 *              - Products
 *          description: Retorna un nuevo registro en la base de datos
 *          
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo de 49 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 500
 *                              availability:
 *                                  type: boolean
 *                                  example: true              
 *  
 *          responses:
 *              201:
 *                  description: Respuesta Exitosa
 *                  content:
 *                      application/json:
 *                        schema:
 *                          $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Mala respuesta - Datos ivalidos
 *                  
 */

/**
 * @swagger
 * /api/products/{id}:
 *       put:
 *          summary: Modifica un producto
 *          tags: 
 *              - Products
 *          description: Modifica un registro dentro de la base de datos
 * 
 *          parameters:
 *              - in: path
 *                name: id
 *                description: El ID del producto a consultar
 *                required: true
 *                schema:
 *                  type: integer
 * 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Cuervos de 49 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 500
 *                                          
 *  
 *          responses:
 *              201:
 *                  description: Respuesta Exitosa
 *                  content:
 *                      application/json:
 *                        schema:
 *                          $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Mala respuesta - Datos ivalidos
 *                  
 */

/**
 * 
 * @swagger
 * /api/users:
 *      get:
 *          summary: Obtener una lista de usuarios
 *          tags:
 *              - Users
 *          description: Regresa una lista de usuarios
 *          responses:
 *              200:
 *                  description: Respuesta exitosa 
 *                  content:
 *                      aplication/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Usuario'
 */

/**
 * 
 * @swagger
 * /api/users/{id}:
 *      get:
 *          summary: Obtener un usuario por id
 *          tags:
 *              - Users
 *          description: Regresa un usuario
 * 
 *          parameters:
 *              - in: path
 *                name: id
 *                description: El ID del usuario a consultar
 *                required: true
 *                schema:
 *                  type: integer
 * 
 *          responses:
 *
 *              200:
 *                  description: Respuesta exitosa 
 *                  content:
 *                      aplication/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Usuario'
 *              404:
 *                  description: No encontrado
 *              400:
 *                  description: Solicitud erronea - ID invalido
 * 
 */

/**
 * @swagger
 * /api/users:
 *       post:
 *          summary: Crea un nuevo usuario
 *          tags: 
 *              - Users
 *          description: Retorna un nuevo registro en la base de datos
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              username:
 *                                  type: string
 *                                  example: "Carlitos Peña"
 *                              email:
 *                                  type: string
 *                                  example: "CarlosRodolfoRicardoPeña@gmail.com"
 *                              password:
 *                                  type: string
 *                                  example: "Carlos1234"              
 *  
 *          responses:
 *              201:
 *                  description: Respuesta Exitosa
 *                  content:
 *                      application/json:
 *                        schema:
 *                          $ref: '#/components/schemas/Usuario'
 *              400:
 *                  description: Mala respuesta - Datos ivalidos
 *                  
 */

router.get('/products', getAllProducts, (req, res) => {
    res.send("Llamando a Routimus Prime")
})
//create

router.get('/products/:id', param('id').isNumeric().isInt().withMessage('Id no es numerico'), handleInputErrors, getProductByID, (req, res) => {
    res.send("Hola desde get by id")
})


router.post('/products', body('name').notEmpty().withMessage('tonto te falto el nombre'), body('price').notEmpty().withMessage('tonto te falto el precio').isNumeric().withMessage('NO ES EL TIPO DE DATO CORRECTO').custom(value => value > 0).withMessage('valor no valido'), handleInputErrors, createProduct)


router.put('/products/:id', body('name').notEmpty().withMessage('tonto te falto el nombre'), body('price').notEmpty().withMessage('tonto te falto el precio').isNumeric().withMessage('NO ES EL TIPO DE DATO CORRECTO').custom(value => value > 0).withMessage('valor no valido'), param('id').isNumeric().isInt().withMessage('Id no es numerico'), handleInputErrors, updateProduct, (req, res) => {
    res.send("Hola desde get by id")
})

router.patch('/products/:id',
    param('id').isInt().withMessage('Id no valido'), handleInputErrors, updateAvailability
)



router.delete('/products/:id', param('id').isInt().withMessage('Id no valido'), handleInputErrors, updateAvailability, deleteProduct, (req, res) => {

    res.send("Hola desde delete")
})


router.get('/users', getAllUsers, (req,res) =>{
    res.send("Llamando a todos los usuarios")
} )

router.get('/users/:id', param('id').isNumeric().isInt().withMessage('Id no es numerico'), handleInputErrors, getUsersByID, (req, res) => {
    res.send("Hola desde get by id")
})

router.post('/users', body('username').notEmpty().withMessage('tonto te falto el nombre'), body('email').notEmpty().withMessage('tonto te falto el email'), body('password').notEmpty().withMessage('Tonto falto la contrasenia'), handleInputErrors, createUser)

router.patch('/users/:id',
    param('id').isInt().withMessage('Id no valido'), handleInputErrors, updateAvailabilityu
)



router.delete('/users/:id', param('id').isInt().withMessage('Id no valido'), handleInputErrors, updateAvailabilityu, deleteUsersById, (req, res) => {
    res.send("Hola desde delete")
})
export default router


//Tarea lo mismo que hicimos ahorita de productos pero para usuarios