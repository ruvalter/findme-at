import React, { useState } from "react";
import AdminLink from "../../components/admin-link/AdminLink";
import { LINKS } from "../../shared/app-constants";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Admin = () => {
  const [links, updateLinks] = useState(LINKS);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(links);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateLinks(items);
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
                listStyle: "none",
                marginBottom: "1rem",
              },
            }}
          >
            <AdminLink link={item} handleDrag={{...provided.dragHandleProps }}/>
          </li>
        )}
      </Draggable>
    );
  });

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="adminLinks">
        {(provided) => (
          <ul
            className="adminLinks"
            style={{ margin: "0 auto" }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {adminLinks}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Admin;
