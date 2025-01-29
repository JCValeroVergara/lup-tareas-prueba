

import { Info } from '../icons';

export const AlertMessage = ({ errorMsg }) => {
    return (
        <div
            className="my-[1.5vh] w-full h-full flex items-center justify-center p-[0.5vw] text-[1.3vh] text-[#e62e7b] leading-none border-[0.15vw] border-[#e62e7b] rounded-[0.4vw] bg-[#fcd4e8]"
            role="alert"
        >
            <Info className="w-[1.2vw] h-[1.2vw] mr-[2vw] text-[#e62e7b]" />
            <span className="sr-only">Info</span>
            <div>
                <span className="font-medium ">{errorMsg}</span>
            </div>
        </div>
    ); 
};