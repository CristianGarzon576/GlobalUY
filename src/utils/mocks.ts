import { Product } from "../models/product";
import { Request } from "../models/requests";
import { POSITION, ROLE, User } from "../models/user";

const users: User[] = [
  {
    id: 51,
    name: "Clotilda Wethers",
    email: "cwethers0@pen.io",
    ci: 44568976,
    cargo: POSITION.Admin,
    role: ROLE.Admin,
  },
  {
    id: 87,
    name: "Waverly Sprowle",
    email: "wsprowle1@opera.com",
    ci: 45216791,
    cargo: POSITION.Cleaner,
    role: ROLE.User,
  },
  {
    id: 7,
    name: "Hernando Stiell",
    email: "hstiell2@unicef.org",
    ci: 46726622,
    cargo: POSITION.Cleaner,
    role: ROLE.User,
  },
  {
    id: 19,
    name: "Miquela Lynagh",
    email: "mlynagh3@rakuten.co.jp",
    ci: 43021740,
    cargo: POSITION.Admin,
    role: ROLE.Admin,
  },
];

const requests: Request[] = [
  {
    id: 340,
    product: "Simple Green All-Purpose Cleaner",
    userEmail: "cwethers0@pen.io",
    quantity: 10,
    date: "2022-07-25 18:28:22.843339",
    clientDirection: "20505 South Dixie Highway",
  },
  {
    id: 369,
    product: "Mr. Clean Multi-Purpose Cleaner",
    userEmail: "cwethers0@pen.io",
    quantity: 1,
    date: "2022-07-25 18:28:22.843339",
    clientDirection: "1119 S. Woodland Boulevard",
  },
  {
    id: 3,
    product: "Purell Multi Surface Disinfectant",
    userEmail: "wsprowle1@opera.com",
    quantity: 7,
    date: "2022-11-10 11:59:29.546675",
    clientDirection: "3831 West Vine Street Suite",
  },
  {
    id: 635,
    product: "Lysol Disinfectant Wipes",
    userEmail: "wsprowle1@opera.com",
    quantity: 6,
    date: "2022-11-10 11:59:29.546675",
    clientDirection: "4715 South Florida Avenue",
  },
  {
    id: 784,
    product: "Soap",
    userEmail: "mlynagh3@rakuten.co.jp",
    quantity: 1,
    date: "2022-11-15 14:56:52.797703",
    clientDirection: "Plaza San Alfonso 190 Avenida Gautier Benitez",
  },
];

const products: Product[] = [
  {
    id: 1,
    name: "Purell Multi Surface Disinfectant",
  },
  {
    id: 2,
    name: "Lysol Disinfectant Wipes",
  },
  {
    id: 3,
    name: "Mr. Clean Multi-Purpose Cleaner",
  },
  {
    id: 4,
    name: "Simple Green All-Purpose Cleaner",
  },
];

export { users, requests, products };
