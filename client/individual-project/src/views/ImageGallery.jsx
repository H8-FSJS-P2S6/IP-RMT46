import React, { useState, useEffect } from "react";
import cocUrl from "../utils/axios";
import { useNavigate } from "react-router-dom";

function ImageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await cocUrl.get("/get-image", {
          headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        });
        setImages(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Gagal mengambil gambar:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, [images]);

  const handleImageChange = (event) => {
    setSelectedImages(Array.from(event.target.files));
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      selectedImages.forEach((image) => formData.append("images", image));
      const response = await cocUrl.patch("/add-images", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      console.log("Gambar berhasil diunggah:", response.data);
      setImages([...images, ...response.data]);
    } catch (error) {
      console.log("Gagal mengunggah gambar:", error);
    }
  };

  const handleImageDelete = async (imageId) => {
    try {
      await cocUrl.delete(`/delete-image/${imageId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      setImages(images.filter((image) => image.id !== imageId));
    } catch (error) {
      console.log("Gagal menghapus gambar:", error);
    }
  };

  return (
    <div>
      <h2>Galeri Gambar</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Gambar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image) => (
              <tr key={image.id}>
                <td>{image.id}</td>
                <td>
                  <img src={image.imgUrl} alt={`Image ${image.id}`} />
                </td>
                <td>
                  <button onClick={() => handleImageDelete(image.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h2>Tambah Gambar</h2>
      <input type="file" multiple onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Unggah Gambar</button>
    </div>
  );
}

export default ImageGallery;
