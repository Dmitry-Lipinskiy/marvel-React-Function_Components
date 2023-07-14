import { useEffect, useState } from 'react';

import { useMarvelService } from '../../services/marvelService/MarvelService';
import { Skeleton } from '../skeleton/Skeleton';
import { notImage } from '../../resources/data/not-image';
import { isErrorOrSpinner } from '../../resources/data/is-error-or-spinner';

import './charInfo.scss';

export const CharInfo = (props) => {

  const [char, setChar] = useState(null);

  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.charId]);

  const updateChar = () => {
    const {charId} = props;
    if (!charId) {
      return;
    }
    clearError();
    getCharacter(charId).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };
  
  const skeleton = char || loading || error ? null : <Skeleton />;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className='char__info'>
      {isErrorOrSpinner(loading, error)}
      {skeleton}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  const isComicsList = (comics) => { 
    if (comics.length > 9) {
      return comics.slice(0, 9);
    } 
    return comics;
  };

  return (
    <>
      <div className='char__basics'>
        <img 
          src={thumbnail} 
          alt={name}
          style={{objectFit: (thumbnail === notImage) ? 'contain' : 'cover'}} 
        />
        <div>
          <div className='char__info-name'>{name}</div>
          <div className='char__btns'>
            <a href={homepage} className='button button__main'>
              <div className='inner'>homepage</div>
            </a>
            <a href={wiki} className='button button__secondary'>
              <div className='inner'>Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className='char__descr'>{description}</div>
      <div className='char__comics'>Comics:</div>
      <ul className='char__comics-list'>
        {comics.length > 0 ? null : 'There is no comics with this character'}
        {isComicsList(comics).map((item, i) => (
          <li key={i} className='char__comics-item'>{item.name}</li>
        ))}
      </ul>
    </>
  );
};
