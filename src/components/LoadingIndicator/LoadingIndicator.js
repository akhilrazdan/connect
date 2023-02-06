import { usePromiseTracker } from "react-promise-tracker";
import { InfinitySpin } from 'react-loader-spinner';

const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
    return (
        promiseInProgress &&
        <div className='.loading'>
            <InfinitySpin />
        </div>
    );
}

export default LoadingIndicator;