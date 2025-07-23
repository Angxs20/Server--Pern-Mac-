import{ check, Result, validationResult} from 'express-validator';
import { Response,Request,NextFunction } from 'express';


export const handleInputErrors = async (req:Request,res:Response, next:NextFunction)=>{

     
     // await check('price')
     // .notEmpty().withMessage('Falto el precio')
     // .isNumeric().withMessage('El formato es invalid0')
     // .custom((value)=> value > 0).withMessage('El valor no es aceptado en precio')
     // .run(req)
     // await check('name')
     // .notEmpty().withMessage('Falto el nombre')
     // .isString().withMessage('El formato es invalid0')
     // .custom((value)=> value.length > 0).withMessage('El valor no es aceptado en nombre')
     // .run(req)

     let errors = validationResult(req)
     if(!errors.isEmpty()){
          return res.status(400).json({error:errors})
    }
     next()
}

