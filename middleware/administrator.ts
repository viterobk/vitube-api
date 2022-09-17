export const administrator = (req, res, next) => {
    if (req?.context?.user?.isAdmin) {
        next();
    } else {
        res.code(404).send('Not found');
    }
}