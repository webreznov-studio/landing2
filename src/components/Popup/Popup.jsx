import React, { useState } from "react"
import InputMask from 'react-input-mask'

import '../Contact/contact-form.css'
import './popup.css'

import telegram from '../../images/social-icons/telegram2.png'
import whatsapp from '../../images/social-icons/whatsapp2.png'
import vk from '../../images/social-icons/vk2.png'
import inst from '../../images/social-icons/inst2.png'
import phoneBg from '../../images/phone-015.png'
import axios from "axios"
import links from "../constLinks"

const Popup = (props) => {
    const firstLetter = /(?!.*[DFIOQU])[A-VXY]/i;
    const mask = [firstLetter]
    const [emailInput, setEmailInput] = useState('')
    const [phoneInput, setPhoneInput] = useState('')
    const [nameInput, setNameInput] = useState('')

    const handlerSendMail = (e) => {
        e.preventDefault();
        axios
            .post('https://webreznov.herokuapp.com/sendmailer',
                {
                    email: emailInput,
                    message: `name: ${nameInput}\nphone: ${phoneInput}`
                })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    if (props.show) {
        return (
            <div onClickCapture={() => props.setShow(false)} className='popup_wrapper'>
                <div onClickCapture={() => props.setShow(true)} className="popup_wrapper_block">
                    <form onSubmit={handlerSendMail} className="form" id="form">
                        <h2 className='form_title'>Оставьте свои контактные данные</h2>
                        <div className="form_fields">
                            {/* <input type="text" className='form_fields_input' placeholder='Ваше имя' /> */}
                            <InputMask onChange={(e) => setNameInput(e.target.value)} value={nameInput} mask={mask} maskChar=" " type="text" className='form_fields_input' placeholder='Ваше имя' required />
                            <InputMask onChange={(e) => setPhoneInput(e.target.value)} value={phoneInput} mask="+7\999 999 99 99" maskChar="_" type="phone" className='form_fields_input' placeholder='Ваш телефон' required />
                            <input onChange={(e) => setEmailInput(e.target.value)} value={emailInput} type="email" className='form_fields_input' placeholder='Ваш email' required />
                            <input type="submit" className='form_fields_btn' value="отправить" />
                            <button onClickCapture={() => props.setShow(false)} className='form_close' title='закрыть окно'>X</button>
                            {/* <input style={{"display":"none"}} onChange={null} readOnly value={props.info}/> */}
                        </div>
                        <div className="form_social">
                            <a href={links.TELEGRAM} target='_blank'><img src={telegram} alt="telegram" /></a>
                            <a href={links.WHATSUP} target='_blank'><img src={whatsapp} alt="telegram" /></a>
                            <a href={links.VK} target='_blank'><img src={vk} alt="vk" /></a>
                            <a href={links.INST} target='_blank'><img src={inst} alt="inst" /></a>
                        </div>
                        <img className='form_bg' src={phoneBg} alt="phone" />
                    </form>
                </div>
            </div>
        )
    } else {
        return <></>
    }
}

export default Popup