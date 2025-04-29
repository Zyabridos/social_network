import axiosInstance from "./axiosInstance";

interface CrudApi<T> {
  getAll: () => Promise<T[]>;
  // evnt create, getById, update, remove
}

const createCrudApi = <T>(baseUrl: string): CrudApi<T> => ({
  getAll: async () => {
    const response = await axiosInstance.get<T[]>(baseUrl);
    return response.data;
  },
});

export default createCrudApi;
