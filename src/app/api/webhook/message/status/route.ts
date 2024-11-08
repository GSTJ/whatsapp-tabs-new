import { db } from "@/server/db";
import { MessageStatus } from "@prisma/client";

export const GET = async () => {
  return Response.json({ message: "Hello world" });
};

type TwillioMessageStatusBody = {
  MessageStatus: string;
  MessageSid: string;
};

const getNewStatus = (
  newStatus: string,
  currentStatus?: string,
): MessageStatus | undefined => {
  switch (newStatus) {
    case "read":
      return MessageStatus.READ;
    case "delivered":
      if (currentStatus !== "read") return MessageStatus.DELIVERED;
      break;
    case "sent":
      if (currentStatus === "sending") return MessageStatus.SENT;
      break;
  }
};

export const POST = async ({ body }: { body: TwillioMessageStatusBody }) => {
  const { MessageStatus, MessageSid } = body;

  const message = await db.message.findUnique({ where: { sid: MessageSid } });

  const newStatus = getNewStatus(MessageStatus, message?.status);

  if (!newStatus) {
    return Response.json({ message: "No status change" }, { status: 200 });
  }

  await db.message.update({
    where: {
      sid: MessageSid,
    },
    data: {
      status: newStatus,
    },
  });
};
