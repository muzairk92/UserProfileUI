import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

interface ProfilePhotoUploadProps {
  onUpload: (file: File) => void;
  defaultImageUrl: string; // Add a prop for the default image URL
}

const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({ onUpload, defaultImageUrl }) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      // Commenting out setSelectedFile(null) to keep the image visible
      // setSelectedFile(null);
      handleClose();
      console.log('Uploaded successfully'); // Show a console message
    }
  };

  return (
    <div>
      <IconButton onClick={handleOpen} color="primary">
        <img
          src={selectedFile ? URL.createObjectURL(selectedFile) : defaultImageUrl}
          alt="Profile"
          style={{ height: '170px', width: '170px', borderRadius: '50%' }}
        />
        <PhotoCamera style={{position: 'absolute', bottom:'0', right: '10px'}}/>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Profile Photo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select an image from your device to upload as your profile photo.
          </DialogContentText>
          <input
            accept="image/*"
            id="profile-photo-input"
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="profile-photo-input">
            <Button
              variant="outlined"
              component="span"
              color="primary"
            >
              Choose File
            </Button>
          </label>
          {selectedFile && <div>Selected File: {selectedFile.name}</div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpload} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfilePhotoUpload;