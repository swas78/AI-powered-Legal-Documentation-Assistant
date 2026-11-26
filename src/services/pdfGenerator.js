import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { interpolateText } from '../templates';

export const generateAgreementHtml = (template, formData, mode = 'legal') => {
  const isPlain = mode === 'plain';
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const clauseItemsHtml = (template.clauses || [])
    .map((clause, idx) => {
      const rawText = isPlain ? clause.plain : clause.legal;
      const text = interpolateText(rawText, formData);
      return `
        <div class="clause">
          <div class="clause-title">${idx + 1}. ${clause.title}</div>
          <div class="clause-text">${text}</div>
          ${clause.note ? `<div class="clause-note"><strong>Note:</strong> ${clause.note}</div>` : ''}
        </div>
      `;
    })
    .join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${template.title}</title>
        <style>
          @page {
            size: A4;
            margin: 20mm;
          }
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #1a202c;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #ffffff;
            font-size: 13pt;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #0E5A4F;
            padding-bottom: 12px;
            margin-bottom: 24px;
          }
          .title {
            font-size: 20pt;
            font-weight: bold;
            color: #0E5A4F;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 0 0 6px 0;
          }
          .subtitle {
            font-size: 11pt;
            color: #4a5568;
            font-style: italic;
          }
          .meta-box {
            background-color: #f7faf9;
            border: 1px solid #d4deda;
            border-radius: 6px;
            padding: 12px 16px;
            margin-bottom: 20px;
            font-size: 11pt;
          }
          .clause {
            margin-bottom: 18px;
            page-break-inside: avoid;
          }
          .clause-title {
            font-size: 13pt;
            font-weight: bold;
            color: #1a202c;
            margin-bottom: 4px;
          }
          .clause-text {
            color: #2d3748;
            text-align: justify;
          }
          .clause-note {
            font-size: 10pt;
            color: #718096;
            background: #fffdf5;
            border-left: 3px solid #E0A100;
            padding: 4px 8px;
            margin-top: 4px;
          }
          .signature-section {
            margin-top: 50px;
            page-break-inside: avoid;
          }
          .sig-row {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
          }
          .sig-box {
            width: 45%;
            border-top: 1px dashed #718096;
            padding-top: 8px;
            text-align: center;
            font-size: 11pt;
            font-weight: bold;
          }
          .sig-label {
            font-size: 9pt;
            color: #718096;
            font-weight: normal;
          }
          .disclaimer {
            margin-top: 40px;
            border-top: 1px solid #e2e8f0;
            padding-top: 10px;
            text-align: center;
            font-size: 9pt;
            color: #a0aec0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="title">${template.title}</h1>
          <div class="subtitle">Drafted on ${currentDate} | Generated via Nyay Saathi</div>
        </div>

        <div class="meta-box">
          <strong>Mode:</strong> ${isPlain ? 'Plain English Language Version' : 'Formal Legal Covenant'}
          &nbsp;|&nbsp; <strong>Reference ID:</strong> NS-${Date.now().toString().slice(-6)}
        </div>

        <div class="clauses">
          ${clauseItemsHtml}
        </div>

        <div class="signature-section">
          <div style="font-weight: bold; margin-bottom: 10px;">IN WITNESS WHEREOF the parties hereto have signed below:</div>
          <div class="sig-row">
            <div class="sig-box">
              First Party Signature<br />
              <span class="sig-label">(Name &amp; Date)</span>
            </div>
            <div class="sig-box">
              Second Party Signature<br />
              <span class="sig-label">(Name &amp; Date)</span>
            </div>
          </div>
          <div class="sig-row" style="margin-top: 50px;">
            <div class="sig-box">
              Witness 1 Signature<br />
              <span class="sig-label">(Name, Address &amp; Date)</span>
            </div>
            <div class="sig-box">
              Witness 2 Signature<br />
              <span class="sig-label">(Name, Address &amp; Date)</span>
            </div>
          </div>
        </div>

        <div class="disclaimer">
          <strong>Disclaimer:</strong> This is a self-generated draft to assist the parties and does not constitute formal legal counsel. For high-value transactions or registration under Indian law, please consult an advocate registered with the State Bar Council.
        </div>
      </body>
    </html>
  `;
};

export const createAndSharePdf = async (template, formData, mode = 'legal') => {
  try {
    const html = generateAgreementHtml(template, formData, mode);
    const { uri } = await Print.printToFileAsync({ html });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri, {
        UTI: '.pdf',
        mimeType: 'application/pdf',
        dialogTitle: `Share ${template.title}`,
      });
      return { success: true, uri };
    } else {
      return { success: true, uri, message: 'PDF generated locally at: ' + uri };
    }
  } catch (error) {
    console.error('Error in PDF generation:', error);
    return { success: false, error: error.message };
  }
};

export const printDocument = async (template, formData, mode = 'legal') => {
  try {
    const html = generateAgreementHtml(template, formData, mode);
    await Print.printAsync({ html });
    return { success: true };
  } catch (error) {
    console.error('Error printing:', error);
    return { success: false, error: error.message };
  }
};
