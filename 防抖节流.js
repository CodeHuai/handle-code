function debounce(fn, delay) {
    let timer = null;
    return function (...arg) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(fn, delay);
    };
}
