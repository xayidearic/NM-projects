import { useRef } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  toggleModal: () => void;
  imgSrc: string;
}

const Modal = ({ toggleModal, imgSrc }: ModalProps): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === document.querySelector('.carousel__modal-content')) {
      dialogRef.current?.close();
    }
  };

  return ReactDOM.createPortal(
    <dialog open className="carousel__modal" role="dialog" ref={dialogRef} onClick={(e) => handleClose(e)}>
      <div className="carousel__modal-content d-flex justify-content-center align-items-center position-relative" data-testid="modal">
        <img src={imgSrc} alt="" />
        <button type="button" onClick={toggleModal}>
          <img className="icon--white w-100" src="/Content/Images/icons/cross_icon.svg" alt="close modal"/>
        </button>
      </div>
    </dialog>,
    document.body
  );
};

export default Modal;
