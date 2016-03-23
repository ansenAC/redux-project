import divide from 'cobble/function/divide';
import lpad from 'cobble/function/lpad';

export function getDisplayTime(timeSecond) {
    if (timeSecond < 0) {
        timeSecond = 0;
    }

    const MINUTE = 60;
    const HOUR = MINUTE * 60;

    let timeLeft = timeSecond;

    let hours = Math.floor(divide(
        timeLeft,
        HOUR
    ));

    timeLeft -= (hours * HOUR);

    let minutes = Math.floor(divide(
        timeLeft,
        MINUTE
    ));

    timeLeft -= (minutes * MINUTE);

    let seconds = timeLeft;

    hours = hours + '';
    minutes = lpad(minutes);
    seconds = lpad(seconds);

    return `${hours}:${minutes}:${seconds}`;
};