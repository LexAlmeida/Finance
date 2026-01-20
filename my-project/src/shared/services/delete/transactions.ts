import {api} from "../api";

export const deleteTransaction = async (id: number): Promise<void> => {
    const response = await api.delete(`/api/transactions/${id}`);
    return response.data;
}