import { ACTIONS } from '../App';

const DigitButton = ({ digit, dispatch, className }) => {
    return (
        <button
            className={className}
            onClick={() =>
                dispatch({ type: ACTIONS.ADD_DIGIT, payload: digit })
            }
        >
            {digit}
        </button>
    );
};

export default DigitButton;
