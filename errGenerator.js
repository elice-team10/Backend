export const errGenerator = (msg, statusCode, res) => {
    let err = new Error(msg);
    err.status = statusCode;
    err.res = res;
    return err;
};
