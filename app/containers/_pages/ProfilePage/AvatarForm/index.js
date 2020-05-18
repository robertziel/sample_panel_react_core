import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import FileInput from 'react-file-input-previews-base64';

import { Button, Paper } from 'components/_ui-elements';
import CroppImageModal from 'components/CroppImageModal';

import messages from './messages';
import Wrapper from './Wrapper';

export default function AvatarForm() {
  const [avatar, setAvatar] = useState(
    'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1000_1000',
  );
  const [inputImageBase64, setInputImageBase64] = useState();

  const handleNewImageUpload = (file) => {
    setInputImageBase64(file.base64);
  };

  const submitNewAvatar = (newAvatar) => {
    setInputImageBase64(undefined);
    setAvatar(newAvatar);
  };

  return (
    <Wrapper>
      <Paper>
        <CroppImageModal
          imageBase64={inputImageBase64}
          onSubmit={submitNewAvatar}
        />
        <Button variant="contained" component="label">
          <img className="avatar" src={avatar} alt="Profile avatar" />
          <div className="set-avatar-message">
            <FormattedMessage {...messages.setAvatar} />
          </div>
          <div className="file-input">
            <FileInput
              multiple={false}
              callbackFunction={handleNewImageUpload}
              accept="image/x-png,image/gif,image/jpeg"
            />
          </div>
        </Button>
      </Paper>
    </Wrapper>
  );
}
