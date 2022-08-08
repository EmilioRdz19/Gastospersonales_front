import axios from 'axios';

export const registrarUsuario = async (usuario) => {
    const respuesta = await axios.post('/usuario',{
        email: usuario,
    });
    return respuesta;
}

export const buscarUsuario = async (usuario) => {
    const respuesta = await axios.get(`/usuario/${usuario}`);
    return respuesta;
}