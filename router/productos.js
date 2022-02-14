const express = require('express');
const router = express.Router();

const Producto = require('../models/producto');

router.get('/', async (req,res)=>{
    try {
        const arrayProductosDB = await Producto.find();
        console.log(arrayProductosDB);

        res.render('productos',{
            arrayProductos : arrayProductosDB
        });

    } catch (error) {
        console.log(error)
    }    
});

router.get('/crear', (req, res) => {
    res.render('crear');
});

router.post('/', async(req, res) =>{
    const body = req.body;
    try {
        const productoDB = new Producto(body);
        await productoDB.save();
        res.redirect('/productos');
    } catch (error) {
        console.log(error);
    }
});

router.get("/:id" ,async (req, res) => {
    const id = req.params.id;
    try {
        const productoDB = await Producto.findOne({ _id : id });//mongo trabaja co el id con _ entonces hay que darle el valor al id
        
        res.render("detalle",{
            producto: productoDB,
            error:false
        })
    } catch (error) {
        res.render("detalle",{
            error: true,
            mensaje: "no se encuenta id"
        })
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    
    try {
        const productoDB = await Producto.findByIdAndDelete({ _id: id });
        console.log(productoDB)
        if (productoDB) {
            res.json({
                estado: true,
                mensaje: 'eliminado!'
            })
        } else {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar'
            })
            
        }
        
    } catch (error) {
        console.log(error)
    }
});

router.put('/:id', async ( req, res )=>{
    const id = req.params.id;
    const body = req.body;

    try {
        const productoDB = await Producto.findByIdAndUpdate(
            id, body, {useFindAndModify: false});
            res.json({
                estado: true,
                mensaje:"editado!"
            });
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje:"algo fallo!"
        });
    };
});


module.exports = router;