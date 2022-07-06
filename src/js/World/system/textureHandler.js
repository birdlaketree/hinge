import {
  TextureLoader,
  RepeatWrapping
} from 'three';

const textureHandler = (textureUrl, repeatX = 1, repeatY = 1) => {
  const loader = new TextureLoader();
  const texture = loader.load(
    textureUrl,
    txtr => {
      // console.log('loaded', txtr);
    },
    e => {
      // console.log('progress', e);
    },
    e => {
      // console.log('error', e);
    },
  );

  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.x = repeatX;
  texture.repeat.y = repeatY;
  return texture;
}

export { textureHandler };