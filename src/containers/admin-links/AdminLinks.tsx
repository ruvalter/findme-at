import React, { useContext, useEffect, useState } from 'react';
import AdminLink from '../../components/admin-link/AdminLink';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './AdminLinks.scss';
import BlockButton from '../../components/buttons/block-button/BlockButton';
import DocTitle from '../../components/doc-title/DocTitle';
import {
  firebaseAuth,
  useAuthContext,
} from '../../shared/providers/auth-provider';
import {
  addNewLink,
  deleteLink,
  updateLink,
  updateOrder,
} from '../../shared/services/links-service';
import { useLinkContext } from '../../shared/providers/link.provider';
import { LinkEntity, UserLink } from '../../shared/models/user-link.model';

const AdminLinks = () => {
  const [links, updateLinks] = useState({} as LinkEntity);
  const { loggedUser } = useAuthContext();
  const { userLinks } = useLinkContext() as any;
  const { handleSignout } = useContext(firebaseAuth);

  useEffect(() => {
    const fetchData = async () => {
      updateLinks(userLinks);
    };
    fetchData();
  }, [userLinks]);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const linkArr = Object.keys(links).map((id: any) => links[id]);
    const items = linkArr.sort((a: UserLink, b: UserLink) => a.order - b.order);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const linksEntity = {} as LinkEntity;
    items.forEach((item, index) => {
      linksEntity[item.id] = { ...item, order: index };
    });
    updateLinks(linksEntity);

    updateOrder(loggedUser.userId, items);
  };

  const handleDelete = (id: string) => {
    const newList = { ...links };
    delete newList[id];

    deleteLink(loggedUser.userId, id).then(() => {
      updateLinks(newList);
    });
  };

  const handleUpdate = (id: string, payload: UserLink) => {
    const newList = {
      ...links,
      [id]: {
        ...links[id],
        ...payload,
      },
    };

    updateLinks(newList);
    return updateLink(loggedUser.userId, id, payload);
  };

  const handleNewLink = () => {
    const newLink = {
      url: 'Add a URL',
      name: 'Choose a label for this link',
      icon: 'new',
      order: 0,
      profile: loggedUser?.exposedUrl,
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

    addNewLink(loggedUser.userId, newLink).then((docRef) => {
      newLink.id = docRef.id;
      const updatedList = {
        ...links,
        [docRef.id]: {
          ...newLink,
        },
      } as LinkEntity;

      delete updatedList['new'];
      updateLinks(updatedList);
    });
  };

  const signout = () => {
    console.log('signing out');
    handleSignout();
  };

  const linkList = Object.keys(links)
    .map((id) => links[id])
    .sort((a, b) => a.order - b.order);

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
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '2rem',
          }}
        >
          <DocTitle
            styleProps={{
              margin: 0,
              marginRight: '1rem',
              color: 'var(--c_blue-d)',
            }}
            headingText='Admin Links'
          />
          <button type='button' onClick={signout}>
            Logout
          </button>
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
