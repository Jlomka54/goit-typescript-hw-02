import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";

import { FetchPhoto } from "./api.js";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import Loader from "./components/Loader/Loader.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";

const App = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoader] = useState(false);
  const [page, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchPhotoForGallery = async () => {
      if (!searchValue) return;
      try {
        setError(null);
        setIsLoader(true);
        const { data } = await FetchPhoto(searchValue, page);

        if (data.results.length === 0) {
          toast.error(`No information found matching your request`);
          setPhotos([]);
          return;
        }
        setPhotos((prevPhoto) =>
          page === 1 ? data.results : [...prevPhoto, ...data.results]
        );
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(`Error fetching photos: ${error.message}`);
      } finally {
        setIsLoader(false);
      }
    };

    searchPhotoForGallery();
  }, [searchValue, page]);

  useEffect(() => {
    if (page > 1) {
      setTimeout(() => {
        window.scrollBy({
          top: window.innerHeight,

          behavior: "smooth",
        });
      }, 100);
    }
  }, [page]);

  const loadMorePhoto = () => {
    setPages(page + 1);
  };

  const onSubmit = (eve) => {
    eve.preventDefault();
    const form = eve.target.elements;
    const userValue = form.searchValue.value.trim();

    setSearchValue(userValue);

    setPages(1);
    form.reset();
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <div>
      <SearchBar onSubmit={onSubmit} />

      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery galleryPhotos={photos} onImageClick={openModal} />
          {isLoading && (
            <div>
              <Loader />
            </div>
          )}
          {photos.length > 0 && page < totalPages && (
            <LoadMoreBtn loadMorePhoto={loadMorePhoto} />
          )}
          {selectedPhoto && (
            <ImageModal
              photo={selectedPhoto}
              isOpen={isModalOpen}
              onClose={closeModal}
            />
          )}
        </>
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
