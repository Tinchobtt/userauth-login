export const validateSchema = (schema) => (req, res, next) =>{
    try{
        schema.parse(req.body) //Ejecuta la validacion del schema enviado
        next()
    }catch(error){
        res.status(500).json({message: error.errors.map(error => error.message)})
    }
}