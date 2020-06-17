import React from "react";
import styles from './LazyLoadImage.module.css';



const LazyLoadImage = () => {
  return (
    <p>
      <span>Lazy load image</span>
      {/* Don't include a src attribute in images you wish to load lazily. //
      Instead specify their src safely in a data attribute */}
      
      {/* <img data-src="lighthouse.jpg" alt="A snazzy lighthouse" class="lazy" /> */}
      {/* <img data-src="https://lazy-load-demo.netlify.com/images/small/lighthouse-5.jpg" alt="A snazzy lighthouse" className="lazy" /> */}

      {/* <picture>
        <source srcset="https://lazy-load-demo.netlify.com/images/large/lighthouse-5.jpg" media="(min-width: 1200px)" />
        <source srcset="https://lazy-load-demo.netlify.com/images/medium/lighthouse-5.jpg" media="(min-width: 700px)" />
        <img src="https://lazy-load-nlm.netlify.com/images/lighthouse-5.jpg?nf_resize=fit&w=20" alt="snazzy lighthouse" />
      </picture> */}
      <picture className={styles.picture}>
        <source 
          srcSet="https://lazy-load-nlm.netlify.com/images/lighthouse-5.jpg?nf_resize=fit&w=20" 
          data-src="https://lazy-load-demo.netlify.com/images/large/lighthouse-5.jpg" 
          media="(min-width: 1200px)" />
        <source 
          srcSet="https://lazy-load-nlm.netlify.com/images/lighthouse-5.jpg?nf_resize=fit&w=20" 
          data-src="https://lazy-load-demo.netlify.com/images/large/lighthouse-5.jpg" 
          media="(min-width: 700px)" />
        <img 
          src="https://lazy-load-nlm.netlify.com/images/lighthouse-5.jpg?nf_resize=fit&w=20"
          data-src="https://lazy-load-demo.netlify.com/images/large/lighthouse-5.jpg" 
          alt="snazzy lighthouse" />
      </picture>
    </p>
  );
};

export default LazyLoadImage;
