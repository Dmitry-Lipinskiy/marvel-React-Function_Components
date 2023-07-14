import { useEffect, useRef, useState } from 'react';

import { useMarvelService } from '../../services/marvelService/MarvelService';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import { Spinner } from '../spinner/Spinner';

import './charList.scss';

export const CharList = (props) => {

  const [charList, setCharList] = useState([]);
  const [offset, setOffset] = useState(210);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest(offset);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRequest = (offset) => {
    setNewItemLoading(true);
    getAllCharacters(offset).then(onCharListLoaded);
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded(ended);
  };

  const refs = useRef([]);

  const changeStyle = (i) => {
    refs.current.forEach((item) => item.classList.remove('char__item_selected'));
    refs.current[i].classList.add('char__item_selected');
    refs.current[i].focus();
  }

  const charListItems = (charList) => (
    <ul className='char__grid'>
      {charList.map((item, i) => (
        <li 
          className='char__item'
          key={item.id}
          ref={(el) => (refs.current[i] = el)}
          onClick={() => {props.onCharSelected(item.id); changeStyle(i);}}
        >
          <img 
            src={item.thumbnail} 
            alt={item.name} 
          />
          <div className='char__name'>{item.name}</div>
        </li>
      ))}
    </ul>
  );

  const newCharListItems = charListItems(charList);
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className='char__list'>
      {errorMessage}
      {spinner}
      {newCharListItems}
      <button className='button button__main button__long'
        disabled={newItemLoading}
        style={{display: charEnded ? 'none' : 'block'}}
        onClick={() => onRequest(offset)}
      >
        <div className='inner'>load more</div>
      </button>
    </div>
  );
};


