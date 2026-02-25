export interface Loan {
  id: number;
  cliente: {
    id: number;
    nombre: string;
    apellido: string;
  };
  monto: number;
  plazoMeses: number;
  tasaInteres: number;
  fechaInicio: string;
}

export interface LoanRequest {
  id?: number;
  cliente?: {
    id: number;
    nombre: string;
    apellido: string;
  };
  clienteId?: number;

  montoSolicitado: number;
  plazoMeses: number;
  tasaInteres: number;

  estado?: "PENDIENTE" | "APROBADA" | "RECHAZADA";
  fechaSolicitud?: string;
}