import { useHistory } from '@magento/venia-concept/src/drivers';
import { useEffect } from 'react';

const useHistoryBlock = callback => {
    const history = useHistory();
    useEffect(() => {
        history.block(() => {
            callback();
        });
    }, [callback, history]);
};

export default useHistoryBlock;
