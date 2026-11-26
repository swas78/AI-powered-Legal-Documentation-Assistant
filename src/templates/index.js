import rent from './rent.json';
import nda from './nda.json';
import freelance from './freelance.json';

export const templates = [rent, nda, freelance];

export const getTemplateById = (id) => {
  return templates.find((t) => t.id === id) || rent;
};

export const evaluateWarnings = (template, formData) => {
  if (!template || !template.warnings) return [];
  const activeWarnings = [];

  for (const warning of template.warnings) {
    try {
      // Safe evaluation of simple comparison expressions
      const rentAmount = Number(formData.rentAmount || 0);
      const depositAmount = Number(formData.depositAmount || 0);
      const durationMonths = Number(formData.durationMonths || 0);
      const durationYears = Number(formData.durationYears || 0);
      const paymentTerms = String(formData.paymentTerms || '');

      let triggered = false;

      if (warning.id === 'registration_check' && durationMonths > 11) {
        triggered = true;
      } else if (warning.id === 'high_deposit' && depositAmount > rentAmount * 3 && rentAmount > 0) {
        triggered = true;
      } else if (warning.id === 'long_nda' && durationYears > 5) {
        triggered = true;
      } else if (warning.id === 'advance_payment_check' && paymentTerms.length > 0 && !paymentTerms.toLowerCase().includes('advance')) {
        triggered = true;
      }

      if (triggered) {
        activeWarnings.push(warning);
      }
    } catch {
      // Graceful fallback
    }
  }

  return activeWarnings;
};

export const interpolateText = (templateText, formData) => {
  if (!templateText) return '';
  return templateText.replace(/\{(\w+)\}/g, (match, key) => {
    return formData[key] !== undefined && formData[key] !== '' ? formData[key] : `[ ${key} ]`;
  });
};
