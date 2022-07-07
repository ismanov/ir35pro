import { del, get, patch, post, put } from "helpers/api_helper"

export const getAllTasks = params => get("/api/tasks", params)

export const getTaskById = id => get(`/api/tasks/${id}`)

export const createTask = data => post("/api/tasks", data)

export const updateTask = data => put(`/api/tasks/${data.id}`, data.data)

export const deleteTaskById = id => del(`/api/tasks/${id}`)

export const sendForm = data =>
  post("/api/contractors/send-onboarding-form", data)
