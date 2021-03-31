import axios from 'axios';
import { ImageInterface } from '../redux/ducks/images/types';

interface ResponseInterface {
  data: {
    image_url: string;
  };
}

export const imageApi = {
  async fetchImage(tags: string[]): Promise<ImageInterface[]> {
    const data = await Promise.all([
      ...tags.map(tag =>
        axios.get<ResponseInterface>(
          `https://api.giphy.com/v1/gifs/random?api_key=gTJAO48YcpmrADUyo4opy4ES4g7iDBxx&tag=${tag}`
        )
      ),
    ]);

    return data.map(({ data }, index) => ({
      imageUrl: data.data.image_url,
      tag: tags[index],
      id: Date.now().toString(),
    }));
  },
};
