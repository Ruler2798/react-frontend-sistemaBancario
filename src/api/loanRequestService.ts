import api from "./api";
import type { LoanRequest } from "../modules/loans/types";

export const getLoanRequests = () =>
  api.get<LoanRequest[]>("/solicitudes");

export const createLoanRequest = (data: {
  clienteId: number;
  montoSolicitado: number;
  plazoMeses: number;
  tasaInteres: number;
}) =>
  api.post("/solicitudes", {
    cliente: { id: data.clienteId },
    montoSolicitado: data.montoSolicitado,
    plazoMeses: data.plazoMeses,
    tasaInteres: data.tasaInteres,
  });

export const approveLoanRequest = (id: number) =>
  api.put(`/solicitudes/${id}/aprobar`);

export const rejectLoanRequest = (id: number) =>
  api.put(`/solicitudes/${id}/rechazar`);