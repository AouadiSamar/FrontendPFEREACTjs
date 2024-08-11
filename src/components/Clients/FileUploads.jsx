import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; // Import PropTypes

const FileUpload = ({ clientId }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!file) {
            setError('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`/api/v1/clients/${clientId}/upload_file/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('File uploaded successfully:', response.data);
            setFile(null);
        } catch (err) {
            console.error('Error uploading file:', err);
            setError('Error uploading file.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

// Define PropTypes for the component
FileUpload.propTypes = {
    clientId: PropTypes.number.isRequired
};

export default FileUpload;
