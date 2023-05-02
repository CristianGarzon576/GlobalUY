export interface Request {
  id: number;
  product: string;
  userEmail: string;
  quantity: number;
  date: string;
  clientDirection: string;
  status?: STATUS;
  razon?: string;
}

export enum STATUS {
  approved = "Aprobado",
  rejected = "Rechazado",
  waiting = "En Espera",
}
