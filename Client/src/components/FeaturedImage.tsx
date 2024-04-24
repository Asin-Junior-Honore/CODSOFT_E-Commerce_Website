import React from 'react';
import { Helmet } from 'react-helmet';
import featuredImage from '../assets/mern-landingpage-hero.jpg';

interface FeaturedImageProps {
  customImage?: string;
  title?: string;
  description?: string;
  url?: string;
  siteName?: string;
}

const FeaturedImage: React.FC<FeaturedImageProps> = ({
  customImage,
  title = 'Asin-Honore | E-commerce Store 🧑‍💻',
  description = 'MERN Application 🧑‍💻',
  url = 'https://asinhonore-mern-e-commerce-app-remote.netlify.app',
  siteName = 'E-commerce Store',
}) => {
  const imageUrl = customImage || featuredImage;

  return (
    <Helmet>
      <meta property="og:image" content={imageUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image:alt" content="An e-commerce landing page hero image." /> // More specific description

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default FeaturedImage;
