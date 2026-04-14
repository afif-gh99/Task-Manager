// This service contains all task-related API requests.
// It also normalizes task and stats data so the UI can work with one
// consistent status format regardless of backend wording.
import apiClient, { getAuthHeaders } from "../lib/api/apiClient";
import { tokenStorage } from "../lib/auth/tokenStorage";
import {
  mapTaskPayloadToApi,
  normalizeTaskForUi,
  normalizeTaskListForUi,
  normalizeTaskStats,
} from "../constants/taskStatus";

export const taskService = {
  // Loads the full task list, then normalizes each task status for the UI.
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

  // Loads one task by id and normalizes its status before the edit page uses it.
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

  // Converts the UI payload to backend-friendly values, then creates a task.
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

  // Converts the UI payload to backend-friendly values, then updates a task.
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

  // Deletes one task by id. No extra normalization is needed here.
  async deleteTask(taskId) {
    const endpoint = `/tasks/${taskId}`;
    const token = tokenStorage.getToken();
    const headers = getAuthHeaders(token);

    const response = await apiClient.delete(endpoint, {
      headers,
    });

    return response.data;
  },

  // Loads stats and reshapes them into one predictable object for the cards.
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
