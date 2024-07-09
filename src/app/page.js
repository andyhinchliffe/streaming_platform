"use client"

import { useState, useEffect } from 'react';

import Image from "next/image";



export default function Home() {

  
  const [artistDataWP, setArtistDataWP] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [playing, setPlaying] = useState(null);
  const [artist, setArtist] = useState(null); // [artist]
  const [artistDisplay, setArtistDisplay] = useState(null);
  const [artistDisplayInfo, setArtistDisplayInfo] = useState(null);
  

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
    setArtistDataWP(data)
    setPlaying(data[3])
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
<div className="flex columns-2 ">
<div>
<div className="drawer sm:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content  flex flex-col items-center justify-center">
    {/* Page content here */}
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
      Open drawer
    </label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-600 text-base-content min-h-full w-80 p-4">
    <p className='text-3xl font-semibold text-gray-400'>Focus Radio</p>
    <p className='text-gray-400'>focus beats</p>
      {/* Sidebar content here */}
      <li className='bg-gray-500 rounded-lg font-bold mt-1'><a>Sidebar Item 1</a></li>
      <li className='bg-gray-500 rounded-lg font-bold mt-1'><a>Sidebar Item 2</a></li>
      <li className='bg-gray-500 rounded-lg font-bold mt-1'><a>Sidebar Item 1</a></li>
      <li className='bg-gray-500 rounded-lg font-bold mt-1'><a>Sidebar Item 2</a></li>
    </ul>
  </div>
</div>
</div>
<div className='mx-auto'>
{playing && (
      <div className=" card flex h-44 m-6 w-96 bg-slate-500 lg:card-side shadow-xl rounded rounded-xl">
  <figure>
    <img className="rounded-lg w-44 h-44"
      src={playing._embedded?.['wp:featuredmedia']?.[0]?.source_url}
      alt="Album" />
  </figure>
  <div className=" pl-6 card-body bg-slate-500 rounded-xl">
  <h2 className="card-title">{playing.title.rendered}</h2>
    <p>{playing._embedded['wp:term'][0].map(term => (
                  term.taxonomy === 'category' ? term.name : ''
                )).filter(Boolean).join(', ')}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">{playing.id}</button>
    </div>
  </div>
</div>
)}
  
  {/* {artistDisplay && (
    <p className='text-3xl font-semibold text-gray-400'>{artistDisplay}</p>
    
  )} */}
    <div className="ml-6 pt-10 bg-slate-900 grid flex flex-wrap grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {artistDataWP.map(post => (
            <div key={post.id}>
            <Image className='rounded-lg shadow-lg' src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url} alt={post._embedded?.['wp:featuredmedia']?.[0]?.alt_text} width={150} height={150}/>
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
              
              {/* <p className='text-slate-200'>{playing._embedded?.['wp:featuredmedia']?.[0]?.source_url}</p> */}
              
              
              
              
            </div>
          ))}
        </div>
      <button className="text-slate-200" onClick={fetchPost16}>random</button>
      {/* <button onClick={fetchArtistWP}>artistlist</button> */}

      </div>   
      
      </div>
  </>
  );
}
