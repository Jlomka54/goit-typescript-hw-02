const ImageCard = ({ src, alt, onImageClick, className }) => {
  return (
    <div className={className}>
      <img src={src} onClick={onImageClick} alt={alt} />
    </div>
  );
};

export default ImageCard;
