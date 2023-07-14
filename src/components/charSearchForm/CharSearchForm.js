import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useMarvelService } from '../../services/marvelService/MarvelService';

import './charSearchForm.scss';

export const CharSearchForm = () => {

  const [char, setChar] = useState(null);
  const [value, setValue] = useState('');

  const { loading, error, getCharacterByName, clearError } = useMarvelService();

  const { 
    register, 
    formState: { errors, isValid }, 
    handleSubmit, 
    reset 
  } = useForm({ mode: 'all' });

  const onSubmit = (charName) => {
    clearError();
    getCharacterByName(charName).then(onCharLoaded);
    reset();
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const message = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className='char__search-form'>
      <form 
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className='char__search-label' htmlFor='charName'>
          Or find a character by name:
        </label>
        <div className='char__search-wrapper'>
          <input 
            placeholder='Enter name'
            {...register('name', { 
              required: true,
              onChange: (event) => setValue(event.target.value) 
            })}
          />
          <div className='error'></div>
          <button
            type='submit'
            className='button button__main'
            disabled={!isValid}
            onClick={() => onSubmit(value)}
          >
            <div className='inner'>find</div>
          </button>
        </div>
        <div className='char__search-error'>
          {errors.name && <span>This field is required</span>}
        </div>
      </form>
      {message}
    </div>
  );
};

const View = ({ char }) => {

  const ViewSuccess = () => (
    <>
      <div className='char__search-success'>
        There is! Visit {char[0].name} page?
      </div>
      <Link 
        className='button button__secondary'
        to={`/${char[0].name}`}
      >
        <div className='inner'>to page</div>
      </Link>
    </>
  );

  const ViewError = () => (
    <>
      <div className='char__search-error'>
        The character was not found. Check the name and try again
      </div>
    </>
  );

  return (
    <div className='char__search-wrapper'>
      {char.length > 0 ? <ViewSuccess /> : <ViewError />}
    </div>
  );
};
