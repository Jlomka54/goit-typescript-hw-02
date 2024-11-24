import { FC } from "react";

import css from "./ImageGallery.module.css";
import { Photo } from "../../api";
import ImageCard from "../ImageCard/ImageCard";
interface GalleryPhotos {
  galleryPhotos: Photo[];
  onImageClick: (phot: Photo) => void;
}

const ImageGallery: FC<GalleryPhotos> = ({ galleryPhotos, onImageClick }) => {
  return (
    <>
      <ul className={css.imageGallery}>
        {galleryPhotos.map((photo) => {
          return (
            <li className={css.imageGalleryItem} key={photo.id}>
              <ImageCard
                onImageClick={() => onImageClick(photo)}
                src={photo.urls.small}
                alt={photo.alt_description}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ImageGallery;
