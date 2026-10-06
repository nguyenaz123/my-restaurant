"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CheckCircle, WarningCircle } from "@phosphor-icons/react";
import {
  occasionOptions,
  reservationSchema,
  seatingOptions,
  timeSlots,
  type Reservation,
  type ReservationInput,
} from "@/lib/reservation-schema";
import { submitReservation } from "@/app/private-dining/actions";
import { cn } from "@/lib/cn";

const ease = [0.32, 0.72, 0, 1] as const;

const fieldBase =
  "w-full rounded-2xl bg-obsidian/60 px-4 py-3.5 text-cream placeholder:text-smoke/70 hairline outline-none transition-shadow duration-500 ease-silk focus:shadow-[inset_0_0_0_1.5px_var(--color-gold)] aria-[invalid=true]:shadow-[inset_0_0_0_1.5px_#e0787a]";

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
        <p id={`${id}-error`} role="alert" className="text-sm text-[#f0a3a4]">
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
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<{ reference: string; data: Reservation } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReservationInput, unknown, Reservation>({
    resolver: zodResolver(reservationSchema),
    defaultValues: { guests: "2", seating: "Phòng ăn chính", occasion: "Không có", time: "19:00" },
  });

  const onSubmit = (data: Reservation) => {
    setServerError(null);
    startTransition(async () => {
      const res = await submitReservation({ ...data, guests: String(data.guests) });
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
            Cảm ơn, <span className="italic text-gold">{result.data.name}</span>
          </h3>
          <p className="mt-4 max-w-[46ch] leading-relaxed text-cream/75">
            Chúng tôi đã giữ yêu cầu cho {result.data.guests} khách lúc {result.data.time}, ngày{" "}
            {new Date(`${result.data.date}T00:00:00`).toLocaleDateString("vi-VN")}, tại {result.data.seating}. Nhân viên sẽ gọi xác
            nhận trong vòng 2 giờ.
          </p>
          <p className="mt-6 text-sm text-smoke">
            Mã yêu cầu: <span className="font-medium tracking-wider text-cream">{result.reference}</span>
          </p>
          <button
            type="button"
            onClick={() => {
              setResult(null);
              reset();
            }}
            className="mt-10 w-max rounded-full bg-cream/[0.06] px-6 py-3 text-sm text-cream hairline transition-colors duration-500 ease-silk hover:bg-cream/[0.12]"
          >
            Gửi yêu cầu khác
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
          <Field id="name" label="Họ và tên" error={errors.name?.message} className="sm:col-span-2">
            <input {...register("name")} {...aria("name")} autoComplete="name" className={fieldBase} placeholder="Nguyễn Minh Khang" />
          </Field>

          <Field id="phone" label="Số điện thoại" error={errors.phone?.message}>
            <input {...register("phone")} {...aria("phone")} type="tel" autoComplete="tel" inputMode="tel" className={fieldBase} placeholder="0903 412 587" />
          </Field>

          <Field id="email" label="Email" error={errors.email?.message}>
            <input {...register("email")} {...aria("email")} type="email" autoComplete="email" className={fieldBase} placeholder="khang@email.vn" />
          </Field>

          <Field id="date" label="Ngày" error={errors.date?.message} helper="Nghỉ thứ Hai.">
            <input {...register("date")} {...aria("date")} type="date" min={minDate} className={fieldBase} />
          </Field>

          <Field id="time" label="Giờ" error={errors.time?.message}>
            <select {...register("time")} {...aria("time")} className={fieldBase}>
              {timeSlots.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>

          <Field id="guests" label="Số khách" error={errors.guests?.message}>
            <select {...register("guests")} {...aria("guests")} className={fieldBase}>
              {Array.from({ length: 14 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} khách
                </option>
              ))}
            </select>
          </Field>

          <Field id="seating" label="Khu vực" error={errors.seating?.message}>
            <select {...register("seating")} {...aria("seating")} className={fieldBase}>
              {seatingOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>

          <Field id="occasion" label="Dịp đặc biệt" error={errors.occasion?.message} className="sm:col-span-2">
            <select {...register("occasion")} {...aria("occasion")} className={fieldBase}>
              {occasionOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>

          <Field
            id="notes"
            label="Ghi chú"
            error={errors.notes?.message}
            helper="Dị ứng thực phẩm, độ chín mong muốn hoặc yêu cầu trang trí."
            className="sm:col-span-2"
          >
            <textarea {...register("notes")} {...aria("notes")} rows={3} className={cn(fieldBase, "resize-none")} />
          </Field>

          {serverError && (
            <p role="alert" className="flex items-start gap-3 rounded-2xl bg-wine/50 p-4 text-sm text-cream sm:col-span-2">
              <WarningCircle size={20} weight="light" className="shrink-0 text-[#f0a3a4]" />
              {serverError}
            </p>
          )}

          <div className="flex flex-col gap-4 pt-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-smoke">Chúng tôi chỉ dùng thông tin này để xác nhận đặt bàn.</p>
            <button
              type="submit"
              disabled={pending}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold py-2 pl-6 pr-2 text-sm font-medium text-obsidian transition-[transform,background-color] duration-500 ease-silk hover:bg-gold-bright active:scale-[0.98] disabled:cursor-wait"
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
              <span className="relative">{pending ? "Đang gửi" : "Gửi yêu cầu"}</span>
              <span className="relative flex size-9 items-center justify-center rounded-full bg-obsidian/10 transition-transform duration-500 ease-silk group-hover:translate-x-0.5 group-hover:-translate-y-px">
                <ArrowUpRight size={16} weight="light" />
              </span>
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
