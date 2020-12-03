import React, { useRef, useState } from 'react';
import {  MdDragHandle } from 'react-icons/md';
import EditableInput from '../editable-input/EditableInput';
import ToolBox from '../tool-box/ToolBox';
import './AdminLink.scss';

const AdminLink = ({
  link,
  handleDrag,
  handleDelete,
  handleUpdate,
  isDragging,
}) => {
  const [linkObj, updateLink] = useState(link);
  const nameInput = useRef();
  const urlInput = useRef();

  const handleInput = (type, ref) => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.select();
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

  const toggleActivation = () => {
    const newLink = { ...linkObj };
    newLink.enabled = !newLink.enabled;
    updateLink(newLink);
    handleUpdate(newLink.id, { enabled: newLink.enabled })
  }

  const handleChange = (event, type) => {
    const newLink = { ...linkObj };
    newLink[type] = event.target.value;
    updateLink(newLink);
  };

  const handleBlur = (event, type) => {
    const newLink = { ...linkObj };
    if (event.target.className === 'link-name__input') {
      newLink.nameEditing = false;
    } else if (event.target.className === 'link-url__input') {
      newLink.urlEditing = false;
    }

    newLink[`${type}Editing`] = false;

    handleUpdate(newLink.id, { [type]: event.target.value });
    updateLink(newLink);
  };

  return (
    <div
      className={`drag-handle ${
        isDragging ? 'drag-handle--dragging' : 'drag-handle--stable'
      }`}
      style={{
        display: 'flex',
        borderRadius: '10px',
        padding: '1rem',
        paddingLeft: 0,
        overflow: 'hidden',
      }}
    >
        <button 
          type="button"
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            width: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px',
            color: 'var(--c_blue-d)'
          }}
          {...handleDrag}
          aria-pressed={false}>
            <MdDragHandle className='drag-handle__icon' />
        </button>
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
        <ToolBox toggleActivation={toggleActivation} handleDelete={handleDelete} linkObj={linkObj}/>
      </div>
    </div>
  );
};

export default AdminLink;
