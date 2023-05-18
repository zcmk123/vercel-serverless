import { get } from '@vercel/edge-config'

module.exports = async (req, res) => {
    const { name = 'World' } = req.query;
    const greetingStr = await get('greeting')
    res.send(`Hello ${name} ${greetingStr}!`);
};
