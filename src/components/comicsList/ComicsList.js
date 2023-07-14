import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useMarvelService } from '../../services/marvelService/MarvelService';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import { Spinner } from '../spinner/Spinner';

import './comicsList.scss';

export const ComicsList = () => {

  const [comicsList, setComicsList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRequest = (offset) => {
    setNewItemLoading(true);
    getAllComics(offset).then(onComicsListLoaded);
  };

  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }
    setComicsList((comicsList) => [...comicsList, ...newComicsList]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 8);
    setComicsEnded(ended);
  };

  const comicsListItems = (comicsList) => (
    <ul className='comics__grid'>
      {comicsList.map((item, i) => (
        <li 
          className='comics__item'
          key={i}
        >
          <Link to={`/comics/${item.id}`}>
            <img 
              src={item.thumbnail} 
              alt={item.title} 
              className='comics__item-img' 
            />
            <div className='comics__item-name'>
              {item.title}
            </div>
            <div className='comics__item-price'>
              {item.price}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );

  const newComicsListItems = comicsListItems(comicsList);
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className='comics__list'>
      {errorMessage}
      {spinner}
      {newComicsListItems}
      <button className='button button__main button__long'
        disabled={newItemLoading}
        style={{display: comicsEnded ? 'none' : 'block'}}
        onClick={() => onRequest(offset)}
      >
        <div className='inner'>load more</div>
      </button>
    </div>
  );
};

