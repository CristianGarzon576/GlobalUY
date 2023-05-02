import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../hooks/hooks";

import { logoutUserReducer } from "../../store/features/users/users";

import { SectionProps, SideBar } from "../../components/SideBar/SideBar";
import { UsersContent } from "../../components/DashboardContent/UsersContent";
import { RequestsContent } from "../../components/DashboardContent/RequestsContent";
import { ProductsContent } from "../../components/DashboardContent/ProductsContent";

import { userIsLoged } from "../../utils/login";
import { userMiddelware } from "../../services/users";
import { productMiddelware } from "../../services/products";
import { RequestMiddelware } from "../../services/requests";

const SECTIONS = [
  {
    id: "users",
    icon: "users",
    label: "Usuarios",
    onClick: () => {},
  },
  {
    id: "requests",
    icon: "requests",
    label: "Pedidos",
    onClick: () => {},
  },
  {
    id: "products",
    icon: "products",
    label: "Productos",
    onClick: () => {},
  },
];

export const enum DASHBOARD_CONTENT {
  users = "users",
  request = "requests",
  products = "products",
}

export const Dashboard: () => JSX.Element = () => {
  const navigate = useNavigate();
  const { user, usersList } = useSelector((state: any) => state.users);
  const { products, requests } = useSelector((state: any) => state);

  const dispatch = useAppDispatch();
  const { getUser } = userMiddelware(dispatch);
  const { getProducts } = productMiddelware(dispatch);
  const { getRequests } = RequestMiddelware(dispatch);
  const [sections] = useState(SECTIONS);
  const [currentSection, setCurrentSection] = useState<SectionProps | null>(
    null
  );

  const renderContent = {
    users: () => (
      <UsersContent title={currentSection?.label} data={usersList} />
    ),
    requests: () => (
      <RequestsContent
        products={products}
        users={usersList}
        title={currentSection?.label ?? ""}
        data={requests}
      />
    ),
    products: () => (
      <ProductsContent title={currentSection?.label ?? ""} data={products} />
    ),
  };

  useEffect(() => {
    setCurrentSection(SECTIONS[0]);
  }, []);

  useEffect(() => {
    if (currentSection) {
      switch (currentSection.id) {
        case DASHBOARD_CONTENT.users:
          getUser();
          break;
        case DASHBOARD_CONTENT.products:
          getProducts();
          break;
        case DASHBOARD_CONTENT.request:
          getRequests();
          getProducts();
          getUser();
          break;
      }
    }
  }, [currentSection]);

  useEffect(() => {
    const existUserLogged = userIsLoged();
    if (!existUserLogged) {
      navigate("/");
    }
  }, [user]);

  const handledLogout = () => {
    dispatch(logoutUserReducer());
  };

  const handledCurrentSection = (label: string) => {
    const newActiveSection = sections.find((el) => el.label === label);
    if (newActiveSection) {
      setCurrentSection(newActiveSection);
    }
  };

  if (currentSection) {
    return (
      <div className="h-screen flex justify-start items-center ">
        <div className="h-screen w-72">
          <SideBar
            handledOnClick={handledCurrentSection}
            currentSection={currentSection}
            sections={sections}
            onLogout={handledLogout}
          />
        </div>
        <div className="p-7 w-full h-full">
          <div className="bg-white w-full h-full p-16">
            {currentSection && renderContent[currentSection.id]()}
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};
