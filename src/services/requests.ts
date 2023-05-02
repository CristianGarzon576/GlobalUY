import { Request } from "../models/requests";
import { setRequestsReducer } from "../store/features/requests/requests";
import { requests } from "../utils/mocks";

const getRequestsRequest: () => Promise<Request[]> = () => {
  const existRequests = localStorage.getItem("requests");
  if (existRequests) {
    return Promise.resolve(JSON.parse(existRequests));
  } else {
    localStorage.setItem("requests", JSON.stringify(requests));
    return Promise.resolve(requests);
  }
};

const addRequestRequest: (Request: Request) => Promise<Request[]> = (
  Request
) => {
  const existRequests = localStorage.getItem("requests");
  if (existRequests) {
    const Requests: Request[] = JSON.parse(existRequests);
    Requests.push({ ...Request, id: Requests.length + 1 });
    localStorage.setItem("requests", JSON.stringify(Requests));
    return Promise.resolve(Requests);
  } else {
    const Requests = [Request];
    localStorage.setItem("requests", JSON.stringify(Requests));
    return Promise.resolve(Requests);
  }
};

const editRequestRequest: (Request: Request) => Promise<Request[]> = (
  Request
) => {
  const existRequests = localStorage.getItem("requests");
  if (existRequests) {
    const Requests: Request[] = JSON.parse(existRequests);
    const existRequest = Requests.findIndex((el) => el.id == Request.id);
    if (existRequest >= 0) {
      Requests[existRequest] = Request;
      localStorage.setItem("requests", JSON.stringify(Requests));
      return Promise.resolve(Requests);
    } else {
      return Promise.reject(`No existe el usuario con el id  ${Request.id}`);
    }
  } else {
    return Promise.reject("No existen usuarios");
  }
};

export const RequestMiddelware = (dispatch) => {
  const addRequest = async (Request: Request) => {
    const data = await addRequestRequest(Request);
    dispatch(setRequestsReducer(data));
  };

  const getRequests = async () => {
    const data = await getRequestsRequest();
    dispatch(setRequestsReducer(data));
  };

  const editRequest = async (Request: Request) => {
    try {
      const data = await editRequestRequest(Request);
      dispatch(setRequestsReducer(data));
    } catch (e) {
      console.log(e);
    }
  };

  return {
    addRequest,
    getRequests,
    editRequest,
  };
};
