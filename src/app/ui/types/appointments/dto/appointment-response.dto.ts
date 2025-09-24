export interface AppointmentBaseDto {
  id: number;
  appointment_date: Date;
  duration: number;
  status: string;
}

export interface AppointmentResponseDto extends AppointmentBaseDto {
  clientId: number;
  businessId: number;
}

export interface AppointmentClientDto extends AppointmentBaseDto {
  clientId: number;
  business: {
    id: number;
    name: string;
    email: string;
    profession?: string;
  };
}

export interface AppointmentBusinessDto extends AppointmentBaseDto {
  businessId: number;
  client: {
    id: number;
    name: string;
    email: string;
  };
}
