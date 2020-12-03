import React from 'react';
import { RiEdit2Fill } from 'react-icons/ri';
import './EditableInput.scss';

const EditableInput = ({
  handleChange,
  handleInput,
  handleBlur,
  inputRef,
  value,
  isEditing,
  type,
}) => {
  return (
    <div
      style={{
        minHeight: '31px',
        display: 'flex',
        alignItems: 'center',
        handleChange,
        inputRef,
      }}
    >
      <input
        type='text'
        className={`link-${type}__input`}
        onBlur={(event) => handleBlur(event, type)}
        ref={inputRef}
        onChange={(event) => handleChange(event, type)}
        defaultValue={value}
        style={{ display: isEditing ? 'block' : 'none' }}
      />
      <span
        onClick={() => handleInput(type, inputRef)}
        className={`link-${type}__text`}
        style={{ display: isEditing ? 'none' : 'inline-block' }}
      >
        {value}
      </span>
      <button
        onClick={() => handleInput(type, inputRef)}
        style={{
          fontSize: '18px',
          display: isEditing ? 'none' : 'flex',
          background: 'none',
          border: 'none',
          verticalAlign: 'middle',
          cursor: 'pointer',
          color: 'var(--c_grey-d)',
        }}
      >
        <RiEdit2Fill />
      </button>
    </div>
  );
};

export default EditableInput;
