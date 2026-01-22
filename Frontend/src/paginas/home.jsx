import { Link } from "react-router-dom";
import { FaDatabase, FaLink } from "react-icons/fa";
import { useState } from "react";
import { FaClipboard, FaPaste, FaMagic, FaShareAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import Alerta from "../helpers/Alerta"
import clienteAxios from "../config/axios";
import Input from "../utils/input";
import Button from "../utils/button";
import { ImStatsBars } from "react-icons/im";
import Step from "../utils/step";
import CardService from "../utils/cardService";
import Stats from "../components/stats";
import ReviewsSlider from "../components/reviews";
import checkUrl from "../helpers/checkUrl";

const Home = ()=>{

    const [ urlDestino, setUrlDestino ] = useState('');
    const [ shortUrl, setShortUrl ] = useState('');
    const [ alerta, setAlerta ] = useState({});
    const [ loading, setLoading ] = useState(false);

    const MIN_LOADING_TIME = 400; //Tiempo de espera para mostrar la respuesta del backend

    const handleSubmit = async e=>{
        e.preventDefault();

        if(!urlDestino){
            setAlerta({
                msg: '¡ERROR! Url necesario.',
                error: true
            })
            return;
        }

        if(!checkUrl(urlDestino)){
            setAlerta({
                msg: data.msg,
                error: true
                })
            }

        setAlerta({});
        setLoading(true);
        
        const startTime = Date.now();

        try {
            const { data } = await clienteAxios.post('/public/shorten', { urlDestino } );
                setShortUrl(data.shortUrl);
        } catch (error) {
            setAlerta({
                msg: error.response?.data?.msg,
                error: true
            })
        }
        finally {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, MIN_LOADING_TIME - elapsed); //Operación para obtener tiempo de espera de respuesta del backend

            setTimeout(()=>{
                setLoading(false);
            }, remaining)
        }
    };

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const redirectUrl = `${BACKEND_URL}/${shortUrl}`;

    const showAlerta = ()=>{
        Swal.fire({
            title : '¡Aviso!',
            text : 'Texto copiado correctamente.',
            icon : 'success',
            confirmButtonText : 'Aceptar',
            customClass :{
                popup: 'custom-popup',
                title: 'custom-title',
                confirmButton: 'custom-confirm-button'
            }
        });
    };

    const copyLink = ()=>{
        navigator.clipboard.writeText(shortUrl)
        .then(()=> showAlerta())
        .catch((error) => console.log('Error al copiar el enlace', error))
    }

    const { msg }= alerta

    const changeEvent = (e)=>{
        const value = e.target.value;
        setUrlDestino(value);

        if(value.trim() !== ''){
            setAlerta({})
        }
    }

    return(
        <div className="flex flex-col items-center justify-center vh-100 mt-12 mx-auto ">
            <div className="flex-1 mx-1">
                <h1 className="text-3xl lg:text-5xl bold text-center mb-4 bg-gradient-to-r from-indigo-400 via-blue-500 to-cyan-600 bg-clip-text text-transparent">
                    Small-link <span className="font-semibold">acortador de enlaces</span>
                </h1>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center mx-4 my-8 sm:my-12">
                    Aplicación web diseñada para acortar enlaces, regístrate para almacenar y administrar tus enlaces
                </h2>
                <h3 className="text-xl text-center font-bold">Es seguro y facil de usarlo</h3>
                <div className="grid grid-cols-2 lg:grid-rows-1 lg:grid-cols-4 justify-items-center gap-6 mt-10 text-lg lg:text-xl text-gray-400 w-full">
                    <span>🔒 Sin spam</span>
                    <span>⚡ Rápido</span>
                    <span>🌍 Open source</span>
                    <span>📊 Estadísticas</span>
                </div>

                <div className="grid md:grid-cols-3 gap-x-8 gap-y-4 my-12 mx-4">
                    <Step title="1. Pega tu enlace" icon={FaPaste} />
                    <Step title="2. Acórtalo" icon={FaMagic} />
                    <Step title="3. Compártelo" icon={FaShareAlt} />
                </div>
            </div>
            <div className="md:max-w-[440px] lg:max-w-[620px] w-full mt-3">
                <p className="text-sm text-gray-500 text-center mb-3">
                    Pega cualquier enlace y acortalo en segundos
                </p>
                <form onSubmit={ handleSubmit }>
                    <Input type={ "url" } value={ urlDestino } changeEvent={ changeEvent } placeholder= "Ej: https://www.youtube.com/watch?v=..." />
                    <div className="flex justify-end mt-3 md:mt-2 mx-2 gap-8">
                        <Button 
                        disabled={loading} 
                        type={ "submit" } 
                        className={`${loading ? 'opacity-50 cursor-not-allowed' : 'opacity-100' } flex items-center justify-center bg-cyan-600 md:p-4 p-3 text-white rounded-lg font-bold text-sm lg:text-lg hover:bg-cyan-500 transform duration-500 ease-out cursor-pointer backdrop-blur-md rounded-2xl shadow-lg`}>{loading ? (
                            <>
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" ></span>
                                Procesando...
                            </>

                        )  :  ( 'Acorta el url') }
                        </Button>
                    </div>
                </form>
                <div className="flex justify-center mt-4">
                    {msg && <Alerta 
                        alerta={ alerta }
                    />}
                </div>
               {loading && (
                    <div className="flex flex-col lg:flex-row w-full justify-center items-center gap-3 mt-4 md:mt-3 animate-pulse">
                        <div className="h-4 w-24 bg-gray-400/50 rounded" />
                        <div className="h-4 w-56 bg-gray-400/50 rounded" />
                        <div className="h-8 w-8 bg-gray-400/50 rounded-md" />
                    </div>
                )}
                {!loading && shortUrl && (
                <div className="flex flex-col lg:flex-row w-full justify-center gap-3 mt-4 md:mt-3 items-center">
                    <p className="text-sm lg:text-base">URL acortada:</p>
                        <a href={ redirectUrl } target="_blank" rel="noopener noreferrer" className="max-w-[260px] sm:max-w-sm truncate font-semibold text-blue-600"><strong>{ shortUrl }</strong></a>
                        <button 
                        className="bg-green-500 h-8 w-8 flex justify-center items-center rounded-md"
                        onClick={ copyLink }
                        ><FaClipboard /></button>
                </div>
                )}
            </div>

            <div className="flex w-full justify-center items-center flex-1">
                <Link to="/login" className="btn">Gestiona tus enlaces</Link>
                <a href="https://github.com/Rob-Dev007/AppWebUrlShortener" 
                className="btn"
                target="_blank">Colabora en código abierto</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-gradient-to-br from-cyan-500 via-transparent to-indigo-400 w-full my-8 py-6 p-3 
            justify-items-center">
                <CardService 
                    title="Guarda tus enlaces"
                    description="Crea tu cuenta y podras guardar y gestionar los enlaces, accede cuando quieras.">
                    <FaDatabase className="text-xl md:text-6xl"/>
                </CardService>
                <CardService
                    title="Personaliza tus enlaces"
                    description="Puedes crear un alias específico a tus urls, personalizalo a tu gusto.">
                        <FaLink className="text-xl md:text-6xl"/>
                </CardService>
                <CardService
                    title="Gestiona tus enlaces"
                    description="Edita o elimina tus enlaces, contabiliza las veces visitadas a la url.">
                        <ImStatsBars className="text-xl md:text-6xl"/>
                </CardService>
            </div>
            <Stats />
            <div className="overflow-hidden w-full">
                 <div className="lg:max-w-6xl  mx-auto">
                <ReviewsSlider />
            </div>
            </div>
           
            <div className="text-center my-8">
                <h3 className="text-2xl text-cyan-500 font-bold mb-4">
                    Empieza gratis hoy mismo, lleva el control total de tus enlaces
                </h3>
                <p className="text-gray-500 mb-6">
                    Regístrate y gestiona todos tus enlaces desde un solo panel
                </p>
                <Link to="/registrar" className="btn">
                    Crear cuenta gratis
                </Link>
            </div>


        </div>
    )

};

export default Home;