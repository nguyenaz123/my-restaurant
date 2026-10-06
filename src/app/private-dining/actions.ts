"use server";

import { reservationSchema, type ReservationInput } from "@/lib/reservation-schema";

export type ReservationResult =
  | { ok: true; reference: string }
  | { ok: false; message: string };

export async function submitReservation(input: ReservationInput): Promise<ReservationResult> {
  const parsed = reservationSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Thông tin chưa hợp lệ, vui lòng kiểm tra lại các trường được đánh dấu." };
  }

  // TODO: connect to the booking system (e.g. SevenRooms, TableCheck) or send an email.
  // Until then the request is only acknowledged so the UI flow can be reviewed end to end.
  await new Promise((r) => setTimeout(r, 900));

  const reference = `EA-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
  return { ok: true, reference };
}
