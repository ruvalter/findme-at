import React, { useCallback, useEffect, useState } from 'react';
import AdminLink from '../../components/admin-link/AdminLink';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import LinksService from '../../shared/links-service';
import './AdminLinks.scss';
import BlockButton from '../../components/buttons/block-button/BlockButton';
import { auth } from '../../firebase/firebase';
import DocTitle from '../../components/doc-title/DocTitle';
import { getUserInfo } from '../../shared/user-service';


const AdminLinks = (props) => {
  const [links, updateLinks] = useState([]);
  const [user, setUser] = useState();
  const linkService = useCallback((id) => new LinksService(id), []);

  useEffect(() => {
    const fetchData = () => {
      auth.onAuthStateChanged(async (user) => {
        const linkList = await linkService(user.uid).getAllLinks(user.uid);
        const currentUser = await getUserInfo(user.uid);

        setUser(currentUser);
        updateLinks(linkList);
      });
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
      profile: user?.exposedUrl,
      id: 'new',
    };

    // const newList = {
    //   ...links,
    // };

    // Object.keys(newList).forEach((id) => {
    //   newList[id].order++;
    // });

    // newList['new'] = {
    //   ...newLink,
    // };

    // updateLinks(newList);

    // const linkArr = Object.keys(links).map((id) => links[id]);
    // const items = linkArr.sort((a, b) => a.order - b.order);

    linkService()
      .addNewLink(newLink)
      .then((docRef) => {
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

  const adminLinks =
    linkList &&
    linkList.map((link, index) => {
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
          alignItems: 'stretch',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '40rem',
          padding: '0 1rem',
          width: '100%'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '2rem',
          }}
        >
          <DocTitle  styleProps={{ margin: 0, marginRight: '1rem', color: 'var(--c_blue-d)' }} headingText="Admin Links"/>
          <BlockButton type='button' handle={handleNewLink} />
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

export default AdminLinks;