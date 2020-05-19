import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import FileInput from 'react-file-input-previews-base64';

import { Button, Paper } from 'components/_ui-elements';
import CroppImageModal from 'components/CroppImageModal';

import FetchedContent from 'containers/FetchedContent';
import useApiFetcher from 'containers/BackendApiConnector/fetcher';

import messages from './messages';
import Wrapper from './Wrapper';

export default function AvatarForm() {
  const [avatar, setAvatar] = useState();
  const [inputImageBase64, setInputImageBase64] = useState();

  const handleNewImageUpload = (file) => {
    setInputImageBase64(file.base64);
  };

  const fetcher = useApiFetcher();

  const fetchData = () => {
    fetcher.get({
      path: '/profile/avatar',
      afterSuccess: (result) => {
        setAvatar(result.avatar);
      },
    });
  };

  useEffect(() => fetchData(), []);

  const submitNewAvatar = (newAvatar) => {
    setInputImageBase64(undefined);
    setAvatar(newAvatar);
  };

  return (
    <Wrapper>
      <Paper>
        <FetchedContent processing={avatar === undefined || fetcher.processing}>
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
        </FetchedContent>
      </Paper>
    </Wrapper>
  );
}
