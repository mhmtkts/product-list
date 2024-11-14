/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  // Tıklama dışına tıklama durumunda modali kapat
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false);
    }
  };

  // Esc tuşuna basıldığında modali kapat
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <div className="relative w-full max-w-[1200px] mx-auto">
      {/* Küçük görsel önizlemeleri */}
      <div className="grid grid-cols-[120px_1fr] gap-4 h-[500px]">
        <div className="flex flex-col gap-2 overflow-y-auto pr-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-[100px] h-[100px] rounded-lg overflow-hidden border-2 flex-shrink-0 ${
                currentIndex === index
                  ? "border-blue-500"
                  : "border-transparent"
              }`}
            >
              <LazyLoadImage
                src={image}
                alt={`Small image ${index + 1}`}
                effect="blur"
                className="w-full h-full object-contain bg-white"
              />
            </button>
          ))}
        </div>

        {/* Ana görsel */}
        <div className="relative bg-white rounded-lg p-4 flex items-center justify-center">
          <div
            className="relative w-full h-full max-w-[100%] max-h-[80%]"
            onClick={() => setIsModalOpen(true)}
          >
            <LazyLoadImage
              src={images[currentIndex]}
              alt={`Product image ${currentIndex + 1}`}
              effect="blur"
              className="w-full max-h-96 object-contain cursor-zoom-in"
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-white rounded-lg max-w-2xl w-full mx-4 relative"
            style={{ height: "500px" }}
          >
            <div className="flex h-full">
              {/* Sol taraf - Ana Görsel */}
              <div className="flex-1 p-4">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div
                    className="w-full h-full flex items-center justify-center overflow-hidden"
                    style={{
                      maxWidth: "60%",
                      maxHeight: "100%",
                      margin: "auto",
                    }}
                  >
                    <LazyLoadImage
                      src={images[currentIndex]}
                      alt={`Product image ${currentIndex + 1}`}
                      effect="blur"
                      className="max-w-full max-h-full object-contain cursor-zoom-in transform-gpu"
                      style={{
                        transition: "transform 0.3s ease-out",
                        width: "auto",
                        height: "auto",
                      }}
                      onMouseMove={(e) => {
                        const element = e.currentTarget;
                        const { left, top, width, height } =
                          element.getBoundingClientRect();
                        const x = (e.clientX - left) / width;
                        const y = (e.clientY - top) / height;

                        element.style.transformOrigin = `${x * 100}% ${
                          y * 100
                        }%`;
                        element.style.transform = "scale(2.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Sağ taraf - Küçük Görseller */}
              <div className="w-20 border-l border-gray-200 overflow-y-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-full aspect-square p-2 border-b border-gray-200 ${
                      currentIndex === index ? "bg-gray-100" : ""
                    }`}
                  >
                    <LazyLoadImage
                      src={image}
                      alt={`Small image ${index + 1}`}
                      effect="blur"
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Kapatma butonu */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
