import React, { useEffect, useState } from 'react';
import Alert from './components/Alert';
import Button, { ButtonProps } from './components/Button';
import { useActions } from './hooks/useActions';
import useInput from './hooks/useInput';
import { useTypedSelector } from './hooks/useTypedSelector';
import { AlertProps } from './components/Alert';

function App() {
  const tagInput = useInput('');
  const { clearImages, fetchImage, setGroupedImages } = useActions();
  const [uniqueTags, setUniqueTags] = useState<string[]>([]);
  const [alert, setAlert] = useState({ visible: false, text: '' });
  const { images, loadingState, isGrouped } = useTypedSelector(
    ({ images }) => images
  );

  useEffect(() => {
    if (images) {
      const tags = images.map(({ tag }) => tag);
      const uniqueTags = Array.from(new Set(tags));
      setUniqueTags(uniqueTags);
    }
  }, [images]);

  useEffect(() => {
    if (loadingState === 'not found') {
      setAlert({ text: 'По тегу ничего не найдено', visible: true });
    }
    if (loadingState === 'error') {
      setAlert({ text: 'Произошла http ошибки', visible: true });
    }
  }, [loadingState]);

  const onImageClick = (tag: string) => {
    tagInput.setValue(tag);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const invalidTags = tagInput.params.value.match(/[^a-z\s,]+/gi);
    const validTags = tagInput.params.value.match(/[a-z]+(|,)/gi);

    if (invalidTags) {
      setAlert({
        visible: true,
        text: 'Можно использовать только символы латинского алфавита и ,',
      });
      return;
    }
    if (!validTags) {
      setAlert({ visible: true, text: "заполните поле 'тег'" });
      return;
    }

    if (validTags.some(el => el === 'delay')) {
      setInterval(() => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        let randomTag = '';
        const randomTagLength = Math.floor(Math.random() * 10) + 1;
        for (let i = 0; i < randomTagLength; i++) {
          randomTag += alphabet[Math.floor(Math.random() * alphabet.length)];
        }
        fetchImage([randomTag]);
      }, 5000);
      return;
    }

    fetchImage(validTags);
  };

  const buttons: ButtonProps[] = [
    {
      title: loadingState === 'loading' ? 'Загрузка...' : 'Загрузить',
      color: 'green',
      className: 'row-button',
      type: 'submit',
      disabled: loadingState === 'loading',
    },
    {
      title: 'Очистить',
      color: 'red',
      onClick: () => {
        clearImages();
        tagInput.setValue('');
      },
      className: 'row-button',
    },
    {
      title: isGrouped ? 'Разгруппировать' : 'Группировать',
      color: 'blue',
      onClick: () => {
        setGroupedImages(!isGrouped);
      },
      className: 'row-button',
    },
  ];

  const alertProps: AlertProps = {
    ...alert,
    onClose: () => setAlert({ ...alert, visible: false }),
  };

  return (
    <div className="App">
      <div className="form-wrapper">
        <form onSubmit={onSubmitHandler}>
          <input {...tagInput.params} className="input-tag" />
          {buttons.map((props, index) => (
            <Button key={index} {...props} />
          ))}
        </form>
        <Alert {...alertProps} />
      </div>
      <div className="images">
        {isGrouped && (
          <>
            {uniqueTags &&
              uniqueTags.map((uniqueTag, index) => {
                const uniqueTagImages = images.filter(
                  ({ tag }) => tag === uniqueTag
                );
                return (
                  <div key={index} className="images__group">
                    <h5 className="images__group-title">{uniqueTag}</h5>
                    <div>
                      {uniqueTagImages.map(({ imageUrl, id, tag }) => (
                        <img
                          key={id}
                          src={imageUrl}
                          onClick={() => onImageClick(tag)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
          </>
        )}
        {!isGrouped &&
          images.map(({ id, imageUrl, tag }) => (
            <img src={imageUrl} key={id} onClick={() => onImageClick(tag)} />
          ))}
      </div>
    </div>
  );
}

export default App;
