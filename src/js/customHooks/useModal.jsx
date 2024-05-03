import { useState } from 'react';

/**
 * Custom hook to handle modal state
 * @returns {Array} - Returns a boolean and a function to toggle the modal
 *
 */
const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggle = () => setIsModalOpen(!isModalOpen);

  return [isModalOpen, toggle];
};

export default useModal;
