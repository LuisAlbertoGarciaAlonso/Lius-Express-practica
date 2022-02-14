const mongoose = require ('mongoose');

  const Schema = mongoose.Schema;

  const productoSchema = new Schema({
    nombre:  String, // String is shorthand for {type: String}
    descripcion: String, 
  });

  const Producto = mongoose.model('Producto', productoSchema);

  module.exports=Producto;