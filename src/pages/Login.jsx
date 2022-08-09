import { Button, TextField, FormControl } from "@mui/material"
import { useState } from "react"
import { registrarUsuario, buscarUsuario } from "../services/usuario"
import {useNavigate} from "react-router-dom"
export const Login = () => {
    const [data, setData] = useState()
    const navigate = useNavigate()
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        //Buscamos el usuario en la base de datos
        try {
            const usuario = await buscarUsuario(data.email)
            if(usuario.status === 200){
                console.log(usuario.data)
                localStorage.setItem("usuario", JSON.stringify(usuario.data))
                navigate("dashboard")
            }
        } catch (response) {
            if(response.response.status === 404){
                try {
                    const usuario = await registrarUsuario(data.email)
                    if(usuario.status === 200){
                        console.log("Usuario creado")
                        localStorage.setItem("usuario", JSON.stringify(usuario.data))
                        navigate("dashboard")
                    }
                } catch (error) {
                    console.log(error)
                }
            }else{
                console.log("Error al buscar el usuario")
            }
        }
    }

    return (
        <div className="min-h-screen bg-black flex justify-center items-center">
            <form onSubmit={handleSubmit}>
                <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
                    <div>
                        <h1 className="text-3xl font-bold text-center mb-4 cursor-default">Gastos</h1>
                        <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-default">
                            Entra con tu correo para crear una cuenta o iniciar sesión
                        </p>
                    </div>
                    <div className="space-y-4">
                        <TextField type="text"
                            label="Email"
                            name="email"
                            onChange={handleChange}
                            variant="outlined"
                            placeholder="example@utags.edu.mx"
                            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                    </div>
                    <div className="text-center mt-6">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className="w-full py-3 px-4 rounded-lg text-white font-semibold">
                            Entrar
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
