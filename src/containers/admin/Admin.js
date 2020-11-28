import React, { useCallback, useEffect, useState } from 'react';
import AdminLink from '../../components/admin-link/AdminLink';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FiPlus } from 'react-icons/fi';
import LinksService from '../../shared/links-service';
import './Admin.scss';

const Admin = () => {
  document.title = 'Admin | Link Explorer';
  const [links, updateLinks] = useState([]);
  const linkService = useCallback(() => new LinksService(), []);

  useEffect(() => {
    const fetchData = async () => {
      updateLinks(await linkService().getAllLinks());
    };
    fetchData();
  }, [linkService]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const linkArr = Object.keys(links).map((id) => links[id]);
    const items = linkArr.sort((a, b) => a.order - b.order);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const linksEntity = {};
    items.forEach((item, index) => {
      linksEntity[item.id] = { ...item, order: index };
    });
    updateLinks(linksEntity);

    linkService().updateOrder(items);
  };

  const handleDelete = (id) => {
    const newList = { ...links };
    delete newList[id];

    linkService()
      .deleteLink(id)
      .then(() => {
        updateLinks(newList);
      });
  };

  const handleUpdate = (id, payload) => {
    const newList = {
      ...links,
      [id]: {
        ...links[id],
        ...payload,
      },
    };

    updateLinks(newList);
    return linkService().updateLink(id, payload);
  };

  const handleNewLink = () => {
    const newLink = {
      url: 'Add a URL',
      name: 'Choose a label for this link',
      icon: 'new',
      order: 0,
      id: 'new',
    };

    const newList = {
      ...links,
    };

    Object.keys(newList).forEach((id) => {
      newList[id].order++;
    });

    newList['new'] = {
      ...newLink,
    };

    updateLinks(newList);

    const linkArr = Object.keys(links).map((id) => links[id]);
    const items = linkArr.sort((a, b) => a.order - b.order);

    linkService()
      .addNewLink(newLink, items)
      .then((docRef) => {
        console.log('res', docRef.id);
        newLink.id = docRef.id;
        const updatedList = {
          ...links,
          [docRef.id]: {
            ...newLink,
          },
        };

        delete updatedList['new'];
        updateLinks(updatedList);
      });
  };
  const linkList = Object.keys(links).map((id) => links[id]);
  const orderList = linkList.sort((a, b) => a.order - b.order);

  const adminLinks =
    orderList &&
    orderList.map((link, index) => {
      return (
        <Draggable key={link.id} draggableId={link.id} index={index}>
          {(provided, snapshot) => (
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
                link={link}
                isDragging={snapshot.isDragging}
                handleUpdate={handleUpdate}
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
          alignItems: 'stretch',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginBottom: '2rem',
          }}
        >
          <h1 style={{ margin: 0, marginRight: '1rem' }}>My Links</h1>
          <button
            style={{
              bakground: 'none',
              backgroundColor: 'transparent',
              borderRadius: '5px',
            }}
            onClick={handleNewLink}
          >
            <FiPlus /> New Link
          </button>
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='adminLinks'>
            {(provided, snapshot) => (
              <ul
                className={`admin-links ${
                  snapshot.isDraggingOver
                    ? 'admin-links--dragging'
                    : 'admin-links--stable'
                }`}
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
