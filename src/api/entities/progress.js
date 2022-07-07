import { del, get, patch, post, put } from "helpers/api_helper"

export const assignUser = ({ contractorId, body }) =>
  put(`/api/assign-user/${contractorId}`, body)

export const changeStatuses = body => put("/api/update-statuses", body)
