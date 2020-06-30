import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import io from 'socket.io-client';

import DropContainer from './DropContainer';
import './App.css';

const socket = io('http://localhost:4000');

const itemsFromBackend = [
  { id: uuid(), content: 'First task' },
  { id: uuid(), content: 'Second task' },
];

const columnsFromBackend = {
  [uuid()]: {
    name: 'Requested',
    items: itemsFromBackend,
  },
  [uuid()]: {
    name: 'To Do',
    items: [],
  },
  [uuid()]: {
    name: 'In Progress',
    items: [],
  },
  [uuid()]: {
    name: 'Done',
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
    // socket.emit('drag-drop',{columns: JSON.stringify(columns)});
  }
};

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const dragDropContext = useRef(null);
  const dropContainer = useRef(null);

  useEffect(() => {
    socket.on('drag-drop-remote', ({ result, columns, setColumns }) => {});
  });

  return (
    <div className='App'>
      <DragDropContext
        ref={dragDropContext}
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([id, column]) => {
          return (
            <DropContainer
              ref={dropContainer}
              id={id}
              column={column}
              key={id}
            />
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
