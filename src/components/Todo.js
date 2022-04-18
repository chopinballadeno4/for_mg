import "../css/Todocss.css";
import React from "react";
import { DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

function Todo() {
    const toDos = ["a", "b", "c", "d", "e", "f"];

    const onDragEnd = () => {};

    console.log("kk");

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="Wrapper">
                <div className="Boards">
                    <Droppable droppableId="one">
                    {(magic) => (
                        <div className ="Board" ref={magic.innerRef} {...magic.droppableProps}>
                            {toDos.map((toDo, index) => (
                                <Draggable draggableId={toDo} index={index}>
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