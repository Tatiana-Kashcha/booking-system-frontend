export interface CreateAppointmentDto {
  appointment_date: Date;
  duration: number;
  status: string;
  clientId: number;
  businessId: number;
}
