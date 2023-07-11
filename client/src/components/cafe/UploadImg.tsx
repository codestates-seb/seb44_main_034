import React, { useState } from 'react';
import axios from 'axios';

function UploadImg() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post(
          'http://localhost:3001/cafes',
          formData
        );

        if (response.status === 200) {
          alert('Upload successful');
          // 추가적인 로직 처리
        } else {
          throw new Error('Upload failed');
        }
      } catch (error) {
        console.error(error);
        alert('Upload failed');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='imageUpload'>Upload Image:</label>
        <input type='file' id='imageUpload' onChange={handleFileChange} />
      </div>

      <button type='submit' disabled={!file}>
        Upload
      </button>
    </form>
  );
}

export default UploadImg;
