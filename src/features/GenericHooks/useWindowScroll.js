import React, {useState, useEffect} from 'react';

function useWindowScroll(){
  const [position, setPosition] = useState(0);
  const [reachedBottom, setReachedBottom] = useState(false);

  function onWindowSroll(e){

    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      setReachedBottom(true);
    }else{
      setReachedBottom(false);
    }

    setPosition(window.scrollY);
  }

  useEffect(()=>{
    window.addEventListener('scroll', onWindowSroll)

    return () =>{
      window.removeEventListener('scroll', onWindowSroll)
    }
  },[])

  return [position, reachedBottom];
}

export default useWindowScroll;
