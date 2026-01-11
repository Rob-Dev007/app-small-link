import mongoose from "mongoose";
import { nanoid } from "nanoid";

const UrlSchema = mongoose.Schema({
    urlDestino: { 
        type: String, 
        required: true, 
        trim: true 
    },
    customUrl: {
        type: String,
        unique: true, 
        sparse: true,
        trim: true,
    },
    descripcion: String,
    clicks: { 
        type: Number, 
        default: 0 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        default: null
    },
    shortUrlId:{
        type: String,
        default: ()=> nanoid(8),
        unique:true
    },
    isPublic:{
        type: Boolean,
        default: false
    },
    expiresAt:{
        type: Date,
        default: null
    }
},
{
    timestamps: true
}
);

UrlSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
)

const Url = mongoose.model('Url', UrlSchema);

export default Url; 