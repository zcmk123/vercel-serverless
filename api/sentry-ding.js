const axios = require("axios");

const DING_API = "https://oapi.dingtalk.com/robot/send";

module.exports = async (req, res) => {
  const { body, query } = req;
  console.log(body);
  const { access_token, atMobiles = '' } = query;
  const atUsers = atMobiles.split(',');

  if (access_token) {
    // sentry 9.1.2

    const reportMsg =
      `sentry\n` +
      `Project: ${body.project_name}\n` +
      `Error: ${body.event.title}\n` +
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
