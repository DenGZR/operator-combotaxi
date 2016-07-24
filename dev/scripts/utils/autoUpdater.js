/**
 * Created by gasya on 19.04.16.
 * DigitalOutlooks corporation.
 */

export const autoUpdater = (interval, fn) => {
    const intervalId = setInterval(() => {
        fn();
    }, interval);
    return () => {
        clearInterval(intervalId);
    }
};