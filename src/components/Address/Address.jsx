import { TbCurrentLocation } from "react-icons/tb";
import useCurrentLocation from '../../hooks/useCurrentLocation.jsx';
import '../../styles/Address.scss';

const Address = () => {
    const { address, getCurrentLocation } = useCurrentLocation();

    return (
        <div className='current-container'>
            <div className="text">
                 <div className='t1'>당신을 위한</div>
                <div className='t2'>{address || '동네 맛집'}</div>
                <div className='t3'>맛집 찾기</div>
            </div>

            <div className="btn">
            <div className='cur-btn' onClick={getCurrentLocation}>
                <TbCurrentLocation className='cur-i' /> 우리 동네 설정
            </div>
            </div>
            
        </div>
    );
};

export default Address;
