/**
 * Formatea el código HTML para que tenga una indentación adecuada y mejor presentación
 */
export const formatHtml = (html) => {
  // Reemplazar espacios por espacios no rompibles en atributos
  let processedHtml = html.replace(/(="[^"]*")/g, (match) => {
    return match.replace(/ /g, '\u00A0');
  });
  
  // Dividir el HTML en líneas
  const lines = processedHtml.replace(/>\s*</g, ">\n<").split("\n");
  let indentLevel = 0;
  
  return lines
    .map((line) => {
      // Reducir la indentación para etiquetas de cierre
      if (/^\s*<\/\w/.test(line)) indentLevel--;
      
      // Aplicar indentación con espacios
      // Usamos 2 espacios por nivel para mantener el código compacto
      const formattedLine = "  ".repeat(Math.max(0, indentLevel)) + line.trim();
      
      // Aumentar la indentación para etiquetas de apertura que no sean auto-cerradas
      if (/^\s*<\w[^>]*[^/]>.*$/.test(line)) indentLevel++;
      
      return formattedLine;
    })
    .join("\n");
};

/**
 * Formatea el código CSS para que tenga una indentación adecuada y mejor presentación
 */
export const formatCss = (css) => {
  // Eliminar espacios y saltos de línea innecesarios
  const compactCss = css.replace(/\s+/g, ' ').trim();
  
  // Dividir por reglas (bloques entre llaves)
  return compactCss
    .split(/(?<=})/g)
    .map(block => {
      if (!block.trim()) return '';
      
      // Separar selector y contenido
      const parts = block.split('{');
      if (parts.length < 2) return block;
      
      const selector = parts[0].trim();
      const content = parts[1].replace('}', '').trim();
      
      // Formatear propiedades
      const properties = content
        .split(';')
        .filter(prop => prop.trim())
        .map(prop => `  ${prop.trim()};`)
        .join('\n');
      
      // Reconstruir el bloque con formato
      return `${selector} {\n${properties}\n}`;
    })
    .filter(block => block.length > 0)
    .join('\n\n');
};

/**
 * Extrae las reglas CSS que coinciden con un selector específico
 */
export const getCssRules = (selector) => {
  const rules = [];
  
  try {
    for (const styleSheet of document.styleSheets) {
      try {
        for (const rule of styleSheet.cssRules) {
          if (rule.type !== CSSRule.STYLE_RULE) continue;
          
          const selectors = rule.selectorText.split(",").map(s => s.trim());
          
          if (selectors.some(
            s => s === selector || 
                 s.startsWith(selector + "::") || 
                 s.startsWith(selector + ":")
          )) {
            rules.push(rule.cssText);
          }
        }
      } catch (error) {
        // Ignorar hojas de estilo que no se pueden acceder por CORS
        console.warn('No se puede acceder a una hoja de estilos', error);
      }
    }
  } catch (error) {
    console.error('Error al obtener reglas CSS', error);
  }
  
  return rules.join("\n");
}; 