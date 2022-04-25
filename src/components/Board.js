import "../css/Todocss.css";
import { Droppable } from "react-beautiful-dnd";
import DragabbledCard from "./DraggabbleCard";

function Board({ toDos, boardId }) {
    return(
        <Droppable droppable={boardId}>
            {(magic) => (
                <div 
                className="Wrapper"
                ref={magic.innerRef}
                {...magic.droppableProps}
                >
                    {toDos.map((toDo, index) => (
                        <DragabbledCard key={toDo} index={index} toDo={toDo} />
                    ))}
                    {magic.placeholder}
                </div>
            )}
        </Droppable>
    );
}

export default Board;