import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const VITE_PUBLIC_SHEET_URL = process.env.VITE_PUBLIC_SHEET_URL;

  try {
    const response = await fetch(VITE_PUBLIC_SHEET_URL!);
    
    if (!response.ok) {
        console.error(`Erro na resposta do Google Sheets: ${response.status} ${response.statusText}`);
        return res.status(response.status).json({ error: 'Erro ao buscar dados na fonte' });
    }

    const csvData = await response.text();
    res.status(200).send(csvData);
  } catch (error) {
    // SOLUÇÃO DO SONAR
    console.error("Falha técnica ao buscar dados do CSV:", error);
    
    res.status(500).json({ 
        error: 'Erro interno ao buscar dados',
        message: process.env.NODE_ENV === 'development' ? String(error) : undefined 
    });
  }
}