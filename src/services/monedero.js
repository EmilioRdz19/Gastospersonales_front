import axios from 'axios';

//Mandar llamar Monedero
export const getMonedero = async (id) => {
    const response = await axios.get(`monedero/${id}`);
    return response
}

//Agregar Gasto o Ingreso
export const agregarGastoOIngreso = async (item) => {
    const data = {
            "monedero": item.monedero,
            "periodo": item.periodo,
            "categoria": item.categoria,
            "tipo": item.tipo,
            "descripcion": item.descripcion,
            "monto": item.monto
    }
    const response = await axios.post('monedero', data);
    return response
}

//Eliminar Gasto o Ingreso
export const eliminarGastoOIngreso = async (id,tipo) => {
    const response = await axios.delete(`monedero/item/${id}`);
    return response
}