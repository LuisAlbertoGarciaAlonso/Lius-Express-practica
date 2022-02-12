const mongoose = require ('mongoose');

  const Schema = mongoose.Schema;

  const mascotaSchema = new Schema({
    nombre:  String, // String is shorthand for {type: String}
    descripcion: String, 
  });

  const Mascota = mongoose.model('Mascota', mascotaSchema);

  module.exports=Mascota;