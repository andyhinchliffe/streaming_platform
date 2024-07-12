"use client"

import { useState, useEffect } from 'react';

import Image from "next/image";

import {Howl, Howler} from 'howler';
import { CiSearch } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { FaList } from "react-icons/fa";






export default function Home() {

  
  const [artistDataWP, setArtistDataWP] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [playing, setPlaying] = useState(null);
  const [artist, setArtist] = useState(null); 
  const [trackPath, setTrackPath] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);
  const [frontPage, setFrontPage] = useState(true);
  const [startedSelection, setStartedSelection] = useState(false);
  
  const [artistDisplay, setArtistDisplay] = useState(null);
  const [artistDisplayInfo, setArtistDisplayInfo] = useState(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showinfo, setShowInfo] = useState(false);

  const {Howl, Howler} = require('howler');
  

  useEffect(() => {
    fetch('https://develop.dailyoperation.uk/streaming/wp-json/wp/v2/posts?_embed&per_page=6', {
      method: 'GET',
    })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Work with the received post data
    setFrontPage(false);
    setArtistDataWP(data)
    setPlaying(data[3])
    const trackId = data[3].id;
    setTrackPath(`https://develop.dailyoperation.uk/audio/track${trackId}.mp3`)
    setIsLoaded(true);
    
    
    console.log("got it!")
    console.log(artistDataWP)
    
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

  

  }, []);


  const fetchPost16 = () => {
    fetch('https://develop.dailyoperation.uk/streaming/wp-json/wp/v2/posts/16?_embed', {
      method: 'GET',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setPlaying(data);
      console.log("got it!");
      console.log(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };
  // const updatePlaying = () => {

  //   setPlaying(post) 
  // }
  // const updatePath = () => {

  //   setTrackPath(`../audio/track` + `${playing.id}` + `.mp3`)
  //   console.log(trackPath)
  // }

  const handlePostClick = (post) => {
    setPlaying(post);
    handlePlay(post);
    setStartedSelection(true);
  };

  const handlePlay = (track) => {
    if (currentSound) {
      currentSound.stop();
    }

    const trackId = track.id;
    const newTrackPath = `https://develop.dailyoperation.uk/audio/track${trackId}.mp3`;
    setTrackPath(newTrackPath);

    const sound = new Howl({
      src: [newTrackPath],
      html5: true,
      onend: handleNextTrack
    });
    
    setCurrentSound(sound);
    sound.play();
  };

  const handleNextTrack = () => {
    const nextTrack = artistDataWP[Math.floor(Math.random() * artistDataWP.length)];
    setPlaying(nextTrack);
    handlePlay(nextTrack);
  };

  const handleStop = () => {

    currentSound.stop();
    
  };

  const stopAll = () => {
    Howler.unload();
  };

 

  


  // const getCategoryIDByName = async (categoryName) => {
  //   const response = await fetch('https://develop.dailyoperation.uk/streaming/wp-json/wp/v2/categories');
  //   if (!response.ok) {
  //     throw new Error('Failed to fetch categories');
  //   }
  //   const categories = await response.json();
  //   const category = categories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
  //   return category ? category.id : null;
  // };

  
  // const fetchPostsByCategory = async (categoryID) => {
  //   const response = await fetch(`https://develop.dailyoperation.uk/streaming/wp-json/wp/v2/posts?categories=${categoryID}&_embed`, {
  //     method: 'GET',
  //   });
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   const posts = await response.json();
  //   return posts;
  // };
  

  


  
    
  return (<>
  
  <div>
<p className='text-3xl pt-4 pl-4 font-semibold text-gray-400'>Focus Radio</p>
<p className='pl-4 text-gray-400'>Focus beats</p>



</div>
 {frontPage ?  <div className='flex justify-center text-white h-screen'><span className="loading text-white loading-ring loading-lg"></span> </div> : 
  

<div className="flex flex-wrap  md:columns-2 ">
<div className='hidden lg:block'>




<div class="flex h-screen flex-col justify-between  bg-slate-900">
  <div class="px-4 py-6">
    

    <ul class="mt-6 space-y-1">
      <li>
        <a
          href="#"
          class="block rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-gray-700"
        ><div className='flex gap-2'><FaHome />Home</div>
          
        </a>
      </li>

      

      


      </ul>
<div>

  {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn bg-slate-900 text-gray-500 border-slate-900" onClick={()=>document.getElementById('my_modal_1').showModal()}><FaList />Playlist</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
</div>
      <div>

      
      {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn bg-slate-900 text-gray-500 border-slate-900" onClick={()=>document.getElementById('my_modal_1').showModal()}><CiSearch />Search</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
</div>



      
    

<div>    
          {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="btn bg-slate-900 text-gray-500 border-slate-900" onClick={()=>document.getElementById('my_modal_1').showModal()}><CiCircleInfo />Info</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

</div>
  </div>

  <div class="sticky  inset-x-0 bottom-0 ">
    <a href="#" class="flex items-center gap-2 bg-slate-900 p-4 ">
      

      <div className='bg-slate-900'>
        <p class="text-xs">
          <strong className="block text-gray-400 font-medium">Focus Radio</strong>

          <span className="text-gray-400" > focusradio.uk </span>
        </p>
      </div>
    </a>
  </div>
</div>

</div>
<div className='mx-auto'>



{startedSelection && (
      <div className="flex h-44 m-6 w-72 md:w-96 bg-slate-500 lg:card-side shadow-xl rounded rounded-xl">
   
  <figure>
    <img className="rounded-lg w-44 h-44"
      src={playing._embedded?.['wp:featuredmedia']?.[0]?.source_url}
      alt="Album" />
  </figure>
  

  
  
  <div className="mx-auto  card-body bg-slate-500 rounded-xl">
  <h2 className="card-title">{playing.title.rendered}</h2>
    <p>{playing._embedded['wp:term'][0].map(term => (
                  term.taxonomy === 'category' ? term.name : ''
                )).filter(Boolean).join(', ')}</p>
                
    <div className="card-actions justify-end">
    

      <button onClick={handleStop} ><CiPause1 /></button>
    </div>
  </div>
</div>
)}
  
{!startedSelection && ( 
      <div className="flex h-44 m-6 w-72 md:w-96 bg-slate-500 lg:card-side shadow-xl rounded rounded-xl">
   
  <figure>
    <img className="rounded-lg w-44 h-44"
      src="stereo.jpg"
      alt="Album" />
  </figure>
  

  
  
  <div className=" pl-4 card-body bg-slate-500 rounded-xl">
  <h2 className="card-title">Select a track</h2>
  <p>Click to load</p>
    
                
    <div className="card-actions justify-end">
    
      {startedSelection &&(
      <button onClick={handleStop} >STOP</button>

    )}
    </div>
  </div>
</div>
)}


  {/* {artistDisplay && (
    <p className='text-3xl font-semibold text-gray-400'>{artistDisplay}</p>
    
  )} */}
    <div className="mx-6 pt-10 bg-slate-900 grid flex flex-wrap grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {artistDataWP.map(post => (
            <div key={post.id}>
            
            <Image onClick={() => handlePostClick(post)}  className='rounded-lg shadow-lg' src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url} alt={post._embedded?.['wp:featuredmedia']?.[0]?.alt_text} width={150} height={150}/>
              <h2 className="text-slate-200">{post.title.rendered}</h2>
              <p onClick={() => setArtistDisplay(post._embedded['wp:term'][0].map(term => (
                  term.taxonomy === 'category' ? term.name : ''
                )).filter(Boolean).join(', ')) 
                } className="text-slate-200 font-base text-sm">
                {post._embedded['wp:term'][0].map(term => (
                  term.taxonomy === 'category' ? term.name : ''
                )).filter(Boolean).join(', ')}
              </p>
              
              <p>{post.id}</p>
              {/* <button onClick={() => setTrackPath("../audio/track" + post.id +".mp3")} className="text-slate-200">Play me</button> */}
              
              
              {/* <p className='text-slate-200'>{playing._embedded?.['wp:featuredmedia']?.[0]?.source_url}</p> */}
              
              
              
              
            </div>
          ))}
        </div>
      {/* <button className="text-slate-200" onClick={fetchPost16}>random</button>
      <button onClick={fetchPost16}>post16</button>
      <button onClick={handlePlay}>play</button>
      <button onClick={handleStop}>stop</button>
      <p className="text-slate-200">{trackPath}</p>
      <button onClick={stopAll}>STOP ALL</button> */}
      
          
      </div>   
      
      </div>

 }
  </>
  );
}
