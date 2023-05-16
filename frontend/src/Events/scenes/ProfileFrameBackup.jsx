import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import eventService from 'Events/event.service';

const ProfileFrame = () => {
  const [frameImage, setFrameImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    eventService.getOne(id).then((res) => {
      setEvent(res.data);
      // setFrameImage(res.data.headerImage);

      const img = new Image();
      img.src = res.data.headerImage;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const localURL = canvas.toDataURL('image/png');

        setFrameImage(localURL);
      };
    });
  }, [id]);

  // const handleFrameUpload = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     setFrameImage(reader.result);
  //   };

  //   reader.readAsDataURL(file);
  // };

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setProfileImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  function saveCombinedImage() {
    const preview = document.querySelector('.preview');

    html2canvas(preview, { scale: 3 }).then((canvas) => {
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'ProfileBadge.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  if (!event) return <h1>Loading...</h1>;

  return (
    <div>
      <div className="flex flex-row">
        <h1>Profile Frame</h1>

        <div className="flex-1">
          <div
            className="preview"
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
            <h2>Frame</h2>
            <input type="file" accept="image/*" onChange={handleFrameUpload} />
          </div> */}

          <div>
            <h2>Profile Picture</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureUpload}
            />
          </div>
          <div className="mt-8">
            <button
              className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
              onClick={saveCombinedImage}
            >
              Save
            </button>
          </div>
        </div>

        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default ProfileFrame;
