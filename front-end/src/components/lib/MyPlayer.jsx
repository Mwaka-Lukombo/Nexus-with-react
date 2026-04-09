'use client';

import '@videojs/react/video/skin.css';
import { createPlayer, videoFeatures } from '@videojs/react';
import { VideoSkin, Video } from '@videojs/react/video';

const Player = createPlayer({ features: videoFeatures });


export const MyPlayer = ({ src }) => {
  return (
    <Player.Provider>
      <VideoSkin>
        <Video src={src} playsInline className='w-full h-full bg-cover bg-center' />
      </VideoSkin>
    </Player.Provider>
  );
};