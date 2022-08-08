import axios from 'axios';

//Registrar Usuario
export const registrarUsuario = async (usuario) => {
    const respuesta = await axios.post('/usuario',{
        email: usuario,
    });
    return respuesta;
}

//Buscar Usuario
export const buscarUsuario = async (usuario) => {
    const respuesta = await axios.get(`/usuario/${usuario}`);
    return respuesta;
}