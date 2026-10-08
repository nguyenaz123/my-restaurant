"use client";

import { useMemo, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CheckCircle, WarningCircle } from "@phosphor-icons/react";
import {
  createReservationSchema,
  occasionOptions,
  seatingOptions,
  timeSlots,
  type Reservation,
  type ReservationInput,
} from "@/lib/reservation-schema";
import { submitReservation } from "@/app/[lang]/private-dining/actions";
import { cn } from "@/lib/cn";
import { SelectField, type SelectOption } from "@/components/ui/select-field";
import { localeMeta } from "@/i18n/config";
import { useI18n } from "@/i18n/client";
import { format } from "@/i18n/format";
import { splitAccent } from "@/i18n/rich";

const ease = [0.32, 0.72, 0, 1] as const;

const fieldBase =
  "w-full rounded-field bg-obsidian/60 px-4 py-3.5 text-cream placeholder:text-smoke/70 hairline outline-none transition-shadow duration-500 ease-silk focus:shadow-[inset_0_0_0_1.5px_var(--color-gold)] aria-[invalid=true]:shadow-[inset_0_0_0_1.5px_var(--color-danger)]";

function Field({
  id,
  label,
  error,
  helper,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  helper?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm text-cream/90">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : helper ? (
        <p id={`${id}-helper`} className="text-xs text-smoke">
          {helper}
        </p>
      ) : null}
    </div>
  );
}

export function ReservationForm() {
  const { locale, dict } = useI18n();
  const t = dict.reservation;
  const schema = useMemo(() => createReservationSchema(t.errors), [t.errors]);
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ reference: string; data: Reservation } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReservationInput, unknown, Reservation>({
    resolver: zodResolver(schema),
    defaultValues: { guests: "2", seating: "main", occasion: "none", time: "19:00" },
  });

  const onSubmit = (data: Reservation) => {
    setServerError(null);
    startTransition(async () => {
      const res = await submitReservation(locale, { ...data, guests: String(data.guests) });
      if (res.ok) setResult({ reference: res.reference, data });
      else setServerError(res.message);
    });
  };

  const aria = (name: keyof ReservationInput) => ({
    id: name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  const minDate = new Date().toISOString().slice(0, 10);

  const options = useMemo(
    () => ({
      time: timeSlots.map((s) => ({ value: s, label: s })),
      guests: Array.from({ length: 14 }, (_, i) => ({ value: String(i + 1), label: format(t.guestsOption, { n: i + 1 }) })),
      seating: seatingOptions.map((s) => ({ value: s, label: t.seatingOptions[s] })),
      occasion: occasionOptions.map((o) => ({ value: o, label: t.occasionOptions[o] })),
    }),
    [t],
  );

  /** A themed select bound to the form; validation and error wiring match the native inputs. */
  const select = (name: "time" | "guests" | "seating" | "occasion", opts: readonly SelectOption[]) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <SelectField
          id={name}
          name={field.name}
          value={String(field.value ?? "")}
          onValueChange={field.onChange}
          onBlur={field.onBlur}
          options={opts}
          invalid={!!errors[name]}
          describedBy={errors[name] ? `${name}-error` : undefined}
        />
      )}
    />
  );

  return (
    <AnimatePresence mode="wait">
      {result ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease }}
          className="flex min-h-[520px] flex-col justify-center"
          role="status"
        >
          <motion.span
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.2 }}
            className="flex size-16 items-center justify-center rounded-full bg-gold/15 text-gold-bright hairline"
          >
            <CheckCircle size={32} weight="light" />
          </motion.span>
          <h3 className="mt-8 font-display text-4xl font-light text-cream">
            {/* Format each run separately so a "*" typed in the name cannot change the accent markup. */}
            {splitAccent(t.thanks).map((part, i) => {
              const filled = format(part, { name: result.data.name });
              return i % 2 ? (
                <span key={i} className="italic text-gold">
                  {filled}
                </span>
              ) : (
                filled
              );
            })}
          </h3>
          <p className="mt-4 max-w-[46ch] leading-relaxed text-cream/75">
            {format(t.success, {
              guests: result.data.guests,
              time: result.data.time,
              date: new Date(`${result.data.date}T00:00:00`).toLocaleDateString(localeMeta[locale].intl),
              seating: t.seatingOptions[result.data.seating],
            })}
          </p>
          <p className="mt-6 text-sm text-smoke">
            {t.reference} <span className="font-medium tracking-wider text-cream">{result.reference}</span>
          </p>
          <button
            type="button"
            onClick={() => {
              setResult(null);
              reset();
            }}
            className="mt-10 w-max rounded-pill bg-cream/[0.06] px-6 py-3 text-sm text-cream hairline transition-colors duration-500 ease-silk hover:bg-cream/[0.12]"
          >
            {t.another}
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          <Field id="name" label={t.name} error={errors.name?.message} className="sm:col-span-2">
            <input {...register("name")} {...aria("name")} autoComplete="name" className={fieldBase} placeholder={t.placeholders.name} />
          </Field>

          <Field id="phone" label={t.phone} error={errors.phone?.message}>
            <input {...register("phone")} {...aria("phone")} type="tel" autoComplete="tel" inputMode="tel" className={fieldBase} placeholder={t.placeholders.phone} />
          </Field>

          <Field id="email" label={t.email} error={errors.email?.message}>
            <input {...register("email")} {...aria("email")} type="email" autoComplete="email" className={fieldBase} placeholder={t.placeholders.email} />
          </Field>

          <Field id="date" label={t.date} error={errors.date?.message} helper={t.dateHelper}>
            <input {...register("date")} {...aria("date")} type="date" min={minDate} className={fieldBase} />
          </Field>

          <Field id="time" label={t.time} error={errors.time?.message}>
            {select("time", options.time)}
          </Field>

          <Field id="guests" label={t.guests} error={errors.guests?.message}>
            {select("guests", options.guests)}
          </Field>

          <Field id="seating" label={t.seating} error={errors.seating?.message}>
            {select("seating", options.seating)}
          </Field>

          <Field id="occasion" label={t.occasion} error={errors.occasion?.message} className="sm:col-span-2">
            {select("occasion", options.occasion)}
          </Field>

          <Field
            id="notes"
            label={t.notes}
            error={errors.notes?.message}
            helper={t.notesHelper}
            className="sm:col-span-2"
          >
            <textarea {...register("notes")} {...aria("notes")} rows={3} className={cn(fieldBase, "resize-none")} />
          </Field>

          {serverError && (
            <p role="alert" className="flex items-start gap-3 rounded-field bg-wine/50 p-4 text-sm text-cream sm:col-span-2">
              <WarningCircle size={20} weight="light" className="shrink-0 text-danger" />
              {serverError}
            </p>
          )}

          <div className="flex flex-col gap-4 pt-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-smoke">{t.privacy}</p>
            <button
              type="submit"
              disabled={pending}
              className="btn btn-gold group relative inline-flex items-center gap-3 overflow-hidden rounded-pill bg-gold py-2 pl-6 pr-2 text-sm font-medium text-obsidian transition-[transform,background-color] duration-500 ease-silk hover:bg-gold-bright active:scale-[0.98] disabled:cursor-wait"
            >
              {pending && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-cream/50 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
                />
              )}
              <span className="relative">{pending ? t.sending : t.submit}</span>
              <span className="relative flex size-9 items-center justify-center rounded-pill bg-obsidian/10 transition-transform duration-500 ease-silk group-hover:translate-x-0.5 group-hover:-translate-y-px">
                <ArrowUpRight size={16} weight="light" />
              </span>
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
