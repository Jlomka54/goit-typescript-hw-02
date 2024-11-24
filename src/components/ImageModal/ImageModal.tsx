import ReactModal from "react-modal";
import css from "./ImageModal.module.css";
import { FC } from "react";

ReactModal.setAppElement("#root");
interface Photo {
  urls: {
    regular: string,
  };
  alt_description: string;
  description?: string | null;
}

interface ImageModalProps {
  photo: Photo | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: FC<ImageModalProps> = ({ photo, isOpen, onClose }) => {
  if (!photo) return null;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
      shouldCloseOnOverlayClick={true}
    >
      <div className={css.content}>
        <img
          className={css.img}
          src={photo.urls.regular}
          alt={photo.alt_description}
        />
        <p>{photo.description || "No description available"}</p>
        <button className={css.button} onClick={onClose}>
          Close
        </button>
      </div>
    </ReactModal>
  );
};

export default ImageModal;
