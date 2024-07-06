const createTokenUser = (user) => {
    const { name, _id, role } = user;
    return { name, _id, role };
};

module.exports = createTokenUser;
