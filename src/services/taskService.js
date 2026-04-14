import apiClient, { getAuthHeaders } from "../lib/api/apiClient";
import { tokenStorage } from "../lib/auth/tokenStorage";
import {
  mapTaskPayloadToApi,
  normalizeTaskForUi,
  normalizeTaskListForUi,
  normalizeTaskStats,
} from "../constants/taskStatus";

export const taskService = {
  async getTasks() {
    const endpoint = "/tasks";
    const token = tokenStorage.getToken();
    const headers = getAuthHeaders(token);

    const response = await apiClient.get(endpoint, {
      headers,
    });

    return {
      ...response.data,
      data: normalizeTaskListForUi(response.data?.data),
    };
  },

  async getTaskById(taskId) {
    const endpoint = `/tasks/${taskId}`;
    const token = tokenStorage.getToken();
    const headers = getAuthHeaders(token);

    const response = await apiClient.get(endpoint, {
      headers,
    });

    return {
      ...response.data,
      data: normalizeTaskForUi(response.data?.data),
    };
  },

  async createTask(payload) {
    const endpoint = "/tasks";
    const token = tokenStorage.getToken();
    const headers = getAuthHeaders(token);
    const apiPayload = mapTaskPayloadToApi(payload);

    const response = await apiClient.post(endpoint, apiPayload, {
      headers,
    });

    return {
      ...response.data,
      data: normalizeTaskForUi(response.data?.data),
    };
  },

  async updateTask(taskId, payload) {
    const endpoint = `/tasks/${taskId}`;
    const token = tokenStorage.getToken();
    const headers = getAuthHeaders(token);
    const apiPayload = mapTaskPayloadToApi(payload);

    const response = await apiClient.put(endpoint, apiPayload, {
      headers,
    });

    return {
      ...response.data,
      data: normalizeTaskForUi(response.data?.data),
    };
  },

  async deleteTask(taskId) {
    const endpoint = `/tasks/${taskId}`;
    const token = tokenStorage.getToken();
    const headers = getAuthHeaders(token);

    const response = await apiClient.delete(endpoint, {
      headers,
    });

    return response.data;
  },

  async getStats() {
    const endpoint = "/tasks/stats";
    const token = tokenStorage.getToken();
    const headers = getAuthHeaders(token);

    const response = await apiClient.get(endpoint, {
      headers,
    });

    return {
      ...response.data,
      data: normalizeTaskStats(response.data?.data ?? response.data),
    };
  },
};
