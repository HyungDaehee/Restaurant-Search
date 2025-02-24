import { TbCurrentLocation } from "react-icons/tb";
import useCurrentLocation from '../../hooks/useCurrentLocation.jsx';
import '../../styles/Address.scss';

const Address = () => {
    const { address, getCurrentLocation } = useCurrentLocation();

    return (
        <div className='current-container'>
            <div className='t1'>당신을 위한</div>
            <div className='sec'>
                <div className='t2'>{address || '동네 맛집'}</div>
                <div className='t3'>맛집 찾기</div>
            </div>
            <div className='cur-btn' onClick={getCurrentLocation}>
                <TbCurrentLocation className='cur-i' /> 현재 위치 설정
            </div>
        </div>
    );
};

export default Address;
