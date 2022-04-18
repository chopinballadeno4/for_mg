import { atom, selector } from "recoil";

export const username = atom({
    key: "username",
    default: "Anonymous",
});

export const uselistatom = atom({
    key: "uselist",
    default: [],
});