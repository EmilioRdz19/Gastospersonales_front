import axios from 'axios';

export const getCategorias = async () => {
    const response = await axios.get('categoria');
    return response
}

export const agregarCategoria = async (categoria) => {
    const data = {
            "nombre": categoria.nombre,
            "descripcion": categoria.descripcion
    }
    const response = await axios.post('categoria', data);
    return response
}
export const eliminarCategoria = async (id) => {
    const response = await axios.delete(`categoria/${id}`);
    return response
}