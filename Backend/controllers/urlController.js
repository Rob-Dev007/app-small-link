import checkUrl from "../helpers/checkUrl.js";
import Url from "../server/models/Url.js";
import mongoose from "mongoose";

const agregarUrl = async(req, res)=>{

    const { urlDestino, customUrl, descripcion } = req.body;

    if(!urlDestino || !checkUrl(urlDestino)){
        return res.status(400).json({mas: 'Url es incorrecta'});
    }

    if(customUrl){
        const alias = await Url.findOne({ customUrl });

        if(alias){
            return res.status(400).json({msg: 'Alias en uso, intente nuevamente'});
        }
    }

    const url = await Url.findOne({ urlDestino, customUrl, userId: req.user._id });

    if(url){
        const error = new Error('Url ya existe');
        return res.status(409).json({ msg: error.message });
    }

    try {

        const newUrl = new Url({
            urlDestino,
            userId : req.user._id,
            isPublic: false,
            descripcion 
        });

        if(customUrl && customUrl.trim() !== ''){
            newUrl.customUrl = customUrl.trim();
        }

        const urlGuardado = await newUrl.save();
        res.json(urlGuardado);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error al crear la url'});
    }
};

const obtenerUrl = async (req, res)=>{
    const { id } = req.params;

     if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID no válido' });
    }

    const url = await Url.findById( id );

    if(!url){
        const error = new Error('No encontrado');
        return res.status(404).json({ msg: error.message })
    }

    if(url.userId._id.toString() !== req.user._id.toString()){
        return res.status(403).json({msg: 'Acción no permitida'});
    };

    res.json(url);

}

const actualizarUrl = async(req, res)=>{
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'El id proporcionado no es válido.' });
    }

    try{
        const url = await Url.findById( id );

        if(!url){
            const error = new Error('No encontrado');
            return res.status(404).json({ msg: error.message })
        }
    
        if(url.userId._id.toString() !== req.user._id.toString()){
            return res.json({msg: 'Acción no permitida'});
        };
        
        //Actualizar url
    
        url.urlDestino = req.body.urlDestino || url.urlDestino;
        url.customUrl = req.body.customUrl || url.customUrl;
        url.descripcion = req.body.descripcion || url.descripcion;

        const urlActualizado = await url.save();
        return res.json(urlActualizado); 
    }catch(error){
        console.log(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
}

const eliminarUrl = async(req, res)=>{
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'El id proporcionado no es válido.' });
    }

    try {
        const url = await Url.findById(id);

        if(!url){
            const error = new Error('No encontrado');
            return res.status(404).json({ msg: error.message })
        }
    
        if(url.userId._id.toString() !== req.user._id.toString()){
            return res.json({msg: 'Acción no permitida'});
        };

        await url.deleteOne();

        res.json({ msg: 'Url eliminado correctamente' });
    } catch (error) {
        console.log(error);
    }
}


const pagination = async (req, res) => {

  const { search = "", page = 1, limit = 8 } = req.query;

  const safePage = Number(page) > 0 ? Number(page) : 1;
  const safeLimit = Number(limit) > 0 && Number(limit) <= 50 ? Number(limit) : 8;

  //Filtro: usuario logueado + customUrl 

  try {

    let filter = { userId: req.user._id }

    if(search && search.trim() !== ''){
        filter.$or = [
                { customUrl: {$regex: search, $options: "i"} }
        ]
    }
    const total = await Url.countDocuments(filter);
    const totalPages = Math.ceil(total / safeLimit);
    const currentPage = Math.min(safePage, totalPages || 1);
    const skip = (currentPage - 1) * safeLimit;

    const urls = await Url.find(filter)
      .skip(skip)
      .limit(safeLimit)
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      urls,
      total,
      totalPages,
      currentPage,
      hasPrevPage: currentPage > 1,
      hasNextPage: currentPage < totalPages,
      pageSize: safeLimit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en la búsqueda con paginación", 
    details: error.message  });
  }
};


export {
    agregarUrl,
    obtenerUrl,
    actualizarUrl,
    eliminarUrl,
    incrementarClicks,
    shortenUrlPublic,
    redirectPublic,
    pagination
}