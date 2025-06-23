/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas URI aquí
mongoose.connect('mongodb+srv://gutierrezvelvett:Jz0FD5Vr1dVoW92v@cluster0.wb8dkf4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB conectado'))
    .catch(err => console.error(err));

// Modelo de usuario
const User = mongoose.model('User', new mongoose.Schema({
    email: String,
    password: String,
}));

// Ruta: Registrar
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Usuario ya existe' });
    const newUser = new User({ email, password });
    await newUser.save();
    res.json({ message: 'Registrado con éxito' });
});

// Ruta: Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });
    res.json({ message: 'Login exitoso' });
});

app.listen(3000, () => {
    console.log('Servidor escuchando en puerto 3000');
});
*/
