import { atom } from "jotai";

export const exploreAtom = {
  loading: atom(false),
  liking: atom(false),
  matchModalShow: atom(false),
  swipeCard: atom({
    name: "Xuan",
    desc: "Newbie in the city, looking for someone to show me around!",
    imgURL:
      "https://unsplash.com/photos/orYdcTza06E/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBob3RvJTIwYXNpYW58ZW58MHx8fHwxNjk1NDk2MDk4fDI&force=true&w=640",
  }),
};
