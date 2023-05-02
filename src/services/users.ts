import { User } from "../models/user";
import { setUsersReducer } from "../store/features/users/users";
import { users } from "../utils/mocks";

const getUsersRequest: () => Promise<User[]> = () => {
  const existUsers = localStorage.getItem("users");
  if (existUsers) {
    return Promise.resolve(JSON.parse(existUsers));
  } else {
    localStorage.setItem("users", JSON.stringify(users));
    return Promise.resolve(users);
  }
};

const deleteUserRequest: (index: number) => Promise<User[]> = (
  index: number
) => {
  const existStringUsers = localStorage.getItem("users");
  if (existStringUsers) {
    const users: User[] = JSON.parse(existStringUsers);
    if (users.length > index) {
      users.splice(index, 1);
      localStorage.setItem("users", JSON.stringify(users));
    }
    return Promise.resolve(users);
  } else {
    return Promise.reject([]);
  }
};

export const deleteUsersRequest: (numbers: number[]) => Promise<User[]> = (
  numbers
) => {
  const existStringUsers = localStorage.getItem("users");
  if (existStringUsers) {
    const users: User[] = JSON.parse(existStringUsers);
    const filteredUser = [];
    for (let i = 0; i < users.length; i++) {
      const el = numbers.find((index) => index == i);
      if (el === undefined) {
        const newUser = { ...users[i] };
        filteredUser.push(newUser);
      }
    }
    localStorage.setItem("users", JSON.stringify(filteredUser));
    return Promise.resolve(filteredUser);
  } else {
    return Promise.resolve([]);
  }
};

const addUserRequest: (user: User) => Promise<User[]> = (user) => {
  const existStringUsers = localStorage.getItem("users");
  if (existStringUsers) {
    const users: User[] = JSON.parse(existStringUsers);
    users.push({ ...user, id: Math.floor(Math.random() * 100) });
    localStorage.setItem("users", JSON.stringify(users));
    return Promise.resolve(users);
  } else {
    const users = [user];
    localStorage.setItem("users", JSON.stringify(users));
    return Promise.resolve(users);
  }
};

const editUSerRequest: (user: User) => Promise<User[]> = (user) => {
  const existStringUsers = localStorage.getItem("users");
  if (existStringUsers) {
    const users: User[] = JSON.parse(existStringUsers);
    const existUser = users.findIndex((el) => el.id == user.id);
    if (existUser >= 0) {
      users[existUser] = user;
      localStorage.setItem("users", JSON.stringify(users));
      return Promise.resolve(users);
    } else {
      return Promise.reject(`No existe el usuario con el id  ${user.id}`);
    }
  } else {
    return Promise.reject("No existen usuarios");
  }
};

export const userMiddelware = (dispatch) => {
  const addUser = async (user: User) => {
    const data = await addUserRequest(user);
    dispatch(setUsersReducer(data));
  };

  const removeUserBatch = async (numbers: number[]) => {
    try {
      const data = await deleteUsersRequest(numbers);
      dispatch(setUsersReducer(data));
    } catch (e) {
      console.log(e);
    }
  };

  const removeUser = async (index: number) => {
    const data = await deleteUserRequest(index);
    dispatch(setUsersReducer(data));
  };

  const getUser = async () => {
    const data = await getUsersRequest();
    dispatch(setUsersReducer(data));
  };

  const editUser = async (user: User) => {
    try {
      const data = await editUSerRequest(user);
      dispatch(setUsersReducer(data));
    } catch (e) {
      console.log(e);
    }
  };

  return { addUser, removeUser, getUser, removeUserBatch, editUser };
};
