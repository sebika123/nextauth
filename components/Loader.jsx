 
import { TailSpin } from "react-loader-spinner";
const LoaderComp = () => {
    return (
        <TailSpin
            height="80"
            width="80"
            color="blue"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    );
};  
export default LoaderComp;
