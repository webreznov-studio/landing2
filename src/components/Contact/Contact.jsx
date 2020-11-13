import React from "react"
import InputMask from 'react-input-mask'

import telegram from '../../images/social-icons/telegram2.png'
import whatsapp from '../../images/social-icons/whatsapp2.png'
import vk from '../../images/social-icons/vk2.png'
import inst from '../../images/social-icons/inst2.png'
import "./contact.css"
import "./contact-form.css"
import axios from "axios"
import links from "../constLinks"

class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      phone: '',
      email: '',
      titleForm: 'Оставьте свои контактные данные',
      thanksResponse: 'Спасибо за обращение, я скоро свяжусь с вами!',
      errorResponse: 'Произошла ошибка. Повторите отправку.',
      isDisabled: false
    }
    this.nameHandler = this.nameHandler.bind(this)
    this.phoneHandler = this.phoneHandler.bind(this)
    this.emailHandler = this.emailHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }
  submitHandler(e) {
    e.preventDefault();
    if(!this.state.email || !this.state.name || !this.state.phone)return
    this.setState({
      isDisabled: true
    })
    axios.post('https://webreznov.herokuapp.com/sendmailer', {
      email: this.state.email,
      message: `\n\nWEBREZNOV - landing.\nНовая заявка!\n\nИмя:${this.state.name}\nТелефон:${this.state.phone}\nПочта:${this.state.email}\nИнформация: Форма в контактах`
    })
      .then(response => {
        this.setState({
          titleForm: this.state.thanksResponse,
          name: '',
          phone: '',
          email: ''
        })
      })
      .catch(error => {
        this.setState({
          titleForm: this.state.errorResponse,
          isDisabled: false
        })
      });
  }
  nameHandler(e) {
    this.setState({
      name: e.target.value
    })
  }
  phoneHandler(e) {
    this.setState({
      phone: e.target.value
    })
  }
  emailHandler(e) {
    this.setState({
      email: e.target.value
    })
  }
  render() {
    return (
      <section className="contact" id="contact">
        <div className="container">
          <form onSubmit={this.submitHandler} className="form" id="form">
            <div className="form_fields">
              <h2>{this.state.titleForm} </h2>
              <input onChange={!this.state.isDisabled ? this.nameHandler : null} value={this.state.name} type="text" className='form_fields_input' placeholder='Ваше имя' />
              <InputMask onChange={!this.state.isDisabled ? this.phoneHandler : null} value={this.state.phone} mask="+7\999 999 99 99" maskChar="_" type="phone" className='form_fields_input' placeholder='Ваш телефон' />
              <input onChange={!this.state.isDisabled ? this.emailHandler : null} value={this.state.email} type="email" className='form_fields_input' placeholder='Ваш email' />
              <input type="submit" disabled={this.state.isDisabled} className='form_fields_btn' value="отправить" />
            </div>
            <div className="form_social">
              <a href={links.TELEGRAM} rel="noreferrer" target='_blank'><img src={telegram} alt="telegram" /></a>
              <a href={links.WHATSUP} rel="noreferrer" target='_blank'><img src={whatsapp} alt="telegram" /></a>
              <div className="separate"></div>
              <a href={links.VK} rel="noreferrer" target='_blank'><img src={vk} alt="vk" /></a>
              <a href={links.INST} rel="noreferrer" target='_blank'><img src={inst} alt="inst" /></a>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

export default Contact
