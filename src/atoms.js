import { atom, selector } from "recoil";

export const username = atom({
    key: "username",
    default: "Anonymous",
});

export const uselist = atom({
    key: "uselist",
    default: [],
});