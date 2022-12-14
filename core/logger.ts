class Logger {
    info = (message: any) => {
        console.log(message);
    }

    warn = (message: any) => {
        console.warn(message);
    }

    err = (message: any) => {
        console.error(message);
    }
}

export default new Logger();