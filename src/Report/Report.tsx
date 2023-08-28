import './report.css'
import darklogo from './../assets/img/darklogo.svg'
import Free from './components/Free'
import Premium from './components/Premium'

function App() {
  return (
    <div className='container'>
      <img src={darklogo} alt='Talent Score Logo' className='logo' />
      <h1 className='report-done'>Well done!</h1>
      <h3 className='report-title'>Your talent report is here, offering valuable insights into your abilities. Embrace your talents and set new goals!</h3>
      <div className='free-premium-report'>
        <Free />
        <Premium />
      </div>
    </div>
  )
}

export default App
