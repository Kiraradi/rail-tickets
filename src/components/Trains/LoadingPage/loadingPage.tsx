import './LoadingPage.css';

export default function LoadingPage() {
  return (
    <div className='loading-Page'>
        <h2 className='loading-Page-title'>идет поиск</h2>
        <img className='loading-Page-Img' src='./images/анимация-загрузки.gif' alt='loading Page Img'></img>
    </div>
  )
}
