import { useReducer } from 'react';
import DigitButton from './components/DigitButton';
import OperatorButton from './components/OperatorButton';

export const ACTIONS = {
    ADD_DIGIT: 'addDigit',
    CHOOSE_OPERATOR: 'chooseOperator',
    DELETE_DIGIT: 'deleteDigit',
    EVAL: 'eval',
    CLEAR: 'clear',
};

const evaluate = (state) => {
    const prev = parseFloat(state.previousOperand);
    const current = parseFloat(state.currentOperand);

    if (isNaN(prev) || isNaN(current)) return null;
    let calculation = null;

    switch (state.operator) {
        case '+':
            calculation = prev + current;
            break;
        case '-':
            calculation = prev - current;
            break;
        case '*':
            calculation = prev * current;
            break;
        case '÷':
            calculation = prev / current;
            break;

        default:
            break;
    }

    return calculation;
};

const reducer = (state, { type, payload }) => {
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite) {
                return {
                    currentOperand: payload,
                };
            }
            if (payload === '0' && state.currentOperand === '0') return state;

            if (payload === '.' && state.currentOperand == null)
                return {
                    ...state,
                    currentOperand: payload,
                };

            if (payload === '.' && state.currentOperand.includes('.'))
                return state;

            if (state.previousOperand == null && state.operator === '-') {
                return {
                    ...state,
                    operator: null,
                    currentOperand: `-${payload}`,
                };
            }
            return {
                ...state,
                currentOperand: `${state.currentOperand || ''}${payload}`,
            };

        case ACTIONS.CHOOSE_OPERATOR:
            if (state.previousOperand == null) {
                return {
                    ...state,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                    operator: payload,
                };
            }
            if (state.currentOperand == null && state.previousOperand != null) {
                return {
                    ...state,
                    operator: payload,
                };
            }
            return {
                ...state,
                previousOperand: evaluate(state),
                currentOperand: null,
                operator: payload,
            };

        case ACTIONS.CLEAR:
            return {};

        case ACTIONS.EVAL:
            if (
                state.currentOperand == null ||
                state.previousOperand == null ||
                state.operator == null
            )
                return state;

            return {
                ...state,
                overwrite: true,
                previousOperand: null,
                currentOperand: evaluate(state),
                operator: null,
            };

        case ACTIONS.DELETE_DIGIT:
            if (state.currentOperand == null) return state;
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1),
            };

        default:
            return state;
    }
};

const App = () => {
    const [{ currentOperand, previousOperand, operator }, dispatch] =
        useReducer(reducer, {});

    return (
        <div className="grid">
            <div className="grid__output">
                <div className="previousOperand">
                    {previousOperand} {operator}
                </div>
                <div className="currentOperand">{currentOperand}</div>
            </div>
            <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>
                AC
            </button>
            <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
                DE
            </button>
            <OperatorButton operator="÷" dispatch={dispatch} />
            <OperatorButton
                className="paddingTop"
                operator="×"
                dispatch={dispatch}
            />
            <DigitButton digit="7" dispatch={dispatch} />
            <DigitButton digit="8" dispatch={dispatch} />
            <DigitButton digit="9" dispatch={dispatch} />
            <OperatorButton operator="-" dispatch={dispatch} />
            <DigitButton digit="4" dispatch={dispatch} />
            <DigitButton digit="5" dispatch={dispatch} />
            <DigitButton digit="6" dispatch={dispatch} />
            <OperatorButton operator="+" dispatch={dispatch} />
            <DigitButton digit="1" dispatch={dispatch} />
            <DigitButton digit="2" dispatch={dispatch} />
            <DigitButton digit="3" dispatch={dispatch} />
            <button
                className="grid__spanTwoRow"
                onClick={() => dispatch({ type: ACTIONS.EVAL })}
            >
                =
            </button>
            <DigitButton
                className="grid__spanTwoColumn"
                digit="0"
                dispatch={dispatch}
            />
            <DigitButton digit="." dispatch={dispatch} />
        </div>
    );
};

export default App;
