-- Habilitar extensión pgcrypto para encriptación de contraseñas
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Tabla de invitados
CREATE TABLE IF NOT EXISTS invited_guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  max_guests INTEGER DEFAULT 1,
  guest_type TEXT DEFAULT 'standard',
  table_number INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP WITH TIME ZONE
);

-- Tabla de confirmaciones RSVP
CREATE TABLE IF NOT EXISTS rsvp_confirmations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_id UUID NOT NULL REFERENCES invited_guests(id),
  user_id UUID NOT NULL REFERENCES users(id),
  guests_count INTEGER DEFAULT 1,
  message TEXT,
  confirmed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de fotos
CREATE TABLE IF NOT EXISTS photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  caption TEXT,
  status TEXT DEFAULT 'pending',
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES users(id)
);

-- Tabla de configuraciones del sistema
CREATE TABLE IF NOT EXISTS system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_by UUID REFERENCES users(id)
);

-- Tabla de registros de actividad
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insertar configuraciones iniciales
INSERT INTO system_settings (setting_key, setting_value, description)
VALUES
  ('gallery_enabled', 'false', 'Habilitar galería manualmente'),
  ('gallery_unlock_date', '2025-08-10 00:00:00+00', 'Fecha automática para habilitar galería (día después del evento)'),
  ('event_date', '2025-08-09', 'Fecha del evento de XV años'),
  ('max_photo_size_mb', '10', 'Tamaño máximo de foto en MB'),
  ('max_photos_per_user', '50', 'Máximo de fotos por usuario'),
  ('site_maintenance', 'false', 'Modo de mantenimiento del sitio'),
  ('welcome_message', 'Este acceso solo estará disponible hasta el 10 de agosto, muchas gracias por tu confirmación. Nos veremos pronto', 'Mensaje de bienvenida antes del evento')
ON CONFLICT (setting_key) DO NOTHING;

-- Insertar usuario administrador
INSERT INTO users (username, password, email, name)
VALUES ('admin', crypt('admin123', gen_salt('bf')), 'admin@example.com', 'Administrador')
ON CONFLICT (username) DO NOTHING;

-- Insertar invitado administrador
INSERT INTO invited_guests (full_name, email, max_guests, guest_type, table_number, notes)
VALUES ('Administrador', 'admin@example.com', 10, 'admin', 1, 'Usuario administrador del sistema')
ON CONFLICT (email) DO NOTHING;
