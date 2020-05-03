import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';

export default function DropContainer(props) {
  const { column, id } = props;
  return (
    <div className='columnContainer'>
      <h2> {column.name}</h2>
      <div className='dropContainer'>
        <Droppable droppableId={id} key={id}>
          {(provided, snapshot) => {
            const droppableStyle = snapshot.isDraggingOver
              ? 'droppableblue'
              : 'droppablegray';
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`droppable ${droppableStyle}`}
              >
                {column.items.map((item, index) => {
                  return <Item item={item} index={index} key={index} />;
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </div>
  );
}
