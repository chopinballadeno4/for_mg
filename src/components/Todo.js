import "../css/Todocss.css";
import React from "react";
import { DragDropContext, Droppable, Draggable, DropResult} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "../atoms";

function Todo() {
    console.log("Todo mount !");
    const [ toDos, setToDos ] = useRecoilState(toDoState);

    const onDragEnd = ({draggableId, destination, source}) => {
        if(!destination) return;
            //setToDos((oldToDos) => {
            // const toDosCopy = [...oldToDos];
            // console.log("Delete item on", source.index);
            // console.log(toDosCopy);
            // toDosCopy.splice(source.index, 1);
            // console.log("Deleted item");
            // console.log(toDosCopy);
            // console.log("put back", draggableId, "on ", destination.index);
            // toDosCopy.splice(destination?.index, 0, draggableId);
            // console.log(toDosCopy);
            // return toDosCopy;
            //})
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="Wrapper">
                <div className="Boards">
                    {Object.keys(toDos).map((boardId) => (
                        <div 
                        className="Board"
                        boardId={boardId}
                        key={boardId}
                        toDos={toDos[boardId]}
                        />
                    ))}
                </div>
            </div>
        </DragDropContext>
    );
}

export default Todo;