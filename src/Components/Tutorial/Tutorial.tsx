// HOME page
import React, { useEffect, useRef, useState } from "react";

import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import NavigationBar from "../Navigation/NavigationBar";
import TutorialList from "./TutorialList";
import CreateTutorial from "./Creation/CreateTutorial";
import FindTutorial from "./Find/FindTutorial";
import Views from "../../enum/Views";
import Pages from "../../enum/Pages";
import ModalDialog from "../Dialog/ModalDialog";
import {
  createTutorialWithFileREST,
  deleteAllTutorialsREST,
  deleteTutorialByIdREST,
  getAllTutorialsREST,
  publishAllTutorialsREST,
  publishTutorialByIdREST,
  updateTutorialREST,
} from "../../Api/Services/RestService";
import { log } from "../../Logging/Logger";
import LogLevel from "../../enum/LogLevel";
import { dialogInfo } from "../../enum/Dialogs";

const Tutorial = () => {
  const navigate = useNavigate();
  const modalRef = useRef<any>();

  const tutorials = useRef<ITutorial[]>();
  const [viewTutorials, setViewTutorials] = useState<ITutorial[]>();

  const [currentPage, setCurrentPage] = useState<string>(Pages.Home);
  const navigateToPage = (page: string): void => {
    if (page === Pages.Create) {
      log(`UPDATE MODE = false`);
      setUpdateMode(false);
    } else if (page === Pages.Update) {
      page = Pages.Create;
      log(`UPDATE MODE = true`);
      setUpdateMode(true);
    }

    log(`NAVIGATE TO ${page}`);
    navigate(`/${page}`);

    setCurrentPage(page);
  };

  const searchTutorialId = useRef<any>(null);

  const [currentView, setCurrentView] = useState<string>(Views.All);
  const changeView = (view: string) => {
    log(`CHANGE VIEW TO ${view}`);
    setCurrentView(view);

    if (view === Views.All) {
      log("ViewTutorials = All");
      setViewTutorials(tutorials.current);
    } else if (view === Views.AllPub) {
      const _tutorials = tutorials.current!.filter(
        (tutorial) => tutorial.published
      );
      log("ViewTutorials = All Published");
      setViewTutorials(_tutorials);
    } else if (view === Views.NonPub) {
      const _tutorials = tutorials.current!.filter(
        (tutorial) => !tutorial.published
      );
      log("ViewTutorials = All Non Published");
      setViewTutorials(_tutorials);
    } else if (view === Views.Search) {
      if (searchTutorialId) {
        const _tutorials = tutorials.current!.filter((tutorial) => {
          return tutorial
            .id!.toString()
            .trim()
            .includes(searchTutorialId.current);
        });
        log("ViewTutorials = Search By Id");
        setViewTutorials(_tutorials);
      }
    }
  };

  const updateMode = useRef<boolean>(false);
  const setUpdateMode = (isUpdate: boolean) => (updateMode.current = isUpdate);
  const selectedTutorialForUpdate = useRef<ITutorial | any>(null);

  const selectTutorialForUpdate = (tutorial: ITutorial): void => {
    selectedTutorialForUpdate.current = tutorial;
  };

  const showTutorialDialog = (dialogId: string): void => {
    const data = dialogInfo.filter((info) => info.id === dialogId);

    if (data) {
      modalRef.current.setModalData(data[0].title, data[0].message);
      modalRef.current.showDialog();
    }
  };

  useEffect(() => {
    log("STARTING TUT-O-PEDIA");

    log("Loading Tutorials");
    loadAllTutorials();
    // eslint-disable-next-line
  }, []);

  const loadAllTutorials = async () => {
    const result: ITutorial[] | null = await getAllTutorialsREST();

    log(`Loaded ${result === null ? 0 : result} Tutorials`, LogLevel.Warning);

    if (result) {
      tutorials.current = result;
    } else {
      modalRef.current.setModalData(
        "No Tutorials Retrieved",
        `Is Server Running ?`
      );
      modalRef.current.showDialog();
      tutorials.current = [];
    }

    changeView(Views.All);
    navigateToPage(Pages.Home);
  };

  const existsNonPublishedTutorials = (): boolean => {
    if (viewTutorials) {
      const tutorialList = viewTutorials!.filter(
        (tutorial) => !tutorial.published
      );

      return tutorialList.length > 0;
    }

    return false;
  };

  // DELETE
  const deleteTutorialByIdSilent = (id: number): void => {
    const tutorialsList = tutorials.current!.filter((item) => item.id !== id);

    tutorials.current = tutorialsList;
  };

  const deleteTutorialById = async (id: number): Promise<void> => {
    let result: boolean = await deleteTutorialByIdREST(id);

    if (result) {
      deleteTutorialByIdSilent(id);
    }

    changeView(Views.All);
  };

  const deleteAllTutorialsInView = async (): Promise<void> => {
    let result: boolean = await deleteAllTutorialsREST();

    if (result) {
      const tutorialsToDelete = viewTutorials!.filter(
        (tutorial) => !tutorial.published
      );

      for (let tutorial of tutorialsToDelete) {
        deleteTutorialByIdSilent(tutorial.id!);
      }
    }

    if (!searchTutorialId.current) {
      const searchedTutorials = tutorials.current!.filter(
        (tutorial) => tutorial.id === searchTutorialId.current
      );

      searchTutorialId.current =
        searchedTutorials.length === 0 ? undefined : searchTutorialId.current;
    }

    changeView(Views.All);
  };

  // PUBLISH
  const publishTutorialByIdSilent = (id: number): void => {
    const tutorialsList = tutorials.current!.map((obj) =>
      obj.id === id ? { ...obj, published: true } : obj
    );

    tutorials.current = tutorialsList;
  };

  const publishTutorialById = async (id: number): Promise<void> => {
    let result: boolean = await publishTutorialByIdREST(id);

    if (result) {
      publishTutorialByIdSilent(id);
    }

    changeView(Views.AllPub);
  };

  const publishAllTutorialsInView = async (): Promise<void> => {
    let result: boolean = await publishAllTutorialsREST();

    if (result) {
      const tutorialsToPublish = viewTutorials!.filter(
        (tutorial) => !tutorial.published
      );

      for (let tutorial of tutorialsToPublish) {
        publishTutorialByIdSilent(tutorial.id!);
      }
    }

    changeView(Views.AllPub);
  };

  const containsKeywords = (
    title: string,
    description: string,
    keywords: IKeyword[]
  ): boolean => {
    let results = keywords.filter(
      (keyword) =>
        title.includes(keyword.content) || description.includes(keyword.content)
    );

    return results.length > 0;
  };

  // FIND
  const findTutorialById = (id: String): void => {
    const tutorialsList = tutorials.current!.filter((tutorial) => {
      return tutorial.id!.toString().trim().includes(id.valueOf());
    });

    if (tutorialsList.length === 0) {
      modalRef.current.setModalData(
        "Tutorial Not Found",
        `Tutorial With ID = ${id} Not Found`
      );
      modalRef.current.showDialog();
      changeView(Views.All);
    } else {
      searchTutorialId.current = id;
      changeView(Views.Search);
    }
  };

  const findByTutorialsByKeywords = (keywords: IKeyword[]): void => {
    const tutorialsFound = tutorials.current!.filter((tutorial) =>
      containsKeywords(tutorial.title, tutorial.description, keywords)
    );

    if (tutorialsFound.length > 0) {
      setViewTutorials(tutorialsFound);
      changeView(Views.Multi);
    } else {
      const nrOfKeywords = keywords.length;

      modalRef.current.setModalData(
        "Tutorial Not Found",
        `No Tutorials Found With ${
          nrOfKeywords === 1 ? "That Keyword" : "Those Keywords"
        }`
      );
      modalRef.current.showDialog();
      changeView(Views.All);
    }

    navigateToPage(Pages.Home);
  };

  // UPDATE
  const updateTutorial = async (
    values: ICreateFormValue,
    file: File
  ): Promise<void> => {
    const tutorialsToUpdate = tutorials.current!.map((item) =>
      item.id === values.id
        ? {
            ...item,
            title: values.title,
            description: values.description,
            filename:
              values.filename === undefined ? item.filename : values.filename,
          }
        : item
    );

    const updatingTutorial = tutorialsToUpdate.find(
      (tutorial) => tutorial.id === values.id
    );

    let result: boolean = await updateTutorialREST(updatingTutorial, file);

    if (result) {
      tutorials.current = tutorialsToUpdate;

      searchTutorialId.current = values.id;

      changeView(Views.Search);
    }

    navigateToPage(Pages.Home);
  };

  // CREATE
  const createTutorial = async (
    values: ICreateFormValue,
    file: File
  ): Promise<void> => {
    if (
      tutorials.current!.filter((tutorial) => tutorial.title === values.title)
        .length > 0
    ) {
      modalRef.current.setModalData(
        "Duplicate Tutorial",
        `Tutorial With Same Name Already Exists "${values.title}"`
      );
      modalRef.current.showDialog();
      return;
    }

    const tutorialToPersist: ITutorial = {
      id: values.id,
      title: values.title,
      description: values.description,
      filename: values.filename,
      published: false,
    };

    const newTutorialId = await createTutorialWithFileREST(
      tutorialToPersist,
      file
    );

    if (newTutorialId != null) {
      const newTutorialsList = [
        ...tutorials.current!,
        { ...tutorialToPersist, id: newTutorialId.id },
      ];
      tutorials.current = newTutorialsList;

      searchTutorialId.current = newTutorialId;

      changeView(Views.Search);
    }
  };

  const handleCreateOrUpdateTutorial = (
    values: ICreateFormValue,
    file: File
  ): void => {
    if (updateMode.current) {
      updateTutorial(values, file);
    } else {
      createTutorial(values, file);
    }
  };

  return (
    <div>
      <ModalDialog ref={modalRef} />
      <Routes>
        <Route
          path="/"
          element={
            <NavigationBar
              tutorials={viewTutorials!}
              currentPage={currentPage}
              currentView={currentView}
              searchTutorialId={searchTutorialId.current}
              navigateToPage={navigateToPage}
              handleChangeView={changeView}
              findTutorialById={findTutorialById}
              existsNonPublishedTutorials={existsNonPublishedTutorials()}
              deleteAllTutorialsInView={deleteAllTutorialsInView}
              publishAllTutorialsInView={publishAllTutorialsInView}
            />
          }
        >
          <Route
            index
            element={
              <TutorialList
                tutorials={viewTutorials!}
                deleteTutorialById={deleteTutorialById}
                publishTutorialById={publishTutorialById}
                selectTutorialForUpdate={selectTutorialForUpdate}
                navigateToPage={navigateToPage}
              />
            }
          />

          <Route
            path="create"
            element={
              <CreateTutorial
                isUpdateMode={updateMode.current}
                selectedTutorialForUpdate={selectedTutorialForUpdate.current}
                navigateToPage={navigateToPage}
                handleCreateOrUpdateTutorial={handleCreateOrUpdateTutorial}
              />
            }
          />

          <Route
            path="find"
            element={
              <FindTutorial
                navigateToPage={navigateToPage}
                findByTutorialsByKeywords={findByTutorialsByKeywords}
              />
            }
          />

          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Tutorial;
