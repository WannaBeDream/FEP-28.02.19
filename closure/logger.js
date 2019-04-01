function logAction(action){
    let timerStart = Date.now();

    return function stop(){
            const duration = Date.now() - timerStart;
            console.log(action + ' took ' + duration);
        }
}

const logger = logAction('Some action');
f();
logger.log()