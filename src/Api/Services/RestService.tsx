import {
  createTutorial,
  deleteAllTutorials,
  deleteTutorialById,
  getAllTutorials,
  publishAllTutorials,
  publishTutorialById,
  updateTutorial,
  updateTutorialWithFile,
} from "../Api";

const getAllTutorialsREST = async (): Promise<ITutorial[] | null> => {
  const response: ITutorial[] | null = await getAllTutorials();

  return response;
};

const createTutorialWithFileREST = async (
  tutorial: ITutorial,
  file: File
): Promise<ITutorial | null> => {
  return await createTutorial(tutorial, file);
};

const updateTutorialREST = async (
  tutorial: ITutorial | undefined,
  file: File
): Promise<boolean> => {
  if (tutorial) {
    if (file === undefined) {
      return await updateTutorial(tutorial!);
    }

    return await updateTutorialWithFile(tutorial!, file);
  }

  return false;
};

const deleteAllTutorialsREST = async (): Promise<boolean> => {
  return await deleteAllTutorials();
};

const deleteTutorialByIdREST = async (id: number): Promise<boolean> => {
  return await deleteTutorialById(id);
};

const publishAllTutorialsREST = async (): Promise<boolean> => {
  return await publishAllTutorials();
};

const publishTutorialByIdREST = async (id: number): Promise<boolean> => {
  return await publishTutorialById(id);
};

export {
  getAllTutorialsREST,
  deleteAllTutorialsREST,
  deleteTutorialByIdREST,
  publishAllTutorialsREST,
  publishTutorialByIdREST,
  createTutorialWithFileREST,
  updateTutorialREST,
};
