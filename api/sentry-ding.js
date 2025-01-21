const axios = require("axios");

const DING_API = "https://oapi.dingtalk.com/robot/send";

module.exports = async (req, res) => {
    const { body, query } = req;
    const { access_token, atMobiles = '' } = query;
    const atUsers = atMobiles.split(',');

    if (access_token) {
        // sentry 9.1.2

        console.log('incoming query', query);
        console.log('incoming body', body);

        // compitable with new sentry

        const event = body.event;
        const env = event.environment || body.environment;
        const release = event.release || body.release;

        const reportMsg =
            `sentry\n` +
            `Triggering Rules: ${body.triggering_rules.join(', ')}\n` +
            `Project: ${body.project_name}\n` +
            `Release: ${release}\n` +
            `Environment: ${env}\n` +
            `Error: ${event.title}\n` +
            `Sentry Issue: ${body.url}\n` +
            `${atUsers.map((id) => `@${id}`).join(' ')}`;

        const { data: resData } = await axios({
            method: "post",
            url: DING_API,
            params: { access_token },
            data: {
                msgtype: "text",
                text: {
                    content: reportMsg
                },
                at: {
                    atMobiles: atUsers
                }
            }
        });
        res.send(resData);
    } else {
        res.send("access_token is required");
    }
};
