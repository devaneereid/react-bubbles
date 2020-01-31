import React, { useState } from "react";
import axios from "axios";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    // e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        setColorToEdit(res.data)
        setEditing(false)
        console.log(res)
      })
      .catch(err => console.log('Error', err))
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        setColorToEdit(res)
        refreshPage()
        // colors.setItems(res.data)
        // colors.history.push(`/bubblepage`);
      })
      .catch(err => console.log('ColorList Error', err));
  };

  const handleChange = e => {
    setNewColor({
      ...newColor,
        [e.target.name]: e.target.value
    });
  };

  function refreshPage() {
    window.location.reload(false);
  }

  const addNewColor = e => {
    axiosWithAuth()
      .post('/api/colors', newColor)
      .then(res => {
        setNewColor(res)
        refreshPage()
        console.log(res.data)
      })
      .catch(err => {
        console.log(err.res)
      })
  }
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x 
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button onClick={refreshPage} type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
              <form onSubmit={addNewColor}>
                <input
                  type='text'
                  name='name'
                  value={newColor.name}
                  onChange={handleChange}
                  placeholder='Color'
                  />
                <input  
                  type='text'
                  name='hex'
                  value={newColor.hex}
                  onChange={handleChange}
                  placeholder='Hex Color'
                  />
                <button onClick={addNewColor}>Add New Color</button>
              </form>
    </div>
  );
};

export default ColorList;
