import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useMarvelService } from '../../../services/marvelService/MarvelService';
import { isErrorOrSpinner } from '../../../resources/data/is-error-or-spinner';
import { AppBanner } from '../../appBanner';

import './singleComicPage.scss';

const SingleComicPage = () => {

  const { comicId } = useParams();
  const [comic, setComic] = useState(null);

  const { loading, error, getComic, clearError } = useMarvelService();

  useEffect(() => {
    updateComic();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comicId]);

  const updateComic = () => {
    clearError();
    getComic(comicId).then(onComicLoaded);
  };

  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

  return (
    <>
      {isErrorOrSpinner(loading, error)}
      {content}
    </>
  );
};

export default SingleComicPage;

const View = ({ comic }) => {

  const { title, description, pageCount, thumbnail, language, price } = comic;

  return (
    <>
      <AppBanner />
      <div className='single-comic'>
        <img src={thumbnail} alt={title} className='single-comic__img' />
        <div className='single-comic__info'>
          <h2 className='single-comic__name'>{title}</h2>
          <p className='single-comic__descr'>{description}</p>
          <p className='single-comic__descr'>{pageCount}</p>
          <p className='single-comic__descr'>Language: {language}</p>
          <div className='single-comic__price'>{price}</div>
        </div>
        <Link to='/comics' className='single-comic__back'>
          Back to all
        </Link>
      </div>
    </>
  );
};

