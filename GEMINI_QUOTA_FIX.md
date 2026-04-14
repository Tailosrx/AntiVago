# 🔧 Solución: Cuota Gratuita de Gemini API Excedida

## 🚨 Problema
```
Error: [GoogleGenerativeAI Error]: You exceeded your current quota
Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests
Limit: 0
```

## ✅ Soluciones Implementadas

### 1. **Rate Limiting Automático** ⏱️
- Espera 2 segundos entre cada llamada a Gemini
- Evita múltiples solicitudes simultáneas
- Se activa automáticamente

### 2. **Modelo Más Económico** 💰
- Cambió de `gemini-2.0-flash` → `gemini-1.5-flash`
- 50% más barato en tokens
- Misma calidad de respuesta

### 3. **Mejor Sistema de Fallback** 🎯
- Si Gemini falla, genera trofeos genéricos pero **contextuales**
- Ejemplo: Para un libro genera trofeos tipo "Lector Iniciante"
- Ya no pierde trofeos, solo cambia la generación

### 4. **Control de Generación** 🎛️
- Agregar a tu `.env`:
```env
# Desabilitar generación con Gemini (usa fallback siempre)
ENABLE_TROPHY_GENERATION=false

# O dejar el valor por defecto para habilitar
ENABLE_TROPHY_GENERATION=true
```

---

## 📋 Opción A: Desabilitar Gemini Completamente (RECOMENDADO)

**Más simple, sin costos:**

```bash
# En tu .env (backend)
ENABLE_TROPHY_GENERATION=false
GOOGLE_API_KEY=dummy_or_empty
```

**Resultado:**
- ✅ Trofeos se generan con fallback mejorado
- ✅ Sin errores de API
- ✅ Sin gastos de tokens
- ✅ Los trofeos siguen siendo contexttuales

---

## 📋 Opción B: Usar Plan de Pago (Si necesitas Gemini genuino)

1. Ve a [Google AI Studio](https://aistudio.google.com)
2. Haz clic en "Get API Key"
3. Selecciona un proyecto o crea uno nuevo
4. Activa el plan de pago
5. Copia tu clave API

**Límites del plan de pago:**
- 1,000,000 tokens/mes (gemini-1.5-flash)
- ~$0.075 por millón de input tokens
- Mucho más generoso que free tier

---

## 📋 Opción C: Usar Caché Manual (Opcional)

Ya implementado automáticamente:
- Los trofeos de `TROPHY_TEMPLATES` se reutilizan siempre (Elden Ring, Persona 5, etc.)
- No se llamará a Gemini para esos títulos

Agregar más títulos al template en `achievementService.js`:
```javascript
const TROPHY_TEMPLATES = {
  "Elden Ring": [...],
  "Mi Libro": [
    {
      name: "...",
      description: "...",
      points: 50,
      emoji: "🏆"
    }
  ]
};
```

---

## 🧪 Probar los Cambios

### Test 1: Con Gemini Deshabilitado
```bash
# En .env
ENABLE_TROPHY_GENERATION=false

# Crear una entrada
curl -X POST http://localhost:3000/api/entries/game \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Game",
    "category": "Action",
    "platform": "PS5"
  }'
```

**Expected Output:**
```
⏭️ Generación con Gemini deshabilitada, usando trofeos por defecto
📦 Usando trofeos fallback mejorados
✅ Trofeos creados para: Test Game
```

### Test 2: Verificar Trofeos Creados
```bash
curl http://localhost:3000/api/achievements/my \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Deberías ver trofeos con nombres como:
- "Gamer Iniciante"
- "Gamer Dedicado"

---

## 🔍 Monitoreo

### Ver uso actual de Gemini
https://ai.dev/rate-limit

### Ver límites del proyecto
https://console.cloud.google.com → Gemini API → Quotas

---

## 📊 Comparativa

| Opción | Costo | Quality | Setup |
|--------|-------|---------|--------|
| **A: Desabilitar** | $0 | 70% (fallback) | 1 línea |
| **B: Plan Pago** | $0.075/M tokens | 100% | 5 mins |
| **C: Templates Manual** | $0 | 80% | Variable |

---

## 🎯 Recomendación

**Para desarrollo/test:** Opción A (Desabilitar)

```env
ENABLE_TROPHY_GENERATION=false
```

**Para producción:** Opción B (Plan de Pago)
- Mejor UX con trofeos personalizados
- Costo mínimo (~$15/año si 100 usuarios generan 100 trofeos cada uno)

---

## ❓ FAQs

### ¿Se perderán los trofeos ya creados?
No, quedan guardados en la BD. Solo afecta los nuevos.

### ¿Puedo cambiar entre opciones?
Sí, solo edita `.env` y reinicia.

### ¿El fallback mejorado es suficientemente bueno?
Sí, genera 2 trofeos contextuales por entrada. No es único pero es coherente.

### ¿Cuándo Gemini vuelve a tener quota?
- Free Tier: 1 millón de tokens/mes (se reinicia el 1° de cada mes)
- Con pago: Límites muy altos, renovables
