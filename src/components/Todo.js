import "../css/Todocss.css";
import React from "react";
import { DragDropContext, Droppable, Draggable, DropResult} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "../atoms";

function Todo() {
    console.log("Todo mount !");
    const [ toDos, setToDos ] = useRecoilState(toDoState);
    
    const onDragEnd = ({draggableId, destination, source}) => {
        // if(!destination) return;
        // setToDos((oldToDos) => {
        //     const toDosCopy = [...oldToDos];
        //     console.log("Delete item on", source.index);
        //     console.log(toDosCopy);
        //     toDosCopy.splice(source.index, 1);
        //     console.log("Deleted item");
        //     console.log(toDosCopy);
        //     console.log("put back", draggableId, "on ", destination.index);
        //     toDosCopy.splice(destination?.index, 0, draggableId);
        //     console.log(toDosCopy);
        //     return toDosCopy;
        // })
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="Wrapper">
                <div className="Boards">
                    <Droppable droppableId="one">
                    {(magic) => (
                        <div className ="Board" ref={magic.innerRef} {...magic.droppableProps}>
                            {toDos.map((toDo, index) => (
                                <Draggable key={toDo} draggableId={toDo} index={index}>
                                    {(magic) => (
                                        <div className="Card" 
                                            ref={magic.innerRef} 
                                            {...magic.dragHandleProps}
                                            {...magic.draggableProps}
                                        >
                                            {toDo}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {magic.placeholder}
                        </div>
                    )}
                    </Droppable>
                </div>
            </div>
        </DragDropContext>
    );
}

export default Todo;