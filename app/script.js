import React, { useEffect, useState, useRef } from 'react';
import { render } from 'react-dom';

const App = () => {
    const [status, setStatus] = useState('off');
    const [time, setTime] = useState(null);
    const [timer, setTimer] = useState(null);

    let seconds = String(time % 60).padStart(2, '0');
    let minutes = String(Math.floor(time / 60)).padStart(2, '0');

    const start = () => {
        setTime(1200);
        setStatus('work');
        setTimer(
            setInterval(() => {
                setTime((time) => time - 1);
                console.log(time);
            }, 1000)
        );
    };

    const stop = () => {
        setTimer(null);
        setTime(null);
        setStatus('off');
        clearInterval(timer);
    };

    const close = () => {
        window.close();
    };

    const playBell = () => {
        const bell = new Audio('./sounds/bell.wav');
        bell.play();
    };

    useEffect(() => {
        if (time === 0) {
            playBell();
            if (status === 'work') {
                setStatus('rest');
                setTime(20);
            } else {
                setStatus('work');
                setTime(1200);
            }
        }
    }, [time]);

    return (
        <div>
            <h1>Protect your eyes</h1>
            {status === 'off' && (
                <div>
                    <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
                    <p>This app will help you track your time and inform you when its time to rest.</p>
                </div>
            )}
            {status === 'work' && <img src='./images/work.png' />}
            {status === 'rest' && <img src='./images/rest.png' />}
            {status !== 'off' && (
                <div className='timer'>
                    {minutes}:{seconds}
                </div>
            )}
            {status === 'off' && (
                <button className='btn' onClick={start}>
                    Start
                </button>
            )}
            {status !== 'off' && (
                <button className='btn' onClick={stop}>
                    Stop
                </button>
            )}
            <button className='btn btn-close' onClick={close}>
                X
            </button>
        </div>
    );
};

render(<App />, document.querySelector('#app'));
