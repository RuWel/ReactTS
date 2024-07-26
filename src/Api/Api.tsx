import axios from "axios";

import configData from "../tutorial_env.json";

import dummyData from "./DummyData/DummyData";
import { log } from "../Logging/Logger";
import LogLevel from "../enum/LogLevel";

const useServer = true;

const PROTOCOL: string = configData.REST.protocol;
const HOSTNAME: string = configData.REST.hostname;
const PORT: string = configData.REST.port;
const PREFIX: string = configData.REST.prefix;
const isActive: boolean = configData.activeServer || useServer;

const apiClient = axios.create({
  baseURL: `${PROTOCOL}://${HOSTNAME}:${PORT}/${PREFIX}`,
  headers: {
    "Content-type": "application/json",
  },
});

const getAllTutorials = async (): Promise<ITutorial[] | null> => {
  let data: ITutorial[] | null = null;

  if (isActive) {
    await apiClient
      .get("/tutorials")
      .then((response) => (data = response.data))
      .catch((err) => {
        data = null;
      });
  } else {
    data = dummyData;
  }

  return data;
};

const deleteAllTutorials = async (): Promise<boolean> => {
  let result: boolean = false;

  if (isActive) {
    await apiClient
      .delete("/tutorials/delete")
      .then((response) => (result = true))
      .catch((err) =>
        log(`API deleteAllTutorials:  > ${err.message}`, LogLevel.Error)
      );
  }

  return result;
};

const deleteTutorialById = async (id: number): Promise<boolean> => {
  let result: boolean = false;
  if (isActive) {
    await apiClient
      .delete(`/tutorials/delete/${id}`)
      .then((response) => (result = true))
      .catch((err) =>
        log(
          `API deleteTutorialById: id = ${id} > ${err.message}`,
          LogLevel.Error
        )
      );
  }

  return result;
};

const publishAllTutorials = async (): Promise<boolean> => {
  let result: boolean = false;
  if (isActive) {
    await apiClient
      .put("/tutorials/publish")
      .then((response) => (result = true))
      .catch((err) =>
        log(`API publishAllTutorials > ${err.message}`, LogLevel.Error)
      );
  }

  return result;
};

const publishTutorialById = async (id: number): Promise<boolean> => {
  let result: boolean = false;

  if (isActive) {
    await apiClient
      .put(`/tutorials/publish/${id}`)
      .then((response) => (result = true))
      .catch((err) =>
        log(
          `API publishTutorialById: id = ${id} > ${err.message}`,
          LogLevel.Error
        )
      );
  }

  return result;
};

const createTutorial = async (
  tutorial: ITutorial,
  file: File
): Promise<ITutorial | null> => {
  let result: ITutorial | null = null;

  const data = new FormData();

  data.append("title", tutorial.title);
  data.append("description", tutorial.description);
  data.append("published", tutorial.published.toString());
  data.append("tutorial", file);

  if (isActive) {
    await apiClient
      .post("/tutorials", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => (result = res.data))
      .catch((err) =>
        log(`API createTutorial > ${err.message}`, LogLevel.Error)
      );
  }

  if (!result) {
    return null;
  }

  return result;
};

const updateTutorialWithFile = async (
  tutorial: ITutorial,
  file: File
): Promise<boolean> => {
  let result: boolean = false;

  const data = new FormData();

  data.append("title", tutorial.title);
  data.append("description", tutorial.description);
  data.append("published", tutorial.published.toString());
  data.append("tutorial", file);

  if (isActive) {
    await apiClient
      .put(`/tutorials/file/${tutorial.id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => (result = true))
      .catch((err) =>
        log(`API updateTutorialWithFile > ${err.message}`, LogLevel.Error)
      );
  }

  return result;
};

const updateTutorial = async (tutorial: ITutorial): Promise<boolean> => {
  let result: boolean = false;

  if (isActive) {
    await apiClient
      .put(`tutorials/${tutorial.id}`, tutorial)
      .then((response) => (result = true))
      .catch((err) =>
        log(`API updateTutorial > ${err.message}`, LogLevel.Error)
      );
  }

  return result;
};

export {
  getAllTutorials,
  deleteAllTutorials,
  deleteTutorialById,
  publishAllTutorials,
  publishTutorialById,
  createTutorial,
  updateTutorialWithFile,
  updateTutorial,
};
