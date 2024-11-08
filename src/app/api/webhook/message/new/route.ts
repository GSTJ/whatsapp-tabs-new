import { db } from "@/server/db";
import { MessageDirection, MessageStatus } from "@prisma/client";
import { type NextRequest } from "next/server";
export const GET = async () => {
  return Response.json({ message: "Hello world" });
};

type TwillioNewMessageBody = {
  From: string;
  MessageSid: string;
  Body: string;
  MediaUrl0: string;
  MediaContentType0: string;
  ProfileName: string;
  WaId: string;
};

const getBody = async (
  request: NextRequest,
): Promise<TwillioNewMessageBody> => {
  const body = await request.text();
  const entries = new URLSearchParams(body).entries();
  return Object.fromEntries(entries) as TwillioNewMessageBody;
};

export const POST = async (request: NextRequest) => {
  const { WaId, MessageSid, Body, MediaUrl0, MediaContentType0, ProfileName } =
    await getBody(request);

  const customer = await db.customer.upsert({
    where: { phone: WaId },
    update: {},
    create: { phone: WaId, name: ProfileName },
  });

  await db.message.create({
    data: {
      sid: MessageSid,
      body: Body,
      direction: MessageDirection.INBOUND,
      mediaType: MediaContentType0 || "text",
      mediaUrl: MediaUrl0,
      status: MessageStatus.SENT,
      customer: { connect: { id: customer.id } },
    },
  });

  return Response.json({ message: "Message created" });
};
