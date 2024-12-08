/* eslint-disable react-refresh/only-export-components */
import { Helmet } from "react-helmet";
import { SEOPropTypes } from "../types/seoTypes";

const SEO = ({ title, description, keywords }) => (
  <Helmet>
    <title>{title} | ProductStore</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
  </Helmet>
);

SEO.propTypes = SEOPropTypes;

export default SEO;
