import api from "./api";
import type { Client } from "../modules/clients/types";

export const getClients = () => api.get<Client[]>("/clientes");

export const createClient = (client: Client) =>
  api.post("/clientes", client);

export const updateClient = (id: number, client: Client) => {
  console.log("LLAMANDO PUT:", id, client);
  return api.put(`/clientes/${id}`, client);
};

export const deleteClient = (id: number) =>
  api.delete(`/clientes/${id}`);