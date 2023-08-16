import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import domtoimage from 'dom-to-image'
import Report from './Report';
import Modal from './Modal';
import download from './../assets/downloadicon.svg';

interface Data {
  email: string;
  report_file: string;
}

function Free() {
  const [data, setData] = useState<Data>({
    email: 'tami@mail.ru', 
    report_file: ''
  })

  const [modal, setModal] = useState(false)
  const [img, setImg] = useState('')
  const [disable, setDisable] = useState(false)

  const componentRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const fetchData = async () => {
      if (componentRef.current) {
        await domtoimage.toJpeg(componentRef.current, { quality: 0.98 }).then(function (dataUrl: string) {
          setImg(dataUrl)     
          setData({...data, report_file: dataUrl})
        })
      }
    };

    fetchData()
  }, [])

  const postData = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/upload-report/', {
        email: 'tami@mail.ru', 
        report_file: img
      }).then(res=>{
        setImg(res.data.report_file);
        setDisable(true)
      });
    } catch (error) {}  
  }

  useEffect(()=>{
    if (img !== null && img !== '') {
      postData()      
    } 
  }, [img])

  const openModal = () => {
    setModal(!modal)
  }

  const generatePDF = useReactToPrint({
    content: () => componentRef.current as HTMLElement,
    documentTitle: 'TalentScoreReport',
  })

  return (
    <>
      <div className='free'>
        <h2 className='free-header'>Get a free report</h2>
        <h2 className='free-header'>with overall and sector-specific percentiles</h2>
        <div className='free-report'>
          <div className='scaled-report'>
            <Report ref={componentRef} />
          </div> 
          <button onClick={generatePDF} className='report-download'>
            <p className='download-text'>FREE DOWNLOAD</p>
            <img src={download} alt='Report Download Icon' />
          </button>
        </div>
        <button onClick={openModal} disabled={disable ? false : true} className='share-button'>SHARE</button>
        <Modal modal={modal} setModal={setModal} img={img} /> 
      </div>
    </> 
  );
}

export default Free;
