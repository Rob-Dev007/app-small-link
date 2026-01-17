import  { FaTrashAlt, FaCog, FaClipboard } from 'react-icons/fa';
import  { HiBarsArrowUp } from 'react-icons/hi2';
import useUrl from '../hooks/useUrl';
import { confirmDelete, showAlert } from '../helpers/toast';

const Urls = ({ url, mostrarFormEditar })=>{

    const { urlDestino, shortUrlId, customUrl, descripcion, clicks, createdAt } = url;
    const { eliminarUrl } = useUrl();
    
    const fechaFormateada = new Date(createdAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

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
        .then(()=> copyAlert())
        .catch((error) => console.log('Error al copiar el enlace', error))
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
        <div className='p-4 border-2 rounded-lg shadown-lg my-2'>
            <div className='flex justify-between flex-col md:flex-row'>
                <a className='text-blue-400 font-bold max-w-44 lg:max-w-none' href={redirectUrl} target='_blank' >
                    { customUrl || shortUrlId }
                </a>
                <div className='flex justify-end md:justify-between items-center gap-1'>
                    <div className='flex items-center gap-1'>
                        <strong><HiBarsArrowUp /></strong>
                        <p className='text-sm lg:text-base'> Clicks: <strong>{ clicks }</strong></p>
                    </div>
                  
                    <button className="p-2 rounded hover:bg-gray-400 transform translate-y-0 transition duration-500 ease-linear" onClick={ handleCopy }>
                        <FaClipboard />
                    </button>
                    <button className="p-2 rounded hover:bg-gray-400 transform translate-y-0 transition duration-500 ease-linear" onClick={ ()=>handleDelete(url._id) }>
                        <FaTrashAlt className='text-red-500'/>
                    </button>
                    <button className="p-2 rounded hover:bg-gray-400 transform translate-y-0 transition duration-500 ease-linear" onClick={ handleEdit }>
                        <FaCog />
                    </button>
                </div>
            </div>
            <div className=''>
                <p className='my-4 text-gray-500 truncate'> { urlDestino }</p>
                <div className='flex gap-4 lg:gap-0 flex-col lg:flex-row justify-between'>
                    <p className='font-semibold break-words'> { descripcion }</p>
                    <p> Creado el: <span className='font-light'>{ fechaFormateada }</span></p>
                </div>
            </div>
        </div>
    )
};

export default Urls;