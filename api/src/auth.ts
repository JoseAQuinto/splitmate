const { supabaseAdmin } = require('./supabase');

/**
 * Middleware para validar el token de Supabase en las rutas protegidas.
 */
async function requireUser(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'missing token' });

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data?.user) return res.status(401).json({ error: 'invalid token' });

  req.user = data.user;
  next();
}

module.exports = { requireUser };
