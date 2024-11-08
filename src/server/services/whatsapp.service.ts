type SendMessageInput = {
  body: string;
  customerId: string;
  mediaType: string;
  sid: string;
  mediaUrl?: string;
  employeeId: string;
};

const accountSid = "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
const authToken = "your_auth_token";

const client = require("twilio")(accountSid, authToken);

export class TwilioService {
  async sendMessage(input: SendMessageInput) {
    client.messages.create({
      body: input.body,
      to: input.customerId,
      from: "+12019376688",
    });
  }
}
