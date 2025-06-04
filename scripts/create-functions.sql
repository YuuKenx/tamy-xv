-- Función para verificar credenciales de login
CREATE OR REPLACE FUNCTION verify_login_credentials(
  input_username TEXT,
  input_password TEXT
)
RETURNS TABLE (
  user_id UUID,
  guest_id UUID,
  full_name TEXT,
  guest_type TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id AS user_id,
    g.id AS guest_id,
    g.full_name,
    g.guest_type
  FROM 
    rsvp_confirmations rc
    JOIN invited_guests g ON rc.guest_id = g.id
    JOIN users u ON rc.user_id = u.id
  WHERE 
    u.username = input_username
    AND u.password = crypt(input_password, u.password);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para crear confirmación RSVP
CREATE OR REPLACE FUNCTION create_rsvp_confirmation(
  guest_email TEXT,
  guest_name TEXT,
  guests_count INTEGER,
  message TEXT
)
RETURNS JSON AS $$
DECLARE
  v_guest_id UUID;
  v_user_id UUID;
  v_username TEXT;
  v_password TEXT;
  v_success BOOLEAN := TRUE;
  v_message_text TEXT := 'Confirmación exitosa';
BEGIN
  -- Verificar si el invitado ya existe por email
  SELECT id INTO v_guest_id FROM invited_guests WHERE email = guest_email;
  
  IF v_guest_id IS NULL THEN
    -- Si no existe, crear nuevo invitado
    INSERT INTO invited_guests (full_name, email, max_guests, guest_type)
    VALUES (guest_name, guest_email, guests_count, 'standard')
    RETURNING id INTO v_guest_id;
  ELSE
    -- Si ya existe, verificar si ya tiene confirmación
    IF EXISTS (SELECT 1 FROM rsvp_confirmations WHERE guest_id = v_guest_id) THEN
      v_success := FALSE;
      v_message_text := 'Ya has confirmado tu asistencia anteriormente';
      RETURN json_build_object(
        'success', v_success,
        'message_text', v_message_text
      );
    END IF;
  END IF;
  
  -- Generar credenciales
  v_username := lower(regexp_replace(guest_name, '[^a-zA-Z0-9]', '', 'g')) || substring(md5(random()::text) from 1 for 4);
  v_password := substring(md5(random()::text) from 1 for 8);
  
  -- Crear usuario
  INSERT INTO users (username, password, email, name)
  VALUES (v_username, crypt(v_password, gen_salt('bf')), guest_email, guest_name)
  RETURNING id INTO v_user_id;
  
  -- Crear confirmación
  INSERT INTO rsvp_confirmations (guest_id, user_id, guests_count, message)
  VALUES (v_guest_id, v_user_id, guests_count, message);
  
  RETURN json_build_object(
    'success', v_success,
    'message_text', 'Gracias por confirmar tu asistencia. Guarda tus credenciales para acceder a la galería después del evento.',
    'username', v_username,
    'password', v_password
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para verificar si la galería está habilitada
CREATE OR REPLACE FUNCTION is_gallery_enabled()
RETURNS BOOLEAN AS $$
DECLARE
  v_gallery_enabled BOOLEAN;
  v_unlock_date TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Verificar si está habilitada manualmente
  SELECT setting_value::BOOLEAN INTO v_gallery_enabled
  FROM system_settings
  WHERE setting_key = 'gallery_enabled';
  
  IF v_gallery_enabled THEN
    RETURN TRUE;
  END IF;
  
  -- Verificar si debe habilitarse por fecha
  SELECT setting_value::TIMESTAMP WITH TIME ZONE INTO v_unlock_date
  FROM system_settings
  WHERE setting_key = 'gallery_unlock_date';
  
  IF v_unlock_date IS NOT NULL AND CURRENT_TIMESTAMP >= v_unlock_date THEN
    RETURN TRUE;
  END IF;
  
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
