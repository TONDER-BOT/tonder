import { atom } from "jotai";

export const exploreAtom = {
  loading: atom(false),
  swipeCard: atom({
    name: "Veronica",
    desc: "Newbie in the city, looking for someone to show me around!",
    imgURL:
      "https://unsplash.com/photos/QXevDflbl8A/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTV8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHx8fDE2OTU0NTY2OTV8MA&force=true&w=640",
  }),
};
