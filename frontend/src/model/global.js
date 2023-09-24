import { atom } from "jotai";

export const globalAtom = {
  errorToast: atom({
    show: false,
    message: "",
  }),
};
