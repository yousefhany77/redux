import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store";
const counter = () => {
  const count = useSelector((state) => state.counter.count);
  const showCount = useSelector((state) => state.counter.show);
  const dispatch = useDispatch();
  return (
   
      <div className="card">
        {showCount && (
          <div className="counter">
            {" "}
            <span>{count}</span>
          </div>
        )}
        <div className="actions">
          <button
            onClick={() => {
              dispatch(counterActions.increment());
            }}
          >
            Increment
          </button>
          <button
            onClick={() => {
              dispatch(counterActions.increase(10));
            }}
          >
            Increase
          </button>
          <button
            onClick={() => {
              dispatch(counterActions.decrement());
            }}
          >
            Decrement
          </button>
          <button
            onClick={() => {
              dispatch(counterActions.toggle());
            }}
          >
            Toggle
          </button>
        </div>
      </div>
  );
};

export default counter;
