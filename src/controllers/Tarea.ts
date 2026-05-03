import { NextFunction, Request, Response } from 'express';
import TareaService from '../services/Tarea';

const createByOrganizacion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const savedTarea = await TareaService.createTareaByOrganizacion(req.params.organizacionId, req.body);
        return savedTarea ? res.status(201).json(savedTarea) : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const readByOrganizacion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tareas = await TareaService.getTareasByOrganizacion(req.params.organizacionId);
        return res.status(200).json(tareas);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const updateEstado = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tareaId } = req.params;
        const { estado } = req.body;
        const updatedTarea = await TareaService.updateEstadoTarea(tareaId, estado);

        return updatedTarea ? res.status(200).json(updatedTarea) : res.status(404).json({ message: 'Tarea no encontrada' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export default { createByOrganizacion, readByOrganizacion, updateEstado };
