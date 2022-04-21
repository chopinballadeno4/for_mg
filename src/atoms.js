import { atom, selector } from "recoil";

export const username = atom({
    key: "username",
    default: "Anonymous",
});

export const uselistatom = atom({
    key: "uselist",
    default: [],
});

export const toDoState = atom({
    
    key: "toDo",
     /*
    default: {
        "To Do": [],
        "Doing": [],
        "Done": [],
    }
    */
        default: ["a", "b", "c", "d", "e"],
        
})