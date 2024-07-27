const DialogIds = {
  LoadEmpty: "LOADING",
  NotFound: "FIND",
  Duplicate: "LOADING",
};

const dialogInfo = [
  {
    id: DialogIds.LoadEmpty,
    title: "Load Problem. No Tutorials Retrieved",
    message: "Is Server Running?",
  },
  {
    id: DialogIds.NotFound,
    title: "Not Found",
    message: "Tutorial Not Found",
  },
  { id: DialogIds.Duplicate, title: "", message: "" },
];

export { dialogInfo, DialogIds };
