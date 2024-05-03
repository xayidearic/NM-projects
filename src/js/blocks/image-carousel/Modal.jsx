import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

/**
 * @type {function} Modal - Function to display the modal
 * @param {object} props - The props for this component
 * @param {boolean} props.isModalOpen - The state of the modal
 * @param {function} props.toggleModal - The function to execute on click - toggles the modal
 * @param {string} props.imgSrc - The image source
 * @returns {JSX.Element} - Returns the modal
 */

const Modal = ({ isModalOpen, toggleModal, imgSrc }) => {
  const dialogRef = useRef(null);

  const handleClose = (event) => event.target === document.querySelector('.carousel__modal-content') && dialogRef.current.close();

  useEffect(() => {
    isModalOpen ? dialogRef.current.showModal() : dialogRef.current.close();
  }, [isModalOpen]);

  return ReactDOM.createPortal(
    <dialog
      open
      aria-modal="true"
      aria-labelledby="image carousel modal"
      role="dialog"
      className="carousel__modal"
      ref={dialogRef}
      onClick={handleClose}
    >
      <div className="carousel__modal-content d-flex justify-content-center align-items-center position-relative">
        <img src={imgSrc} alt="" />
        <button className="position-absolute" onClick={toggleModal}>
          <img className="icon--white w-100" src="/Content/Images/icons/cross_icon.svg" alt="close modal" />
        </button>
      </div>
    </dialog>,
    document.body
  );
};

export default Modal;
