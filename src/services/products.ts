import { Product } from "../models/product";
import { setProductsReducer } from "../store/features/products/products";
import { products } from "../utils/mocks";

const getProductsRequest: () => Promise<Product[]> = () => {
  const existProducts = localStorage.getItem("products");
  if (existProducts) {
    return Promise.resolve(JSON.parse(existProducts));
  } else {
    localStorage.setItem("products", JSON.stringify(products));
    return Promise.resolve(products);
  }
};

const deleteProductRequest: (index: number) => Promise<Product[]> = (
  index: number
) => {
  const existStringProducts = localStorage.getItem("products");
  if (existStringProducts) {
    const products: Product[] = JSON.parse(existStringProducts);
    if (products.length > index) {
      products.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(products));
    }
    return Promise.resolve(products);
  } else {
    return Promise.reject([]);
  }
};

export const deleteProductsRequest: (
  numbers: number[]
) => Promise<Product[]> = (numbers) => {
  const existStringProducts = localStorage.getItem("products");
  if (existStringProducts) {
    const products: Product[] = JSON.parse(existStringProducts);
    const filteredProduct = [];
    for (let i = 0; i < products.length; i++) {
      const el = numbers.find((index) => index == i);
      if (!el) {
        const newProduct = { ...products[i] };
        filteredProduct.push(newProduct);
      }
    }
    localStorage.setItem("products", JSON.stringify(filteredProduct));
    return Promise.resolve(filteredProduct);
  } else {
    return Promise.reject([]);
  }
};

const addProductRequest: (Product: Product) => Promise<Product[]> = (
  Product
) => {
  const existStringProducts = localStorage.getItem("products");
  if (existStringProducts) {
    const products: Product[] = JSON.parse(existStringProducts);
    products.push({ ...Product, id: products.length + 1 });
    localStorage.setItem("products", JSON.stringify(products));
    return Promise.resolve(products);
  } else {
    const products = [Product];
    localStorage.setItem("products", JSON.stringify(products));
    return Promise.resolve(products);
  }
};

const editProductRequest: (Product: Product) => Promise<Product[]> = (
  Product
) => {
  const existStringProducts = localStorage.getItem("products");
  if (existStringProducts) {
    const products: Product[] = JSON.parse(existStringProducts);
    const existProduct = products.findIndex((el) => el.id == Product.id);
    if (existProduct >= 0) {
      products[existProduct] = Product;
      localStorage.setItem("products", JSON.stringify(products));
      return Promise.resolve(products);
    } else {
      return Promise.reject(`No existe el usuario con el id  ${Product.id}`);
    }
  } else {
    return Promise.reject("No existen usuarios");
  }
};

export const productMiddelware = (dispatch) => {
  const addProduct = async (Product: Product) => {
    const data = await addProductRequest(Product);
    dispatch(setProductsReducer(data));
  };

  const removeProductBatch = async (numbers: number[]) => {
    try {
      const data = await deleteProductsRequest(numbers);
      dispatch(setProductsReducer(data));
    } catch (e) {
      console.log(e);
    }
  };

  const removeProduct = async (index: number) => {
    const data = await deleteProductRequest(index);
    dispatch(setProductsReducer(data));
  };

  const getProducts = async () => {
    const data = await getProductsRequest();
    dispatch(setProductsReducer(data));
  };

  const editProduct = async (Product: Product) => {
    try {
      const data = await editProductRequest(Product);
      dispatch(setProductsReducer(data));
    } catch (e) {
      console.log(e);
    }
  };

  return {
    addProduct,
    removeProduct,
    getProducts,
    removeProductBatch,
    editProduct,
  };
};
