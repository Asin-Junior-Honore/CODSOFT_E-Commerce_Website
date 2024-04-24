import React from 'react';
import { Helmet } from 'react-helmet';
import featuredImage from '../assets/mern-landingpage-hero.jpg';

const FeaturedImage: React.FC = () => {
  const title = 'Asin-Honore | E-commerce Store 🧑‍💻';
  const description = 'MERN Application 🧑‍💻';
  const url = 'https://asinhonore-mern-e-commerce-app-remote.netlify.app';
  const siteName = 'E-commerce Store';
  const imageUrl = "https://media.istockphoto.com/id/1347626309/photo/latina-female-using-desktop-computer-with-clothing-online-web-store-to-choose-and-buy-clothes.jpg?s=612x612&w=0&k=20&c=SGKPpmCvxMFYld_4MXuSUBFmAcHylKNp2kJgWuszmgw=" || featuredImage;
  return (
    <Helmet>
      <meta property="og:image" content={imageUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image:alt" content="An e-commerce landing page hero image." />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default FeaturedImage;
