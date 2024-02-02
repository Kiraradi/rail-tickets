import { useState } from 'react'
import ApiService from '../../services/ApiService';

import './Footer.css';

export default function Footer() {

  const [email, setEmail] = useState<string>();

  const send = async () => {
    if (email) {
      await ApiService.subscribe(email);
      setEmail('');
    }
  }

  return (
    <footer className='Footer'>
      <div className='Footer-main'>
        <div className='footer-column'>
          <div>
            <h2 className='footer-title'>Свяжитесь с нами</h2>
          </div>
          <div className='footer-rows'>
            <div className='footer-row'>
              <img src='/images/phone.png'/>
              <span className='footer-row-text'>8 (800) 000 00 00</span>
            </div>
            <div className='footer-row'>
              <img src='/images/email.png'/>
              <span className='footer-row-text'>inbox@mail.ru</span>
            </div>
            <div className='footer-row'>
              <img src='/images/skype.png'/>
              <span className='footer-row-text'>tu.train.tickets</span>
            </div>
            <div className='footer-row'>
              <img src='/images/location.png'/>
              <div className='footer-subColumn'>
                <span className='footer-row-text'>г. Москва</span>
                <span className='footer-row-text'>ул. Московская 27-35</span>
                <span className='footer-row-text'>555 555</span>
              </div>
            </div>
          </div>
        </div>
        <div className='footer-column'>
          <div>
            <h2 className='footer-title'>Подписка</h2>
          </div>
          <div className='footer-rows'>
            <div className='footer-row'>
              <span className='footer-row-text'>Будьте в курсе событий</span>
            </div>
            <div className='footer-row'>
              <input className="example-custom-input" placeholder='e-mail' value={email} onChange={(event) => setEmail(event.target.value)} type='email'/>
              <button className="footer-send-button" onClick={()=> send()}>ОТПРАВИТЬ</button>
            </div>
          </div>
          <div>
            <h2 className='footer-title'>Подписывайтесь на нас</h2>
          </div>
          <div className='footer-row'>
            <img src='/images/youtube.png'/>
            <img src='/images/linkedin.png'/>
            <img src='/images/google.png'/>
            <img src='/images/facebook.png'/>
            <img src='/images/twitter.png'/>
          </div>
        </div>  
      </div>
      <div className='Footer-down'>
        <div className='footer-logo'>Лого</div>
        <img src='/images/row-up.png'/>
        <div className='footer-row-text'>2018 WEB</div>
      </div>
    </footer>
  )
}
