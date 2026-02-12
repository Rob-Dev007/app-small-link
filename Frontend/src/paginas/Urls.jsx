import { useState } from 'react';
import  { FaTrashAlt, FaCog, FaClipboard } from 'react-icons/fa';
import  { HiBarsArrowUp } from 'react-icons/hi2';
import useUrl from '../hooks/useUrl';
import { confirmDelete, showAlert } from '../helpers/toast';

const Urls = ({ url, mostrarFormEditar })=>{

    if(!url) return null;

    const { urlDestino, shortUrlId, customUrl, descripcion, clicks, createdAt } = url;
    const { eliminarUrl } = useUrl();

    const [copied, setCopied] = useState(false);
    
    const fechaFormateada = createdAt ? 
    new Date(createdAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }) : 'Fecha no disponible';

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const redirectUrl = `${BACKEND_URL}/${customUrl || shortUrlId}`;
    
    const copyAlert = ()=>{
        showAlert({
            title: '¡Aviso!',
            text : 'Url copiada correctamente',
            icon : 'success',
        })
    }
    
    const handleCopy = ()=>{
        navigator.clipboard
        .writeText(redirectUrl)
        .then(()=> {
            setCopied(true)
            copyAlert()
            setTimeout(() => setCopied(false), 3000);
        })
        .catch((error) => {
            showAlert({
            title: '¡Error!',
            text : 'Url no copiada a portapapeles',
            icon : 'error',
        });
        console.log("error:", error)
        })
    }

    const handleEdit = ()=>{
        mostrarFormEditar(url);
    }

    const handleDelete = (id)=>{
        confirmDelete({
            title: "¿Desea eliminar este elemento?",
            text: "Esta acción no se puede deshacer",
            icon: "warning"
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarUrl(id);
                showAlert({
                    title: "Operación exitosa",
                    text: "La URL ha sido eliminada correctamente",
                    icon: "success"
                })
            }
        });
    }

    return(
        <div className='p-4 rounded-lg my-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition'>
            <div className='flex justify-between flex-col md:flex-row'>
                <a className='text-blue-400 font-bold truncate break-all lg:max-w-none' href={redirectUrl} target='_blank' rel="noopener noreferrer">
                    { customUrl || shortUrlId }
                </a>
                <div className='flex justify-end md:justify-between items-center gap-1'>
                    <div className='flex items-center gap-1'>
                        <strong><HiBarsArrowUp /></strong>
                        <p className='text-sm lg:text-base'> Clicks: <strong>{ clicks }</strong></p>
                    </div>
                  
                    <button className={`${copied ? "bg-green-200 text-green-700" : "hover:bg-gray-100"} p-2 rounded hover:scale-105 transition-all duration-200 transform ease-linear`} onClick={ handleCopy } title="Copiar URL">
                        <FaClipboard />
                    </button>
                    <button className="p-2 rounded hover:bg-gray-100 hover:scale-105 transition-all duration-200 transform ease-linear" onClick={ ()=>handleDelete(url._id) }>
                        <FaTrashAlt className='text-red-500' title='Eliminar url'/>
                    </button>
                    <button className="p-2 rounded hover:bg-gray-100 hover:scale-105 transition-all duration-200 transform  ease-linear" onClick={ handleEdit } title='Editar url'>
                        <FaCog />
                    </button>
                </div>
            </div>
            <div className='flex flex-col'>
                <p className='my-4 text-gray-500 truncate'> { urlDestino }</p>
                <div className='flex gap-4 flex-col'>
                    {descripcion ? (
                        <p className='font-semibold break-words'>{descripcion}</p>
                        ) : (
                        <p className='text-gray-400 italic'><strong>Sin descripción</strong></p>
                    )}
                    <p> Creado el: <span className='font-light'>{ fechaFormateada }</span></p>
                </div>
            </div>
        </div>
    )
};

export default Urls;