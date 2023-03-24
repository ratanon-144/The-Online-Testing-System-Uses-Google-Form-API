import { SignUp, SignIn, GetSession } from "@/models/auth.model";
import { ProductData } from "@/models/product.model";
import { CourseData } from "@/models/course.model";
import { UserData } from "@/models/user.model";
import httpClient from "@/utils/httpClient";
import axios from "axios";

type signProps = {
  username: string;
  password: string;
};

export const signUp = async (user: signProps): Promise<SignUp> => {
  const response = await httpClient.post<SignUp>("/authen/register", user);
  return response.data;
};

export const signIn = async (user: signProps): Promise<SignIn> => {
  const { data: response } = await httpClient.post<SignIn>(
    `/auth/signin`,
    user,
    {
      baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
    }
  );
  return response;
};

export async function signOut() {
  const response = await httpClient.get(`/auth/signout`, {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
  });
  return response.data;
}

export const getSession = async (): Promise<GetSession> => {
  const response = await httpClient.get(`/auth/session`, {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
  });

  return response.data;
};

export const getProfiles = async (): Promise<UserData> => {
    // return (await httpClient.get(`/auth/profile`)).data;
    const response = await httpClient.get(`/auth/profile`, {
      baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
    });
    console.log(response.data);
    return response.data;
};

export const getProducts = async (keyword?: string): Promise<ProductData[]> => {
  if (keyword) {
    return (await httpClient.get(`/stock/product/keyword/${keyword}`)).data;
  } else {
    return (await httpClient.get(`/stock/product`)).data;
  }
};

export const doGetStockById = async (id: string) => {
  const response = await httpClient.get(`/stock/product/${id}`);
  return response.data;
};

export const addProduct = async (data: FormData): Promise<void> => {
  await httpClient.post(`/stock/product`, data);
};

export const editProduct = async (data: FormData): Promise<void> => {
  await httpClient.put(`/stock/product`, data);
};

export const deleteProduct = async (id?: string): Promise<void> => {
  await httpClient.delete(`/stock/product/${id}`);
};
 
export const getCourse = async (keyword?: string): Promise<CourseData[]> => {
  if (keyword) {
    return (await httpClient.get(`/instructor/course/keyword/${keyword}`)).data;
  } else {
    return (await httpClient.get(`/instructor/course`)).data;
  }
};

export const doGetCourseById = async (id: string) => {
  const response = await httpClient.get(`/instructor/course/${id}`);
  return response.data;
};

export const addCourse = async (data: FormData): Promise<void> => {
  await httpClient.post(`/instructor/course`, data);
};

export const editCourse = async (data: FormData): Promise<void> => {
  await httpClient.put(`/instructor/course`, data);
};

export const deleteCourse = async (id?: string): Promise<void> => {
  await httpClient.delete(`/instructor/course/${id}`);
};

