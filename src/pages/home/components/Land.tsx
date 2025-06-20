import home_land from 'assets/img_custom/home_land_bg_unseeded.png';
import home_land_unlock from 'assets/img_custom/home_land_bg_seedable.png';
import home_unclock from 'assets/img_custom/home_icon_ad_unlock.png';
import lock_icon from 'assets/img_custom/pup_icon_lock.png'
import dollar from 'assets/images/dollar.png'
interface Props {
  isLock?: boolean;
  isMark?: boolean;
  isShowLock?: boolean

}

const Land = ({ isLock, isMark, isShowLock }: Props) => {

  return (
    <div className="relative">
      {isMark && (
        <div className="absolute top-0 left-0 z-[10] w-full h-full rotate-[-45deg] flex justify-center items-center">
          <div className='relative'>
            <div className="absolute top-[-10px] left-0 z-[10] w-full h-full rotate-[-45deg] flex justify-center items-center">
              <div className='flex gap-1 items-center text-[12px] font-[700] rotate-[45deg]'>
                5
                <img src={"/icons/diamond-icon.svg"} width={18} />
              </div>
            </div>
            <img src={home_unclock} width={50} alt="Unlock icon" />
          </div>
        </div>
      )}
      {isShowLock && (
        <div className="absolute top-0 left-0 z-[10] w-full h-full rotate-[-45deg] flex justify-center items-center">
          <img src={lock_icon} width={30} alt="Unlock icon" />
        </div>
      )}

      {isLock ? (
        <img
          src={home_land}
          className="absolute top-1 scale-[1.35] rotate-[-45deg] left-1 w-full h-full"
          alt="Land lock"
        />
      ) : (
        <img
          src={home_land_unlock}
          className="absolute top-1 scale-[1.35] rotate-[-45deg] left-1 w-full h-full"
          alt="Land unlock"
        />

      )}
    </div>
  );
};

export default Land;
