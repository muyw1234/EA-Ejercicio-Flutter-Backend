import mongoose from 'mongoose';
import Tarea, { ITareaModel } from '../models/Tarea';
import Organizacion from '../models/Organizacion';

interface ICreateTareaInput {
    titulo: string;
    fechaInicio: Date;
    fechaFin: Date;
    estado?: string;
    usuarios?: (mongoose.Types.ObjectId | string)[];
}

const createTareaByOrganizacion = async (organizacionId: string, data: ICreateTareaInput): Promise<ITareaModel | null> => {
    if (!mongoose.Types.ObjectId.isValid(organizacionId)) {
        return null;
    }

    const organizacion = await Organizacion.findById(organizacionId);
    if (!organizacion) {
        return null;
    }

    const tarea = new Tarea({
        _id: new mongoose.Types.ObjectId(),
        ...data,
        organizacionId
    });

    return await tarea.save();
};

const getTareasByOrganizacion = async (organizacionId: string): Promise<ITareaModel[]> => {
    if (!mongoose.Types.ObjectId.isValid(organizacionId)) {
        return [];
    }

    return await Tarea.find({ organizacionId }).populate({ path: 'usuarios', select: 'name' });
};

const updateEstadoTarea = async (tareaId: string, nuevoEstado: string): Promise<ITareaModel | null> => {
    if (!mongoose.Types.ObjectId.isValid(tareaId)) return null;

    return await Tarea.findByIdAndUpdate(tareaId, { estado: nuevoEstado }, { new: true });
};

export default { createTareaByOrganizacion, getTareasByOrganizacion, updateEstadoTarea };
