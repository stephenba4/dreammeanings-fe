import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';

interface YoutubeCTAProps {}

const YoutubeCTA: React.FC<YoutubeCTAProps> = (): ReactElement => {
  const router = useRouter();

  const handleClick = () => {
    window.open(
      'https://www.youtube.com/@healwithstephenanddavid',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="text-center">
      <p className="text-gray-800 font-medium text-lg mb-4">
        Don{"'"}t forget to watch our videos on YouTube!
      </p>
      <button
        onClick={handleClick}
        className="bg-red-500 text-white px-4 py-2 rounded-lg focus:outline-none hover:bg-red-600"
      >
        Watch Now
      </button>
    </div>
  );
};

export default YoutubeCTA;
