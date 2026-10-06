import { z } from "zod";

export const seatingOptions = ["Phòng ăn chính", "The Cellar Room", "The Ember Room", "Chef's Counter"] as const;
export const occasionOptions = ["Không có", "Sinh nhật", "Kỷ niệm", "Tiếp khách đối tác", "Cầu hôn"] as const;
export const timeSlots = ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"] as const;

const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const reservationSchema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập họ tên."),
  phone: z
    .string()
    .trim()
    .regex(/^(\+?84|0)(3|5|7|8|9)\d{8}$/, "Số điện thoại Việt Nam chưa hợp lệ, ví dụ 0903 412 587."),
  email: z.email("Email chưa đúng định dạng."),
  date: z
    .string()
    .min(1, "Vui lòng chọn ngày.")
    .refine((v) => new Date(`${v}T00:00:00`) >= today(), "Ngày đặt phải từ hôm nay trở đi.")
    .refine((v) => {
      const d = new Date(`${v}T00:00:00`);
      return d.getDay() !== 1;
    }, "Nhà hàng nghỉ vào thứ Hai."),
  time: z.enum(timeSlots, "Vui lòng chọn giờ."),
  guests: z.coerce.number<string>().int().min(1, "Tối thiểu 1 khách.").max(14, "Nhóm trên 14 khách vui lòng gọi trực tiếp."),
  seating: z.enum(seatingOptions),
  occasion: z.enum(occasionOptions),
  notes: z.string().max(400, "Ghi chú tối đa 400 ký tự.").optional(),
});

export type ReservationInput = z.input<typeof reservationSchema>;
export type Reservation = z.output<typeof reservationSchema>;
