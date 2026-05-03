import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ITarea {
    titulo: string;
    fechaInicio: Date;
    fechaFin: Date;
    estado: EstadoTarea;
    organizacionId: Types.ObjectId | string;
    usuarios: Types.ObjectId[] | string[];
}

export enum EstadoTarea {
    TODO = 'To do',
    IN_PROGRESS = 'In progress',
    DONE = 'Done'
}

export interface ITareaModel extends ITarea, Document {}

const TareaSchema: Schema = new Schema(
    {
        titulo: { type: String, required: true },
        fechaInicio: { type: Date, required: true },
        fechaFin: { type: Date, required: true },
        estado: { type: String, enum: Object.values(EstadoTarea), default: EstadoTarea.TODO },
        organizacionId: { type: Schema.Types.ObjectId, required: true, ref: 'Organizacion' },
        usuarios: [{ type: Schema.Types.ObjectId, ref: 'Usuario' }]
    },
    {
        versionKey: false
    }
);

export default mongoose.model<ITareaModel>('Tarea', TareaSchema);
