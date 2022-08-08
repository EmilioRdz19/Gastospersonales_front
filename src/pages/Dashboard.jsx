import React from 'react'
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getCategorias, agregarCategoria } from '../services/categoria'
import { agregarGastoOIngreso, eliminarGastoOIngreso, getMonedero } from '../services/monedero'
import Modal from '@mui/material/Modal';

import {
    Button,
    TextField,
    Select,
    MenuItem,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormControl,
    InputLabel,
} from "@mui/material"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const Dashboard = () => {
    const [t, i18n] = useTranslation("global")
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState();
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false);
    const [listado, setListado] = useState();
    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('usuario')));
    const [valorRadio, setValorRadio] = useState('');
    const navigate = useNavigate()
    const handleChangeRadio = (event) => {
        if (event.target.value == "gasto") return setValorRadio("gasto");
        if (event.target.value == "ingreso") return setValorRadio("ingreso");
    };

    const handleClose = () => {
        setOpen(!open);
    }
    const handleChangeSelect = (event) => {
        setCategoria(event.target.value);
    };
    const handleSubmitAddCategory = async (e) => {
        e.preventDefault();
        try {
            const response = await agregarCategoria(categoria);
            console.log(response)
            if (response.status === 200) {
                handleClose()
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleChangeAddCategory = (e) => {
        setCategoria({ ...categoria, [e.target.name]: e.target.value })
    }


    useEffect(() => {
        setLoading(true)
        const obtenerCategorias = async () => {
            const cat = await getCategorias()
            const list = await getMonedero(usuario.monedero)
            setListado(list.data.msg[0])
            setCategorias(cat.data)
            setLoading(false)
        }
        obtenerCategorias()
    }, [update, usuario])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const info = {
            "monedero": usuario.monedero,
            "periodo": data.periodo,
            "categoria": "62ef63e33a3dc544c1f12dd0",
            "tipo": valorRadio,
            "descripcion": data.descripcion,
            "monto": data.monto,
        }
        try {
            const response = await agregarGastoOIngreso(info);
            console.log(response)
            if (response.status === 200) {
                setUpdate(!update)
                alert(response.data.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
    }

    const listarDatos = async () => {
    }


    const salir = () => {
        localStorage.removeItem("usuario");
        navigate("/");
    }
    console.log(listado)
    return (
        <div className='min-h-screen bg-gray-500'>
            <div className="w-full flex flex-row justify-between">
                <div className='mx-10 w-full my-5'>
                    <Button
                        type='button'
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => { i18n.changeLanguage("en") }}
                    >
                        {t("navbar.ingles")}
                    </Button>
                </div>
                <div className='mx-10 w-full my-5'>
                    <Button
                        type='button'
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => { i18n.changeLanguage("es") }}
                    >
                        {t("navbar.espanol")}
                    </Button>
                </div>
                <div className='mx-10 my-5'>
                    <Button
                        type='button'
                        variant="contained"
                        color="error"
                        fullWidth
                        onClick={salir}
                    >
                        Salir
                    </Button>
                </div>

            </div>
            <div className='bg-white rounded-xl m-5 p-5'>
                <div className="flex flex-row justify-around">
                    <p>{t("body.monedero")}:{usuario.monedero} </p>
                    <p>{t("body.email")}: {usuario.email}</p>
                </div>
            </div>
            <div className='rounded-xl m-5 p-5'>
                <div className="flex flex-row justify-around">
                    <Button
                        type='button'
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleClose}
                    >Agregar Categoria</Button>
                </div>
            </div>
            <div class="grid gap-x-8 gap-y-1 grid-cols-2 mx-20">

                <div className='bg-slate-50 border border-black rounded-2xl'>
                    <div className='border-b border-black mb-5 pb-2'>
                        <h3 className='text-center text-3xl'>{t("body.des")}</h3>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit={handleSubmit}>
                                <div className='flex flex-row justify-center'>
                                    <RadioGroup
                                        row
                                        onChange={handleChangeRadio}
                                        name="radio">
                                        <FormControlLabel value="gasto" control={<Radio />} label={t("body.gasto")} />
                                        <FormControlLabel value="ingreso" control={<Radio />} label={t("body.ingreso")} />
                                    </RadioGroup>
                                </div>
                                <div className='flex flex-col m-5 items-stretch'>
                                    <div className='my-5'>
                                        <TextField
                                            type="text"
                                            onChange={handleChange}
                                            className="form-control"
                                            name="periodo"
                                            fullWidth
                                            required
                                            placeholder={t("body.periodo")} />
                                    </div>
                                    <div className='my-5'>

                                        {!loading && categorias.length > 0 && <FormControl fullWidth>
                                            <InputLabel >{t("body.categoria")}</InputLabel>
                                            <Select
                                                name="categoria"
                                                fullWidth
                                                onChange={handleChangeSelect}
                                            >
                                                {categorias.map((categoria, index) => (
                                                    <MenuItem key={index} value={categoria._id}>{categoria.nombre}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>}

                                        {categorias.length === 0 &&
                                            <p>{t("body.validacion.categoria")}</p>
                                        }
                                    </div>
                                    <div className='my-5'>

                                        <TextField
                                            type="text"
                                            onChange={handleChange}
                                            className="form-control"
                                            name="descripcion"
                                            fullWidth
                                            placeholder={t("body.descripcion")} />
                                    </div>
                                    <div className='my-5'>

                                        <TextField
                                            type="number"
                                            onChange={handleChange}
                                            className="form-control"
                                            name="monto"
                                            fullWidth
                                            placeholder={t("body.monto")} />
                                    </div>
                                </div>
                                <div className='mb-5 mx-5'>
                                    <Button
                                        type='submit'
                                        variant="contained"
                                        color="success"
                                        fullWidth
                                        disabled={loading || categorias.length === 0}
                                    >{t("body.guar")}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>


                </div>
                <div className=' bg-slate-50 border border-black rounded-2xl'>



                    <div className="col-md-8">
                        <h3>{t("body.tab")}</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>{t("body.periodo")}</th>
                                    <th>{t("body.descripcion")}</th>
                                    <th>{t("body.categoria")}</th>
                                    <th>{t("body.monto")}</th>
                                </tr>
                            </thead>
                            {!loading && listado && <tbody>
                                <h1 className='text-2xl'>Gastos</h1>

                                {listado.gastos.map(item => (
                                    <tr key={item._id}>
                                        <td>{item.periodo}</td>
                                        <td>{item.descripcion}</td>
                                        <td>{item.tipo}</td>
                                        <td>{item.monto}</td>
                                        <td className="text-center">
                                        </td>
                                    </tr>
                                ))}

                                <h1 className='text-2xl'>Ingresos</h1>
                                {listado.ingresos.map(item => (
                                    <tr key={item._id}>
                                        <td>{item.periodo}</td>
                                        <td>{item.descripcion}</td>
                                        <td>{item.tipo}</td>
                                        <td>{item.monto}</td>
                                        <td className="text-center">
                                        </td>
                                    </tr>
                                ))}
                            </tbody>}
                        </table>
                    </div>


                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='bg-white' style={style}>
                    <div className='flex flex-row justify-center'>
                        <form onSubmit={handleSubmitAddCategory}>
                            <TextField type="text" onChange={handleChangeAddCategory} className="form-control" name="nombre" fullWidth label="Nombre" />
                            <TextField type="text" onChange={handleChangeAddCategory} className="form-control" name="descripcion" fullWidth label="Descripcion" />
                            <Button
                                type='submit'
                                variant="contained"
                                color="success"
                                fullWidth
                            >
                                Agregar
                            </Button>
                        </form>
                    </div>
                </div>
            </Modal>

        </div>
    )
}
