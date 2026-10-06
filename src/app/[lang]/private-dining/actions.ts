"use server";

import { createReservationSchema, type ReservationInput } from "@/lib/reservation-schema";
import { defaultLocale, hasLocale } from "@/i18n/config";
import { loadDictionary } from "@/i18n/dictionaries";

export type ReservationResult =
  | { ok: true; reference: string }
  | { ok: false; message: string };

/** `locale` is passed by the form because root params are not readable inside Server Actions. */
export async function submitReservation(locale: string, input: ReservationInput): Promise<ReservationResult> {
  const dict = await loadDictionary(hasLocale(locale) ? locale : defaultLocale);
  const parsed = createReservationSchema(dict.reservation.errors).safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: dict.reservation.errors.invalid };
  }

  // TODO: connect to the booking system (e.g. SevenRooms, TableCheck) or send an email.
  // Until then the request is only acknowledged so the UI flow can be reviewed end to end.
  await new Promise((r) => setTimeout(r, 900));

  const reference = `EA-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
  return { ok: true, reference };
}
