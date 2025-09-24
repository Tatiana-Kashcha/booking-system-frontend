export interface UpdateAppointmentDto {
  id: number;
  appointment_date: Date;
  duration: number;
  status: string;
  clientId: number;
  businessId: number;
}
