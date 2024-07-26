const DialogIds = {
  LoadEmpty: "LOADING",
  NotFound: "FIND",
  Duplicate: "LOADING",
};

const dialogInfo = [
  {
    id: DialogIds.LoadEmpty,
    title: "No Tutorials Retrieved",
    message: "Is Server Running?",
  },
  { id: DialogIds.NotFound, title: "", message: "" },
  { id: DialogIds.Duplicate, title: "", message: "" },
];

export { dialogInfo, DialogIds };
