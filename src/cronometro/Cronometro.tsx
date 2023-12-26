import { useEffect, useRef } from "react";
import { Observable, interval, fromEvent } from "rxjs";
import { map, takeUntil } from "rxjs/operators";

import './cronometro.style.css';

function Cronometro() {

  const startButtonRef = useRef<HTMLButtonElement>(null);
  const stopButtonRef = useRef<HTMLButtonElement | null>(null);
  const resultsAreaRef = useRef<HTMLHeadingElement | null>(null);


  useEffect(() => {
    const startButton = startButtonRef.current;
    const stopButton = stopButtonRef.current;
    const resultsArea = resultsAreaRef.current;

    // Observables
    const tenthSecond$ = interval(100);
    const startClick$ = fromEvent(startButton as HTMLButtonElement, 'click');
    const stopClick$ = fromEvent(stopButton as HTMLButtonElement, 'click');

    const subscription = startClick$.subscribe(() => {
      tenthSecond$
        .pipe(
          map((item) => item / 10),
          takeUntil(stopClick$)
        )
        .subscribe((num) => (resultsArea!.innerText = num + 's'));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-4 col-xs-offset-4">
          <div className="text-center">
            <h1>Stopwatch</h1>
            <button ref={startButtonRef} className="btn btn-success">
              Start
            </button>
            <button ref={stopButtonRef} className="btn btn-success">
              Stop
            </button>
            <h2 ref={resultsAreaRef} className="output">
              0.0s
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cronometro;
