import 'aos/dist/aos.css';

import { useEffect } from 'react';

import AOS from 'aos';

const AosComponent = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return null;
};

export default AosComponent;
