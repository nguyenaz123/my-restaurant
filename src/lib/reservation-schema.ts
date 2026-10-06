import { z } from "zod";

/** Stored values are ids; labels come from `dict.reservation.seatingOptions` / `occasionOptions`. */
export const seatingOptions = ["main", "cellar", "ember", "counter"] as const;
export const occasionOptions = ["none", "birthday", "anniversary", "business", "proposal"] as const;
export const timeSlots = ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"] as const;

export type SeatingId = (typeof seatingOptions)[number];
export type OccasionId = (typeof occasionOptions)[number];

/** Vietnamese mobile (0xx / +84xx), or any other international number in +country form. */
const PHONE = /^(?:(?:\+?84|0)(?:3|5|7|8|9)\d{8}|\+(?!84)\d{7,14})$/;

export type ReservationMessages = {
  name: string;
  phone: string;
  email: string;
  dateRequired: string;
  datePast: string;
  dateMonday: string;
  time: string;
  guestsMin: string;
  guestsMax: string;
  option: string;
  notes: string;
};

const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

/** Built per locale so the client form and the server action share rules but show localized messages. */
export function createReservationSchema(m: ReservationMessages) {
  return z.object({
    name: z.string().trim().min(2, m.name),
    phone: z
      .string()
      .trim()
      .refine((v) => PHONE.test(v.replace(/[\s.()-]/g, "")), m.phone),
    email: z.email(m.email),
    date: z
      .string()
      .min(1, m.dateRequired)
      .refine((v) => new Date(`${v}T00:00:00`) >= today(), m.datePast)
      .refine((v) => new Date(`${v}T00:00:00`).getDay() !== 1, m.dateMonday),
    time: z.enum(timeSlots, m.time),
    guests: z.coerce.number<string>().int().min(1, m.guestsMin).max(14, m.guestsMax),
    seating: z.enum(seatingOptions, m.option),
    occasion: z.enum(occasionOptions, m.option),
    notes: z.string().max(400, m.notes).optional(),
  });
}

type Schema = ReturnType<typeof createReservationSchema>;
export type ReservationInput = z.input<Schema>;
export type Reservation = z.output<Schema>;
