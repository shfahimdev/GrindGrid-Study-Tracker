import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import Modal from '../ui/Modal';
import StudyForm from '../forms/StudyForm';

const EditModal = ({ entry, onClose }) => {
  const { updateEntry } = useStudy();
  const [formData, setFormData] = useState(entry);

  const handleSubmit = async (data) => {
    await updateEntry(entry.id, data);
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Edit Study Session" size="lg">
      <StudyForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        submitText="Update Session"
      />
    </Modal>
  );
};

export default EditModal;

