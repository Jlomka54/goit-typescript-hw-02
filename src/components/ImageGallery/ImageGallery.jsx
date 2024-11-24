import ImageCard from "../ImageCard/ImageCard";

import css from "./ImageGallery.module.css";

const ImageGallery = ({ galleryPhotos, onImageClick }) => {
  return (
    <>
      <ul className={css.imageGallery}>
        {galleryPhotos.map((photo) => {
          return (
            <li className={css.imageGalleryItem} key={photo.id}>
              <ImageCard
                onImageClick={() => onImageClick(photo)}
                className={css.img}
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
