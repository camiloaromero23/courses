import axios from 'axios';
import cloudinary from 'cloudinary';

import uploadImage from '@/modules/daybook/helpers/uploadImage';

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;
cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

describe('Image upload helper tests', () => {
  it('should load a file and return the url', async done => {
    const { data } = await axios.get(
      'https://res.cloudinary.com/dvx3uuuau/image/upload/v1631686407/vv6zansvsksqg0lguzhz.jpg',
      {
        responseType: 'arraybuffer',
      },
    );
    const file = new File([data], 'photo.jpg');

    const url = await uploadImage(file);

    expect(typeof url).toBe('string');

    const segments = url.split('/');

    const imageId = segments[segments.length - 1].replace('.jpg', '');

    cloudinary.v2.api.delete_resources(imageId, {}, () => {
      done();
    });
  });
});
