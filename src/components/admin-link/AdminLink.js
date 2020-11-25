import React, { useRef, useState } from 'react';
import { GrDrag } from 'react-icons/gr';
import { MdDeleteSweep } from 'react-icons/md';
import EditableInput from '../editable-input/EditableInput';
import './AdminLink.scss';

const AdminLink = ({ link, handleDrag, handleDelete }) => {
  const [linkObj, updateLink] = useState(link);
  const nameInput = useRef();
  const urlInput = useRef();

  const handleInput = (type, ref) => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.focus();
      }
    }, 100);

    const newLink = { ...linkObj };
    if (type === 'name') {
      newLink.nameEditing = true;
    } else if (type === 'url') {
      newLink.urlEditing = true;
    }
    updateLink(newLink);
  };

  const handleChange = (event) => {
    const newLink = { ...linkObj };
    newLink.name = event.target.value;
    updateLink(newLink);
  };

  const handleBlur = (event) => {
    console.log('blur', event);
    const newLink = { ...linkObj };
    if (event.target.className === 'link-name__input') {
      newLink.nameEditing = false;
    } else if (event.target.className === 'link-url__input') {
      newLink.urlEditing = false;
    }
    updateLink(newLink);
  };

  return (
    <div
      className='drag-handle'
      style={{
        display: 'flex',
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '1rem',
        paddingLeft: 0,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        {...handleDrag}
      >
        <GrDrag className='drag-handle__icon' />
      </div>
      <div style={{ width: '90%', paddingLeft: '0.5rem' }}>
        <EditableInput
          handleBlur={handleBlur}
          handleInput={handleInput}
          handleChange={handleChange}
          inputRef={nameInput}
          value={linkObj.name}
          type='name'
          isEditing={linkObj.nameEditing}
        />
        <EditableInput
          handleBlur={handleBlur}
          handleInput={handleInput}
          handleChange={handleChange}
          inputRef={urlInput}
          value={linkObj.url}
          type='url'
          isEditing={linkObj.urlEditing}
        />
        <button
          onClick={() => handleDelete(linkObj.id)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem',
          }}
        >
          <MdDeleteSweep />
        </button>
      </div>
    </div>
  );
};

export default AdminLink;
