DROP FUNCTION IF EXISTS FCM_FormatTimestamp(ts timestamp without time zone, tz text DEFAULT 'UTC');
CREATE OR REPLACE FUNCTION FCM_FormatTimestamp(ts timestamp without time zone, tz text DEFAULT 'UTC')
RETURNS text AS $$
DECLARE output text;
BEGIN
  output := to_char(ts::timestamp with time zone AT TIME ZONE tz, 'YYYY-MM-dd HH24:MI:SS')
RETURN output;
END;
$$
LANGUAGE 'plpgsql' STABLE STRICT;

DROP FUNCTION IF EXISTS FCM_FormatTimestamp(ts timestamp with time zone, tz text DEFAULT 'UTC');
CREATE OR REPLACE FUNCTION FCM_FormatTimestamp(ts timestamp with time zone, tz text DEFAULT 'UTC')
RETURNS text AS $$
BEGIN
  return FCM_FormatTimestamp(ts::timestamp without time zone, tz);
RETURN output;
END;
$$
LANGUAGE 'plpgsql' STABLE STRICT;
