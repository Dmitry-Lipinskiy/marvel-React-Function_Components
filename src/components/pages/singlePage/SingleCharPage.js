import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useMarvelService } from '../../../services/marvelService/MarvelService';
import { isErrorOrSpinner } from '../../../resources/data/is-error-or-spinner';
import { AppBanner } from '../../appBanner';

import './singleComicPage.scss';

const SingleCharPage = () => {

  const { charName } = useParams();
  const [char, setChar] = useState(null);

  const { loading, error, getCharacterByName, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charName]);

  const updateChar = () => {
    clearError();
    getCharacterByName(charName).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <>
      {isErrorOrSpinner(loading, error)}
      {content}
    </>
  );
};

export default SingleCharPage;

const View = ({ char }) => (
  <>
    <AppBanner />
    <div className='single-comic'>
      <img 
        src={char[0].thumbnail} 
        alt={char[0].name} 
        style={{width: '293px', height: '350px'}} 
      />
      <div className='single-comic__info'>
        <h2 className='single-comic__name'>{char[0].name}</h2>
        <p className='single-comic__descr'>{char[0].description}</p>
      </div>
      <Link to='/' className='single-comic__back'>
        Back to all
      </Link>
    </div>
  </>
);
