import { MessageDirection, MessageStatus } from "@prisma/client";
import { db } from "../db";

type SendMessageInput = {
  body: string;
  customerId: string;
  mediaType: string;
  sid: string;
  mediaUrl?: string;
  employeeId: string;
};

export class MessageService {
  async sendMessage(input: SendMessageInput) {
    return db.message.create({
      data: {
        body: input.body,
        customer: { connect: { id: input.customerId } },
        sid: input.sid,
        mediaType: input.mediaType,
        direction: MessageDirection.INBOUND,
        status: MessageStatus.SENT,
        mediaUrl: input.mediaUrl,
        employee: { connect: { id: input.employeeId } },
      },
    });
  }
}
