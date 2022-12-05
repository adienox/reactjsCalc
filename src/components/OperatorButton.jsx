import { ACTIONS } from '../App';

const OperatorButton = ({ operator, dispatch, className }) => {
    return (
        <button
            className={className}
            onClick={() =>
                dispatch({ type: ACTIONS.CHOOSE_OPERATOR, payload: operator })
            }
        >
            {operator}
        </button>
    );
};

export default OperatorButton;
