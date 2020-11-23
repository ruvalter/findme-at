import React, { useState } from 'react';
import AdminLink from '../../components/admin-link/AdminLink';
import { LINKS } from '../../shared/app-constants';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Admin = () => {
  document.title = 'Admin | Link Explorer';
  const [links, updateLinks] = useState(LINKS);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(links);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateLinks(items);
  };

  const handleDelete = (name) => {
    const filteredList = links.filter((link) => link.name !== name);
    updateLinks(filteredList);
  };

  const adminLinks = links.map((item, index) => {
    return (
      <Draggable key={item.name} draggableId={item.name} index={index}>
        {(provided) => (
          <li
            ref={provided.innerRef}
            {...{
              ...provided.draggableProps,
              style: {
                ...provided.draggableProps.style,
                listStyle: 'none',
                marginBottom: '1rem',
              },
            }}
          >
            <AdminLink
              link={item}
              handleDrag={{ ...provided.dragHandleProps }}
              handleDelete={handleDelete}
            />
          </li>
        )}
      </Draggable>
    );
  });

  return (
    <>
      <div
        style={{
          width: '90%',
          maxWidth: '40rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>My Links</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='adminLinks'>
            {(provided) => (
              <ul
                className='adminLinks'
                style={{ margin: '0', padding: 0, width: '100%' }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {adminLinks}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default Admin;
