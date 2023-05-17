import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import eventService from 'Events/event.service';
import { Typography } from '@mui/material';
import { Margin } from '@mui/icons-material';

const ProfileFrame = () => {
  const [frameImage, setFrameImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    eventService.getOne(id).then((res) => {
      setEvent(res.data);
      setFrameImage(res.data.headerImage);
    });
  }, [id]);

  const handleProfilePictureUpload = (event) => {
    // const file = event.target.files[0];
    // const reader = new FileReader();

    // reader.onload = () => {
    //   setProfileImage(reader.result);
    // };

    // reader.readAsDataURL(file);
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setProfileImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  function saveCombinedImage() {
    const preview = document.querySelector('.preview');
    html2canvas(preview, { scale: 3, useCORS: true, allowTaint: true }).then(
      (canvas) => {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'ProfileBadge.png';
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    );
  }

  if (!event) return <h1>Loading...</h1>;

  return (
    <div>
      <div className="flex flex-row w-4/5 mx-auto ">
        <div className="flex-1 w-1/2 mt-20 mx-auto justify-center items-center p-4">
          <Typography variant="h2" style={{ fontWeight: 'bold' }}>
            {event.name} Badge
          </Typography>
          <div className="mt-8">
            <Typography variant="h4">
              Now that you're here, why not take the opportunity to customize
              your profile? Create a personalised badge with the {event.name}{' '}
              frame by uploading a photo of yours. Also, be sure to tag your
              image with #{event.name} on social media networks.
            </Typography>
          </div>
          <div className="mt-8">
            <button
              className="bg-sky-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleProfilePictureUpload}
            >
              Upload Image
            </button>
          </div>
          <div className="mt-8">
            <Typography variant="h5">
              * We respect your privacy and are not storing your pictures on our
              servers.
            </Typography>
          </div>
        </div>
        <div className="flex-1 mt-20 mx-auto w-1/2 ">
          <div className="rounded-md bg-zinc-200 p-4 flex flex-col justify-center items-center">
            <div
              className="preview "
              style={{ position: 'relative', width: '300px', height: '300px' }}
            >
              {profileImage && (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <img
                    src={profileImage}
                    alt="Profile "
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
              )}

              {frameImage && (
                <img
                  src={frameImage}
                  alt="Frame"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '90%',
                    marginLeft: '5%',
                    height: '40%',
                    zIndex: 1,
                  }}
                />
              )}
            </div>

            {/* <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
              />
            </div> */}
            <div className="mt-8">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
                ref={fileInputRef}
              />
              {/* <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleProfilePictureUpload}
              >
                Upload Image
              </button> */}
            </div>
            <div className="mt-8">
              <button
                className="px-4 py-2 bg-sky-600 hover:bg-blue-700 text-white font-bold rounded"
                onClick={saveCombinedImage}
              >
                Download Badge
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileFrame;
