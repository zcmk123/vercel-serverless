const axios = require('axios');

module.exports = async (req, res) => {
    const { url } = req.query;

    if (url) {
        const { data } = await axios({ url });
        res.send(data);
    } else {
        res.send('url is required');
    }
};
