// Localized versions of the vendor-issued discount notes in src/data/affiliates.ts.
// Codes and percentages are copied verbatim; unknown notes fall back to the generic c.codeNote template.
import type { Lang } from './index';

const NOTES: Record<string, Partial<Record<Lang, string>>> = {
  '10% OFF at checkout': { de: '10 % Rabatt an der Kasse', es: '10 % de descuento al pagar', fr: '10 % de remise au paiement', it: '10% di sconto al checkout' },
  '15% OFF EU catalog': { de: '15 % Rabatt auf den EU-Katalog', es: '15 % de descuento en el catálogo UE', fr: '15 % de remise sur le catalogue UE', it: '15% di sconto sul catalogo UE' },
  '10% OFF all vials': { de: '10 % Rabatt auf alle Vials', es: '10 % de descuento en todos los viales', fr: '10 % de remise sur tous les flacons', it: '10% di sconto su tutte le fiale' },
  '20% OFF at checkout': { de: '20 % Rabatt an der Kasse', es: '20 % de descuento al pagar', fr: '20 % de remise au paiement', it: '20% di sconto al checkout' },
  '15% OFF eligible items': { de: '15 % Rabatt auf berechtigte Artikel', es: '15 % de descuento en artículos elegibles', fr: '15 % de remise sur les articles éligibles', it: '15% di sconto sugli articoli idonei' },
  '10% OFF EU orders': { de: '10 % Rabatt auf EU-Bestellungen', es: '10 % de descuento en pedidos UE', fr: '10 % de remise sur les commandes UE', it: '10% di sconto sugli ordini UE' },
  '10% OFF EU/DE orders': { de: '10 % Rabatt auf Bestellungen aus der EU/DE', es: '10 % de descuento en pedidos UE/DE', fr: '10 % de remise sur les commandes UE/DE', it: '10% di sconto sugli ordini UE/DE' },
  '15% OFF (excl. sale items) · new customers: LABINDEXWELCOME30 = 30% OFF first order': {
    de: '15 % Rabatt (ohne Angebotsartikel) · Neukunden: LABINDEXWELCOME30 = 30 % Rabatt auf die erste Bestellung',
    es: '15 % de descuento (sin artículos en oferta) · clientes nuevos: LABINDEXWELCOME30 = 30 % de descuento en el primer pedido',
    fr: '15 % de remise (hors articles en promotion) · nouveaux clients : LABINDEXWELCOME30 = 30 % de remise sur la première commande',
    it: '15% di sconto (esclusi articoli in offerta) · nuovi clienti: LABINDEXWELCOME30 = 30% di sconto sul primo ordine',
  },
  '15% OFF at checkout': { de: '15 % Rabatt an der Kasse', es: '15 % de descuento al pagar', fr: '15 % de remise au paiement', it: '15% di sconto al checkout' },
  '10% OFF first order (new customers)': { de: '10 % Rabatt auf die erste Bestellung (Neukunden)', es: '10 % de descuento en el primer pedido (clientes nuevos)', fr: '10 % de remise sur la première commande (nouveaux clients)', it: '10% di sconto sul primo ordine (nuovi clienti)' },
  '20% OFF non-sale items': { de: '20 % Rabatt auf Artikel ohne Angebotspreis', es: '20 % de descuento en artículos sin oferta', fr: '20 % de remise sur les articles hors promotion', it: '20% di sconto sugli articoli non in offerta' },
  '20% OFF research catalog': { de: '20 % Rabatt auf den Forschungskatalog', es: '20 % de descuento en el catálogo de investigación', fr: '20 % de remise sur le catalogue de recherche', it: '20% di sconto sul catalogo di ricerca' },
  '25% OFF catalog': { de: '25 % Rabatt auf den Katalog', es: '25 % de descuento en el catálogo', fr: '25 % de remise sur le catalogue', it: '25% di sconto sul catalogo' },
};

export function discountNote(lang: Lang, note: string | undefined): string | undefined {
  if (!note) return undefined;
  if (lang === 'en') return note;
  return NOTES[note]?.[lang];
}
