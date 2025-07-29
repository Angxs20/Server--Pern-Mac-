//Aca va la descripcion, los titulos y lo que vamos a manejar
//La libreria general
import swaggerJSDoc from "swagger-jsdoc";
//La configuracion de la libreria
import { SwaggerUiOptions } from "swagger-ui-express";

const option : swaggerJSDoc.Options={
    swaggerDefinition: {
        openapi: '3.0.2',
        tags:[
            {
            name: 'Products',
            description: 'Operaciones de API Pern con productos'
            }
            // {
            // name: 'Products',
            // description: 'Operaciones de API Pern con productos'
            // }
        ],
        info:{
            title: 'REST API Node.js/ Express / Typescript',
            version: "1.0.0",
            description: "API Documentacion para productos"
        }
    },
    apis: ['./src/router.ts']
}
 const swaggerSpec = swaggerJSDoc(option)

 const swaggerUiOptions : SwaggerUiOptions = {
    customCss : `
        .topbar-wrapper .link {
            content: url('https://codigoconjuan.com/wp-content/themes/cursosjuan/img/logo.svg');
            height: 80px;
            width: auto;
        }
        .swagger-ui .topbar {
            background-color: #2b3b45;
        }
    `,
    customSiteTitle: 'Documentación REST API Express / TypeScript'
}

 export default swaggerSpec
 export{
    swaggerUiOptions
 }