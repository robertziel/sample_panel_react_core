import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-easy-crop';

import { Button, Dialog, Grid } from 'components/_ui-elements';

import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import getCroppedImg from './cropImage';
import Wrapper from './Wrapper';

function CroppImageModal({ imageBase64, onSubmit }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const submitCroppedImage = useCallback(async () => {
    const croppedImageBase64 = await getCroppedImg(
      imageBase64,
      croppedAreaPixels,
      rotation,
    );

    onSubmit(croppedImageBase64);
  }, [croppedAreaPixels, rotation]);

  return (
    <Dialog open={!!imageBase64}>
      <Wrapper>
        <div className="crop-area">
          <Cropper
            image={imageBase64}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={3 / 3}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <Grid className="controls-section">
          <Grid>
            <Typography variant="overline">Zoom</Typography>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e, value) => setZoom(value)}
            />
          </Grid>
          <Grid>
            <Typography variant="overline">Rotation</Typography>
            <Slider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              onChange={(e, value) => setRotation(value)}
            />
          </Grid>
          <Button onClick={submitCroppedImage} color="primary">
            Show Result
          </Button>
        </Grid>
      </Wrapper>
    </Dialog>
  );
}

CroppImageModal.propTypes = {
  imageBase64: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default CroppImageModal;
