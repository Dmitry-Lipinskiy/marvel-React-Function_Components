import { useState } from "react";

import { RandomChar } from "../../randomChar";
import { CharList } from "../../charList";
import { CharInfo } from "../../charInfo";

import decoration from '../../../resources/img/vision.png';
import { CharSearchForm } from "../../charSearchForm";

const MainPage = () => {

  const [selectedChar, setSelectedChar] = useState(null);
  
  const onCharSelected = (id) => {
    setSelectedChar(id);
  };

  return (
    <>
      <RandomChar />
      <div className='char__content'>
        <CharList onCharSelected={onCharSelected} />
        <div>
          <CharInfo charId={selectedChar} />
          <CharSearchForm />
        </div>
      </div>
      <img className='bg-decoration' src={decoration} alt='vision' />
    </>
  );
};

export default MainPage;
