import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const fieldTypes = [
  { type: "text", label: "Text Input" },
  { type: "textarea", label: "Text Area" },
  { type: "number", label: "Number Input" },
  { type: "select", label: "Dropdown" },
  { type: "radio", label: "Radio Buttons" },
  { type: "checkbox", label: "Checkboxes" },
  { type: "date", label: "Date Picker" },
  { type: "file", label: "File Upload" },
];

const DraggableField = ({ field }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FIELD",
    item: field,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="p-2 border bg-light mb-2 w-75" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {field.label}
    </div>
  );
};

const DroppableField = ({ field, index, moveField, handleLabelChange }) => {
  const [, drag] = useDrag(() => ({
    type: "FORM_FIELD",
    item: { index },
  }));

  const [, drop] = useDrop(() => ({
    accept: "FORM_FIELD",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveField(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  }));

  return (
    <div ref={(node) => drag(drop(node))} className="d-flex align-items-center gap-2 p-2 bg-white">
      <input
        type="text"
        className="form-control"
        value={field.label}
        onChange={(e) => handleLabelChange(field.id, e.target.value)}
        style={{ width: "150px" }}
      />
      {field.type === "text" && <input type="text" className="form-control" />}
      {field.type === "textarea" && <textarea className="form-control"></textarea>}
      {field.type === "number" && <input type="number" className="form-control" />}
      {field.type === "select" && (
        <select className="form-control">
          <option>Option 1</option>
          <option>Option 2</option>
        </select>
      )}
      {field.type === "radio" && (
        <div className="d-flex align-items-center gap-2">
          <input type="radio" name={`radio-${field.id}`} /> Option 1
          <input type="radio" name={`radio-${field.id}`} /> Option 2
        </div>
      )}
      {field.type === "checkbox" && (
        <div className="d-flex align-items-center gap-2">
          <input type="checkbox" /> Option 1
          <input type="checkbox" /> Option 2
        </div>
      )}
      {field.type === "date" && <input type="date" className="form-control" />}
      {field.type === "file" && <input type="file" className="form-control" />}
    </div>
  );
};

const DroppableForm = ({ fields, setFields }) => {
  const [, drop] = useDrop(() => ({
    accept: "FIELD",
    drop: (item) =>
      setFields((prevFields) => [...prevFields, { ...item, id: Date.now(), label: item.label }]),
  }));

  const moveField = (fromIndex, toIndex) => {
    setFields((prevFields) => {
      const updatedFields = [...prevFields];
      const [movedField] = updatedFields.splice(fromIndex, 1);
      updatedFields.splice(toIndex, 0, movedField);
      return updatedFields;
    });
  };

  const handleLabelChange = (id, newLabel) => {
    setFields((prevFields) =>
      prevFields.map((field) => (field.id === id ? { ...field, label: newLabel } : field))
    );
  };

  return (
    <div ref={drop} className="border p-3 bg-white" style={{ minHeight: "400px" }}>
      <div className="d-flex flex-column gap-2">
        {fields.map((field, index) => (
          <DroppableField
            key={field.id}
            field={field}
            index={index}
            moveField={moveField}
            handleLabelChange={handleLabelChange}
          />
        ))}
      </div>
    </div>
  );
};

const Forms = () => {
  const [fields, setFields] = useState([]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-3">
            <h4 className="fw-bolder text-center mb-3">Form Fields</h4>
            <span className="justify-content-center d-flex flex-wrap">
            {fieldTypes.map((field, index) => (
              <DraggableField key={index} field={field} />
            ))}
            </span>
          </div>
          <div className="col-md-8">
          <h4 className="fw-bolder text-center mb-3">Drop Fields Here</h4>
            <DroppableForm fields={fields} setFields={setFields} />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Forms;
