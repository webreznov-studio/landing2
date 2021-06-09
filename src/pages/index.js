import React, { useState } from 'react';
import Header from '../components/Header/Header';
import { Offer } from '../components/Offer';
import Services from '../components/Services/Services';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import Popup from '../components/Popup/Popup';

import SEO from '../components/seo';
import 'normalize.css';
import '../styles/common-style.css';
// import Image from "../components/image"
// import Image2 from "../components/image2"

import 'normalize.css';

const IndexPage = () => {
    const [showPopup, toShowPopup] = useState(false);
    const [infoText, setInfoText] = useState('main screen request');
    return (
        <>
            <SEO title="Студия веб-разработок - webreznov" />

            <Popup show={showPopup} setShow={toShowPopup} info={infoText} />

            <Header />

            <Offer setShow={toShowPopup} />

            {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
        <Image2 />
      </div> */}

            <Services setShow={toShowPopup} setInfo={setInfoText} />

            <Contact />

            <Footer />
        </>
    );
};

export default IndexPage;
