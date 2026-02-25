export interface Client {
  id: number;
  nombre: string;
  apellido: string;
  identificacion: string;
  fechaRegistro?: string;
  correo: string;
  telefono: string;
}