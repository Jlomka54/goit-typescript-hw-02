import { useEffect, useState, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FetchPhoto, Photo } from "./api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";

const App = () => {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoader] = useState<boolean>(false);
  const [page, setPages] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchPhotoForGallery = async () => {
      if (!searchValue) return;
      try {
        setError(null);
        setIsLoader(true);
        const data = await FetchPhoto(searchValue, page);

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
        if (error instanceof Error) {
          setError(`Error fetching photos: ${error.message}`);
        } else {
          setError("An unknown error occurred");
        }
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

  const onSubmit = (value: string) => {
    setSearchValue(value);
    setPages(1);
  };

  const openModal = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <div>
      <SearchBar onSubmit={onSubmit} />{" "}
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery galleryPhotos={photos} onImageClick={openModal} />
          {isLoading && <Loader />}
          {photos.length > 0 && page < (totalPages ?? 0) && (
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
