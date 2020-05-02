import React from "react";
import {Draggable} from 'react-beautiful-dnd';

export default function Item(props) {
  const {item, index} = props;
  
    return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        const itemStyle = snapshot.isDragging ? "itemBlue" : "itemLight";
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`item ${itemStyle}`}
            // style={{
            //   ...provided.draggableProps.style
            // }}
          >
            {item.content}
          </div>
        );
      }}
    </Draggable>
  );
}
