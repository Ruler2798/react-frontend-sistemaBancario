import api from "./api";
import type { Loan } from "../modules/loans/types";

export const getLoans = () => api.get<Loan[]>("/prestamos");

export const getLoan = (id: number) => api.get<Loan>(`/prestamos/${id}`);
