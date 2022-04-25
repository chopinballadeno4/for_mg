import "../css/Todocss.css";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

function DragabbledCard({ toDo, index }) {
    console.log(toDo, "has been rendered");
    return (
        <Draggable key={toDo} draggableId={toDo} index={index}>
            {(magic) => (
                <div 
                className="Card"
                ref={magic.innerRef}
                {...magic.dragHandleProps}
                {...magic.draggableProps}
                >
                    {toDo}        
                </div> 
            )}
        </Draggable>
    );
}

export default DragabbledCard;