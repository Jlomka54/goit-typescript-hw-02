import { FC } from "react";
import c from "./ImageCard.module.css";
import { PhotoImageProps } from "./ImageCard.type";

const ImageCard: FC<PhotoImageProps> = ({ src, alt, onImageClick }) => {
  return (
    <div className={c.img}>
      <img src={src} onClick={onImageClick} alt={alt} />
    </div>
  );
};

export default ImageCard;
