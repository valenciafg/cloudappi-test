const mongoose = require('mongoose');

const user = process.env.DB_USER || 'admin';
const password = process.env.DB_PASSWORD || 'AFWGZeUgrAiSbkdp';
const host = process.env.DB_HOST || 'valenciafgcluster01.wzid5.mongodb.net';
const dbname = process.env.DB_NAME || 'test';

const uri = `mongodb+srv://${user}:${password}@${host}/${dbname}?retryWrites=true&w=majority`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const crearConexion = async() => {
  try {
    const conex = await mongoose.connect(uri, options);
    /*
    conex.Schema({
      id: Number,
      name: String,
      email: String,
      birthDate: String,
      address: {type: conex.Schema.Types.ObjectId, ref: 'User'},
    });

    conex.Schema({
      street,
      state,
      city,
      country,
      zip
    });
    */
    console.log('hay conexion');
  } catch (e) {
    console.log('hubo error', e)
  }
}

crearConexion();

