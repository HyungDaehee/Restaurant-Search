import React from 'react'
import Logo from '../../assets/Logo/Logo.png'
import { useNavigate } from 'react-router-dom'
import '../../styles/LogoImage.scss'

const LogoImage = () => {
    const navigate = useNavigate();

    const LogoClick = ()=> {
        navigate('/')
    }

  return (
    <img src={Logo} alt='로고' onClick={LogoClick} className='Logo-Image'/>
  )
}

export default LogoImage