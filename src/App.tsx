/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Camera,
  Film,
  Sparkles,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Menu,
  ExternalLink,
  Clock,
  SlidersHorizontal,
} from 'lucide-react';
import {
  STUDIO_CONTACT,
  IMAGES,
  PORTFOLIO_ITEMS,
  SERVICES_LIST,
  SERVICE_AREAS,
  PACKAGE_TIERS,
  WHY_CHOOSE_PILLARS,
  PortfolioItem,
} from './data/studioData';

type PortfolioFilter = 'All Works' | PortfolioItem['category'];

const PORTFOLIO_CATEGORIES: PortfolioFilter[] = [
  'All Works',
  'Muhurtham & Traditional',
  'Candid Moments',
  'Pre-Wedding',
  'Engagement & Portraits',
];

const CUSTOMIZABLE_EVENTS = [
  'Engagement / Nichayathartham',
  'Wedding Reception',
  'Muhurtham Ceremony',
  'Candid Photography',
  'Cinematic Wedding Film',
  'Pre-Wedding Outdoor Shoot',
];

function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EFE8DC] via-[#E6DEC8] to-[#D9CCB4] text-[#4A433B] p-6 text-center transition-transform duration-700 ease-out will-change-transform ${className}`}
        role="img"
        aria-label={alt}
      >
        <Camera className="w-8 h-8 text-[#9E7840] mb-2 opacity-80" />
        <span className="font-serif-display text-lg italic text-[#1C1A17]">
          {fallbackTitle || 'Sri Anjana Photography'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={`transition-transform duration-700 ease-out will-change-transform ${className}`}
    />
  );
}

export default function App() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Portfolio state
  const [selectedCategory, setSelectedCategory] = useState<PortfolioFilter>('All Works');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Service Area active tab
  const [activeCityId, setActiveCityId] = useState<string>('theni');

  // Package Customizer state
  const [selectedPackage, setSelectedPackage] = useState<string>('Signature Collection');
  const [selectedCustomEvents, setSelectedCustomEvents] = useState<string[]>([
    'Wedding Reception',
    'Muhurtham Ceremony',
    'Candid Photography',
    'Cinematic Wedding Film',
  ]);

  // Enquiry Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    weddingDate: '',
    eventLocation: 'Theni',
    serviceRequirement: 'Wedding Photography & Cinematic Film (Signature Collection)',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const contactSectionRef = useRef<HTMLElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const filteredPortfolio =
    selectedCategory === 'All Works'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === selectedCategory);

  const activeCity =
    SERVICE_AREAS.find((area) => area.id === activeCityId) || SERVICE_AREAS[0];

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredPortfolio.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredPortfolio.length) % filteredPortfolio.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredPortfolio.length]);

  const scrollToEnquiry = (prefillService?: string, prefillCity?: string) => {
    if (prefillService) {
      setFormData((prev) => ({
        ...prev,
        serviceRequirement: prefillService,
      }));
    }
    if (prefillCity) {
      setFormData((prev) => ({
        ...prev,
        eventLocation: prefillCity,
      }));
    }
    setMobileMenuOpen(false);
    contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 600);
  };

  const toggleCustomEvent = (eventLabel: string) => {
    setSelectedCustomEvents((prev) =>
      prev.includes(eventLabel)
        ? prev.filter((item) => item !== eventLabel)
        : [...prev, eventLabel]
    );
  };

  const buildWhatsAppUrl = (customText: string) => {
    return `${STUDIO_CONTACT.whatsappBaseUrl}?text=${encodeURIComponent(customText)}`;
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your name so we know how to address you.';
    }
    const cleanedPhone = formData.phone.replace(/[^\d+]/g, '');
    if (!cleanedPhone || cleanedPhone.length < 10) {
      errors.phone = 'Please enter a valid 10-digit mobile or WhatsApp number.';
    }
    if (!formData.weddingDate.trim()) {
      errors.weddingDate = 'Please select or enter your tentative wedding/event date.';
    }
    if (!formData.eventLocation.trim()) {
      errors.eventLocation = 'Please specify the city or venue location.';
    }
    if (!formData.serviceRequirement.trim()) {
      errors.serviceRequirement = 'Please select the photography services you require.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormSubmitted(true);
  };

  const getEnquiryWhatsAppUrl = () => {
    const messageLines = [
      `Vanakkam Sri Anjana Photography,`,
      `I would like to enquire about wedding/event coverage:`,
      ``,
      `• Name: ${formData.fullName}`,
      `• Phone: ${formData.phone}`,
      `• Event Date: ${formData.weddingDate}`,
      `• Event Location: ${formData.eventLocation}`,
      `• Services Requested: ${formData.serviceRequirement}`,
      formData.notes.trim() ? `• Additional Details: ${formData.notes.trim()}` : '',
    ].filter(Boolean);

    return buildWhatsAppUrl(messageLines.join('\n'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1A17]">
      {/* TOP BAR CONTRACT: Strictly 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E5DEC9]">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            className="font-[Georgia] text-2xl md:text-[28px] font-semibold tracking-tight text-[#1C1A17] whitespace-nowrap shrink-0"
          >
            Sri Anjana Photography
          </a>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#575047]"
          >
            <a
              href="#about"
              className="hover:text-[#1C1A17] underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0"
            >
              About
            </a>
            <a
              href="#services"
              className="hover:text-[#1C1A17] underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#portfolio"
              className="hover:text-[#1C1A17] underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0"
            >
              Portfolio
            </a>
            <a
              href="#service-areas"
              className="hover:text-[#1C1A17] underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0"
            >
              Service Areas
            </a>
            <a
              href="#packages"
              className="hover:text-[#1C1A17] underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0"
            >
              Packages
            </a>
          </nav>

          {/* Zone 3: 1 primary action (plus mobile menu trigger on <lg) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollToEnquiry()}
              className="px-5 py-2.5 text-xs md:text-sm font-medium text-[#FAF7F2] bg-[#1C1A17] hover:bg-[#332E28] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E7840]"
            >
              Book Your Date
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2.5 rounded-lg border border-[#DED5C4] text-[#1C1A17] hover:bg-[#F2ECE1] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E5DEC9] bg-[#FAF7F2] px-6 py-5 space-y-4">
            <nav className="flex flex-col space-y-3 text-base font-medium text-[#2E2A25]">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#9E7840] transition-colors"
              >
                About Our Studio
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#9E7840] transition-colors"
              >
                Photography & Film Services
              </a>
              <a
                href="#portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#9E7840] transition-colors"
              >
                Selected Portfolio
              </a>
              <a
                href="#service-areas"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#9E7840] transition-colors"
              >
                Theni, Madurai, Coimbatore & Chennai
              </a>
              <a
                href="#packages"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#9E7840] transition-colors"
              >
                Collections & Custom Quotes
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 hover:text-[#9E7840] transition-colors"
              >
                Contact & Enquiry
              </a>
            </nav>
            <div className="pt-3 border-t border-[#E5DEC9] flex flex-wrap gap-3">
              <a
                href={`tel:${STUDIO_CONTACT.phoneRaw}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium border border-[#CFC4B0] rounded-lg text-[#1C1A17] hover:bg-[#F2ECE1] whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#9E7840]" />
                {STUDIO_CONTACT.phoneDisplay}
              </a>
              <a
                href={buildWhatsAppUrl(
                  'Vanakkam Sri Anjana Photography, I would like to check availability for our upcoming wedding.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#9E7840] text-white rounded-lg hover:bg-[#876533] whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* 1. HOME / HERO SECTION */}
        <section id="home" className="relative pt-6 pb-16 md:py-16 lg:py-20 border-b border-[#E5DEC9]">
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Column: Editorial Hierarchy */}
              <div className="lg:col-span-5 flex flex-col justify-between py-2">
                <div className="space-y-6">
                  {/* Unboxed clean metadata kicker (Zero-Pill Discipline) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs tracking-wider uppercase text-[#7A6F61]">
                    <span>Theni, Tamil Nadu</span>
                    <span aria-hidden="true">·</span>
                    <span>Wedding Photography & Videography</span>
                  </div>

                  <h1
                    className="font-serif-display text-4xl sm:text-5xl lg:text-[58px] font-semibold leading-[1.08] tracking-tight text-[#1C1A17]"
                    style={{ textWrap: 'balance' }}
                  >
                    Timeless Frames of Sacred Beginnings & Unscripted Joy.
                  </h1>

                  <p className="text-base md:text-lg leading-relaxed text-[#4A433B] max-w-[60ch]">
                    At <strong className="font-semibold text-[#1C1A17]">Sri Anjana Photography</strong>, we
                    preserve the grace, emotion, and cultural richness of South Indian weddings. Based in{' '}
                    <span className="text-[#1C1A17] font-medium">Theni</span> and commissioned by families
                    across <span className="text-[#1C1A17] font-medium">Madurai</span>,{' '}
                    <span className="text-[#1C1A17] font-medium">Coimbatore</span>, and{' '}
                    <span className="text-[#1C1A17] font-medium">Chennai</span>, we turn fleeting wedding
                    moments into heirlooms your family will hold dear for generations.
                  </p>
                </div>

                {/* Primary & Secondary CTAs */}
                <div className="pt-8 space-y-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => scrollToEnquiry()}
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-medium text-[#FAF7F2] bg-[#1C1A17] hover:bg-[#332E28] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-[#D6B179]" />
                      Book Your Date
                    </button>

                    <a
                      href={buildWhatsAppUrl(
                        'Vanakkam Sri Anjana Photography! We are planning our wedding and would love to check your date availability and collections.'
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-medium text-[#1C1A17] bg-[#EFE8DC] hover:bg-[#E4DAC8] border border-[#D8CEBC] rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      <MessageCircle className="w-4 h-4 text-[#876533]" />
                      WhatsApp Us
                    </a>
                  </div>

                  {/* Direct Phone & Coverage Note */}
                  <div className="pt-4 border-t border-[#E5DEC9] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#6B6257]">
                    <a
                      href={`tel:${STUDIO_CONTACT.phoneRaw}`}
                      className="inline-flex items-center gap-1.5 font-medium text-[#1C1A17] hover:text-[#9E7840] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#9E7840]" />
                      <span className="font-mono-tabular">{STUDIO_CONTACT.phoneDisplay}</span>
                    </a>
                    <span aria-hidden="true">·</span>
                    <span>Available across Theni, Madurai, Coimbatore & Chennai</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Full-height Cinematic Hero Frame */}
              <div className="lg:col-span-7 relative">
                <div className="group relative h-[420px] sm:h-[520px] lg:h-full min-h-[460px] rounded-2xl overflow-hidden border border-[#E2D9C8] bg-[#EAE2D3]">
                  <ResilientImage
                    src={IMAGES.heroCouple}
                    alt="Wedding Photographer in Theni - South Indian Tamil bride and groom in traditional Kanchipuram silk saree and veshti in a heritage courtyard"
                    fallbackTitle="Sri Anjana Photography — Theni"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 hover:scale-105"
                  />
                  {/* Measured Contrast Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

                  {/* Editorial Caption Overlay inside Hero Image */}
                  <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-[#FAF7F2]">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#E5C99B] mb-1">
                        Featured Muhurtham Portrait · Theni, Tamil Nadu
                      </p>
                      <p className="font-serif-display text-2xl sm:text-3xl italic">
                        “Where sacred traditions meet honest, unhurried storytelling.”
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(0)}
                      className="self-start sm:self-end inline-flex items-center gap-1.5 text-xs font-medium text-[#FAF7F2] hover:text-[#E5C99B] underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      View Full Frame
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width Key Studio Highlights Row Below Split (Spatial Math Compliance) */}
            <div className="mt-12 pt-8 border-t border-[#E5DEC9] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#7A6F61] mb-1">Primary Studio Base</p>
                <p className="font-serif-display text-2xl font-semibold text-[#1C1A17]">
                  Theni, Tamil Nadu
                </p>
                <p className="text-xs text-[#5E554B] mt-1">
                  Personal consultations & local wedding expertise
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#7A6F61] mb-1">Regional Coverage</p>
                <p className="font-serif-display text-2xl font-semibold text-[#1C1A17]">
                  Madurai · Coimbatore · Chennai
                </p>
                <p className="text-xs text-[#5E554B] mt-1">
                  Dedicated travel teams across Tamil Nadu
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#7A6F61] mb-1">Visual Craft</p>
                <p className="font-serif-display text-2xl font-semibold text-[#1C1A17]">
                  Candid, Traditional & Film
                </p>
                <p className="text-xs text-[#5E554B] mt-1">
                  Editorial portraiture paired with ritual accuracy
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#7A6F61] mb-1">Direct Booking Line</p>
                <p className="font-serif-display text-2xl font-semibold text-[#1C1A17] font-mono-tabular">
                  {STUDIO_CONTACT.phoneDisplay}
                </p>
                <p className="text-xs text-[#5E554B] mt-1">
                  Prompt WhatsApp & telephone consultations
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ABOUT SECTION */}
        <section id="about" className="py-20 lg:py-28 border-b border-[#E5DEC9]">
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Editorial Image Composition */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-[#E2D9C8] bg-[#EFE8DC]">
                  <ResilientImage
                    src={IMAGES.candidBride}
                    alt="Candid bridal portrait showing genuine laughter and traditional Kanchipuram silk saree details"
                    fallbackTitle="Authentic Bridal Storytelling"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="p-6 bg-[#F4EFE6] border-t border-[#E5DEC9]">
                    <div className="flex items-center justify-between text-xs text-[#6B6257] mb-2">
                      <span>Our Philosophy</span>
                      <span>·</span>
                      <span>Natural Light & Honest Emotion</span>
                    </div>
                    <p className="font-serif-display text-xl italic text-[#1C1A17]">
                      Every wedding is a confluence of two families, sacred promises, and once-in-a-lifetime
                      emotions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Narrative Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#876533]">
                  <span>About Sri Anjana Photography</span>
                  <span aria-hidden="true">·</span>
                  <span>Theni, Tamil Nadu</span>
                </div>

                <h2
                  className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1C1A17] leading-[1.15]"
                  style={{ textWrap: 'balance' }}
                >
                  Passionate About Capturing Authentic Emotions & Timeless Wedding Memories.
                </h2>

                <div className="space-y-4 text-base leading-relaxed text-[#4A433B] max-w-[68ch]">
                  <p>
                    Founded in <strong className="font-medium text-[#1C1A17]">Theni, Tamil Nadu</strong>, Sri
                    Anjana Photography was built on a simple conviction: wedding photographs should feel just
                    as alive decades from now as the moment they were taken. Beyond the grandeur of silk,
                    flowers, and mandapam decor lies the true soul of a wedding—the quiet pride in a parent’s
                    eyes, the joyful chaos of cousins, and the unspoken warmth between bride and groom.
                  </p>
                  <p>
                    Whether you are searching for a trusted{' '}
                    <strong className="font-medium text-[#1C1A17]">wedding photographer in Theni</strong>,
                    planning a heritage celebration with{' '}
                    <strong className="font-medium text-[#1C1A17]">wedding photography in Madurai</strong>,
                    hosting a contemporary reception with a{' '}
                    <strong className="font-medium text-[#1C1A17]">
                      wedding photographer in Coimbatore
                    </strong>
                    , or celebrating by the coast with{' '}
                    <strong className="font-medium text-[#1C1A17]">wedding photography in Chennai</strong>,
                    our approach remains personal, calm, and deeply observant.
                  </p>
                  <p>
                    We combine the unobtrusive grace of{' '}
                    <strong className="font-medium text-[#1C1A17]">
                      candid wedding photography in Tamil Nadu
                    </strong>{' '}
                    with a thorough understanding of traditional South Indian rituals—ensuring that both the
                    artistic frames and the sacred family blessings are documented with equal care.
                  </p>
                </div>

                <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[#E5DEC9]">
                  <div>
                    <h3 className="font-serif-display text-xl font-semibold text-[#1C1A17]">
                      Emotion First
                    </h3>
                    <p className="text-sm text-[#5E554B] mt-1">
                      Unscripted laughter, tears of joy, and genuine family warmth without stiff direction.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-serif-display text-xl font-semibold text-[#1C1A17]">
                      Cultural Reverence
                    </h3>
                    <p className="text-sm text-[#5E554B] mt-1">
                      Attentive anticipation of every sacred Muhurtham, Nichayathartham, and family custom.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-serif-display text-xl font-semibold text-[#1C1A17]">
                      Timeless Color
                    </h3>
                    <p className="text-sm text-[#5E554B] mt-1">
                      True-to-life skin tones, luminous golds, and rich crimson silks that never go out of
                      style.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SERVICES SECTION */}
        <section id="services" className="py-20 lg:py-28 bg-[#F4EFE6] border-b border-[#E5DEC9]">
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#876533]">
                  <span>Our Craft & Offerings</span>
                  <span aria-hidden="true">·</span>
                  <span>Core Specializations & Suggested Services</span>
                </div>
                <h2
                  className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1C1A17]"
                  style={{ textWrap: 'balance' }}
                >
                  Bespoke Photography & Cinematic Storytelling
                </h2>
              </div>
              <p className="text-sm md:text-base text-[#4A433B] max-w-[54ch]">
                Our primary specialization is wedding photography and videography. Extended portrait sessions
                such as pre-wedding, engagement, maternity, and baby photography are presented below as
                suggested services available upon custom enquiry.
              </p>
            </div>

            {/* 8 Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES_LIST.map((service) => {
                const isCore = service.status === 'Core Studio Specialization';
                return (
                  <article
                    key={service.id}
                    className="flex flex-col justify-between rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <div>
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE2D3]">
                        <ResilientImage
                          src={service.image}
                          alt={service.alt}
                          fallbackTitle={service.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>

                      <div className="p-6 space-y-3">
                        {/* Clean unboxed metadata kicker (No pills!) */}
                        <div className="flex items-center justify-between text-xs text-[#7A6F61]">
                          <span className="font-mono-tabular font-medium text-[#9E7840]">
                            {service.index}.
                          </span>
                          <span>{service.status}</span>
                        </div>

                        <h3 className="font-serif-display text-2xl font-semibold text-[#1C1A17]">
                          {service.title}
                        </h3>

                        <p className="text-sm text-[#4A433B] leading-relaxed">
                          {service.shortDescription}
                        </p>

                        <ul className="pt-2 space-y-2 border-t border-[#EAE2D3] text-xs text-[#5E554B]">
                          {service.highlights.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#9E7840] select-none">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-3 border-t border-[#EAE2D3] flex items-center justify-between gap-2">
                      <span className="text-[11px] text-[#7A6F61] truncate">
                        {isCore ? 'Verified Core Service' : 'Suggested · Enquire'}
                      </span>
                      <button
                        type="button"
                        onClick={() => scrollToEnquiry(service.title)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#1C1A17] hover:text-[#9E7840] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Enquire Now
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. PORTFOLIO SECTION */}
        <section id="portfolio" className="py-20 lg:py-28 border-b border-[#E5DEC9]">
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#876533]">
                  <span>Curated Monograph</span>
                  <span aria-hidden="true">·</span>
                  <span>Interactive Lightbox Gallery</span>
                </div>
                <h2
                  className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1C1A17]"
                  style={{ textWrap: 'balance' }}
                >
                  Selected Wedding & Portrait Stories
                </h2>
              </div>

              {/* Interactive Filter Controls (Functional Buttons Allowed per Design Constitution) */}
              <div
                role="tablist"
                aria-label="Filter portfolio by category"
                className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EFE8DC] rounded-xl border border-[#DFD5C3]"
              >
                {PORTFOLIO_CATEGORIES.map((category) => {
                  const active = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => {
                        setSelectedCategory(category);
                        setLightboxIndex(null);
                      }}
                      className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#1C1A17] text-[#FAF7F2] shadow-xs'
                          : 'text-[#4A433B] hover:text-[#1C1A17] hover:bg-[#FAF7F2]/60'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Editorial Masonry / Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
              {filteredPortfolio.map((item, index) => {
                const colSpanClass =
                  selectedCategory === 'All Works'
                    ? item.aspect === 'wide'
                      ? 'lg:col-span-8'
                      : 'lg:col-span-4'
                    : 'lg:col-span-6';

                return (
                  <div
                    key={item.id}
                    className={`${colSpanClass} group relative rounded-2xl overflow-hidden border border-[#E2D9C8] bg-[#EFE8DC] flex flex-col`}
                  >
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      className="relative w-full h-[340px] sm:h-[400px] overflow-hidden text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#9E7840]"
                      aria-label={`Open ${item.title} in full-screen lightbox`}
                    >
                      <ResilientImage
                        src={item.image}
                        alt={item.alt}
                        fallbackTitle={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Measured Contrast Scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                      <div className="absolute bottom-0 inset-x-0 p-6 text-[#FAF7F2]">
                        {/* Unboxed clean metadata */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#E5C99B] mb-1.5">
                          <span>{item.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{item.location}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular text-[11px] opacity-90">
                            {item.exif}
                          </span>
                        </div>
                        <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#EAE2D3] mt-1 line-clamp-2">
                          {item.story}
                        </p>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. WHY CHOOSE US SECTION */}
        <section className="py-20 lg:py-28 bg-[#F4EFE6] border-b border-[#E5DEC9]">
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="max-w-3xl mb-14 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#876533]">
                <span>Why Couples & Families Trust Us</span>
                <span aria-hidden="true">·</span>
                <span>Our Studio Commitments</span>
              </div>
              <h2
                className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1C1A17]"
                style={{ textWrap: 'balance' }}
              >
                Thoughtful Artistry Rooted in Trust, Patience & Care
              </h2>
              <p className="text-base text-[#4A433B]">
                Your wedding day cannot be rehearsed. We focus on preparation, calm communication, and
                artistic integrity so you and your family can immerse yourselves fully in every celebration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {WHY_CHOOSE_PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  className="p-7 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8] flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-3">
                    <span className="font-mono-tabular text-xs font-semibold text-[#9E7840]">
                      {pillar.number}.
                    </span>
                    <h3 className="font-serif-display text-2xl font-semibold text-[#1C1A17]">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#4A433B] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#EAE2D3] text-xs text-[#7A6F61]">
                    Sri Anjana Studio Standard
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. SERVICE AREAS SECTION (Local SEO Optimized for Theni, Madurai, Coimbatore, Chennai) */}
        <section id="service-areas" className="py-20 lg:py-28 border-b border-[#E5DEC9]">
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#876533]">
                  <span>Regional Coverage Across Tamil Nadu</span>
                  <span aria-hidden="true">·</span>
                  <span>Home Base & Destination Corridors</span>
                </div>
                <h2
                  className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1C1A17]"
                  style={{ textWrap: 'balance' }}
                >
                  Serving Theni, Madurai, Coimbatore & Chennai
                </h2>
              </div>

              {/* Interactive City Selector Tabs */}
              <div
                role="tablist"
                aria-label="Select service city"
                className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EFE8DC] rounded-xl border border-[#DFD5C3]"
              >
                {SERVICE_AREAS.map((area) => {
                  const isSelected = area.id === activeCityId;
                  return (
                    <button
                      key={area.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveCityId(area.id)}
                      className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-[#1C1A17] text-[#FAF7F2]'
                          : 'text-[#4A433B] hover:text-[#1C1A17] hover:bg-[#FAF7F2]/60'
                      }`}
                    >
                      {area.city}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active City Spotlight + All 4 SEO Summary Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-[#F4EFE6] border border-[#E2D9C8] flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#7A6F61]">
                    <span className="font-semibold text-[#9E7840]">{activeCity.city}, Tamil Nadu</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular">{activeCity.coordinates}</span>
                  </div>

                  <h3 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#1C1A17]">
                    {activeCity.seoHeadline}
                  </h3>

                  <p className="font-serif-display text-xl italic text-[#5E554B]">
                    {activeCity.tagline}
                  </p>

                  <p className="text-sm sm:text-base text-[#4A433B] leading-relaxed">
                    {activeCity.description}
                  </p>

                  <div className="pt-4 space-y-2.5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6257]">
                      Coverage Highlights in {activeCity.city}:
                    </p>
                    <ul className="space-y-2 text-sm text-[#3D3730]">
                      {activeCity.signatureSettings.map((setting, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#9E7840] shrink-0 mt-0.5" />
                          <span>{setting}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#DFD5C3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-xs text-[#6B6257]">{activeCity.bookingNote}</span>
                  <button
                    type="button"
                    onClick={() =>
                      scrollToEnquiry(
                        `Wedding Photography & Film Coverage in ${activeCity.city}`,
                        activeCity.city
                      )
                    }
                    className="px-5 py-2.5 text-xs sm:text-sm font-medium bg-[#1C1A17] text-[#FAF7F2] hover:bg-[#332E28] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Book {activeCity.city} Coverage
                  </button>
                </div>
              </div>

              {/* Right Column: Overview of All 4 Regional Corridors for Direct SEO Crawlability & Quick Selection */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {SERVICE_AREAS.map((area) => {
                  const isCurrent = area.id === activeCityId;
                  return (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => setActiveCityId(area.id)}
                      className={`text-left p-5 rounded-xl border transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[#1C1A17] text-[#FAF7F2] border-[#1C1A17]'
                          : 'bg-[#FAF7F2] text-[#1C1A17] border-[#E2D9C8] hover:bg-[#F2ECE1]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-serif-display text-xl font-semibold">
                          {area.seoHeadline}
                        </h4>
                        <span
                          className={`text-xs font-mono-tabular ${
                            isCurrent ? 'text-[#E5C99B]' : 'text-[#876533]'
                          }`}
                        >
                          {area.city}
                        </span>
                      </div>
                      <p
                        className={`text-xs leading-relaxed line-clamp-2 ${
                          isCurrent ? 'text-[#DED5C4]' : 'text-[#5E554B]'
                        }`}
                      >
                        {area.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 7. PRICING & QUOTATIONS SECTION (Enquiry-Based, Zero Fabricated Prices) */}
        <section id="packages" className="py-20 lg:py-28 bg-[#F4EFE6] border-b border-[#E5DEC9]">
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="max-w-3xl mb-14 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#876533]">
                <span>Pricing & Custom Quotations</span>
                <span aria-hidden="true">·</span>
                <span>Enquiry-Based Bespoke Collections</span>
              </div>
              <h2
                className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1C1A17]"
                style={{ textWrap: 'balance' }}
              >
                Tailored Wedding Collections Built Around Your Celebration
              </h2>
              <p className="text-base text-[#4A433B]">
                Because every South Indian wedding differs in rituals, number of events, guest count, and
                venue travel, we provide personalized quotations rather than fixed off-the-shelf pricing.
                Explore our three foundational tiers below and request a custom quote.
              </p>
            </div>

            {/* 3 Package Cards: Essential, Signature, Premium */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {PACKAGE_TIERS.map((tier) => {
                const isFeatured = Boolean(tier.featured);
                return (
                  <div
                    key={tier.id}
                    className={`rounded-2xl p-8 flex flex-col justify-between border ${
                      isFeatured
                        ? 'bg-[#1C1A17] text-[#FAF7F2] border-[#1C1A17]'
                        : 'bg-[#FAF7F2] text-[#1C1A17] border-[#E2D9C8]'
                    }`}
                  >
                    <div className="space-y-5">
                      <div className="flex items-center justify-between text-xs">
                        <span className={isFeatured ? 'text-[#E5C99B]' : 'text-[#876533]'}>
                          {tier.kicker}
                        </span>
                        <span>Enquiry-Based</span>
                      </div>

                      <div>
                        <h3 className="font-serif-display text-3xl font-semibold">{tier.name}</h3>
                        <p
                          className={`text-xs mt-1 ${
                            isFeatured ? 'text-[#D6CEC0]' : 'text-[#6B6257]'
                          }`}
                        >
                          {tier.idealFor}
                        </p>
                      </div>

                      <p
                        className={`text-sm leading-relaxed ${
                          isFeatured ? 'text-[#EAE2D3]' : 'text-[#4A433B]'
                        }`}
                      >
                        {tier.description}
                      </p>

                      <div
                        className={`pt-5 border-t space-y-3 ${
                          isFeatured ? 'border-[#332E28]' : 'border-[#EAE2D3]'
                        }`}
                      >
                        <p
                          className={`text-xs uppercase tracking-wider font-medium ${
                            isFeatured ? 'text-[#E5C99B]' : 'text-[#7A6F61]'
                          }`}
                        >
                          Collection Deliverables:
                        </p>
                        <ul className="space-y-2.5 text-sm">
                          {tier.includedFeatures.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <Check
                                className={`w-4 h-4 shrink-0 mt-0.5 ${
                                  isFeatured ? 'text-[#E5C99B]' : 'text-[#9E7840]'
                                }`}
                              />
                              <span className={isFeatured ? 'text-[#F4EFE6]' : 'text-[#3D3730]'}>
                                {feat}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div
                      className={`mt-8 pt-6 border-t space-y-4 ${
                        isFeatured ? 'border-[#332E28]' : 'border-[#EAE2D3]'
                      }`}
                    >
                      <p
                        className={`text-xs italic ${
                          isFeatured ? 'text-[#CFC4B0]' : 'text-[#6B6257]'
                        }`}
                      >
                        {tier.customizableNote}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPackage(tier.name);
                            scrollToEnquiry(`${tier.name} — Custom Quote Request`);
                          }}
                          className={`flex-1 py-3 px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                            isFeatured
                              ? 'bg-[#C59B5F] text-[#1C1A17] hover:bg-[#D4AE75]'
                              : 'bg-[#1C1A17] text-[#FAF7F2] hover:bg-[#332E28]'
                          }`}
                        >
                          Request a Quote
                        </button>
                        <a
                          href={buildWhatsAppUrl(
                            `Vanakkam Sri Anjana Photography, I would like to request a custom quotation for the ${tier.name}.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-lg text-xs sm:text-sm font-medium border transition-colors whitespace-nowrap ${
                            isFeatured
                              ? 'border-[#4A433B] text-[#FAF7F2] hover:bg-[#2C2823]'
                              : 'border-[#D8CEBC] text-[#1C1A17] hover:bg-[#EFE8DC]'
                          }`}
                        >
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Custom Quote Builder Bar */}
            <div className="mt-12 p-8 rounded-2xl bg-[#FAF7F2] border border-[#E2D9C8]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#876533]">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Interactive Coverage Customizer</span>
                  </div>
                  <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#1C1A17]">
                    Select the Events You Want Included in Your Custom Quote
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {CUSTOMIZABLE_EVENTS.map((eventItem) => {
                      const active = selectedCustomEvents.includes(eventItem);
                      return (
                        <button
                          key={eventItem}
                          type="button"
                          onClick={() => toggleCustomEvent(eventItem)}
                          className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap cursor-pointer ${
                            active
                              ? 'bg-[#1C1A17] text-[#FAF7F2] border-[#1C1A17]'
                              : 'bg-[#F4EFE6] text-[#4A433B] border-[#DFD5C3] hover:border-[#9E7840]'
                          }`}
                        >
                          {active ? '✓ ' : '+ '}
                          {eventItem}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      scrollToEnquiry(
                        `${selectedPackage}: ${
                          selectedCustomEvents.length > 0
                            ? selectedCustomEvents.join(', ')
                            : 'Custom Event Coverage'
                        }`
                      )
                    }
                    className="w-full py-3.5 px-5 rounded-lg bg-[#1C1A17] text-[#FAF7F2] hover:bg-[#332E28] text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Apply to Enquiry Form ({selectedCustomEvents.length} selected)
                  </button>
                  <a
                    href={buildWhatsAppUrl(
                      `Vanakkam Sri Anjana Photography, I would like a custom quote for: ${selectedCustomEvents.join(
                        ', '
                      )}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-lg border border-[#D8CEBC] bg-[#EFE8DC] hover:bg-[#E4DAC8] text-[#1C1A17] text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 text-[#876533]" />
                    Send Custom List via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. CONTACT & ENQUIRY SECTION */}
        <section
          id="contact"
          ref={contactSectionRef}
          className="py-20 lg:py-28 bg-[#FAF7F2]"
        >
          <div className="max-w-[1360px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Direct Contact, Location, Interactive Map & Social Placeholders */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#876533]">
                    <span>Reserve Your Celebration Dates</span>
                    <span aria-hidden="true">·</span>
                    <span>Theni Studio</span>
                  </div>
                  <h2
                    className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1C1A17]"
                    style={{ textWrap: 'balance' }}
                  >
                    Let’s Begin Planning Your Wedding Story
                  </h2>
                  <p className="text-sm sm:text-base text-[#4A433B] leading-relaxed">
                    Auspicious Muhurtham dates fill quickly across Tamil Nadu. Reach out via WhatsApp, phone
                    call, or our enquiry form to check date availability and receive a tailored collection
                    guide.
                  </p>
                </div>

                {/* Clickable Phone & WhatsApp Action Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href={`tel:${STUDIO_CONTACT.phoneRaw}`}
                    className="p-5 rounded-xl bg-[#F4EFE6] border border-[#E2D9C8] hover:border-[#9E7840] transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase tracking-wider text-[#7A6F61]">
                        Direct Call
                      </span>
                      <Phone className="w-4 h-4 text-[#9E7840]" />
                    </div>
                    <p className="font-mono-tabular text-base font-semibold text-[#1C1A17] group-hover:text-[#9E7840] transition-colors">
                      {STUDIO_CONTACT.phoneDisplay}
                    </p>
                    <p className="text-xs text-[#6B6257] mt-1">Click to call our studio</p>
                  </a>

                  <a
                    href={buildWhatsAppUrl(
                      'Vanakkam Sri Anjana Photography, I would like to enquire about booking our wedding dates.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 rounded-xl bg-[#F4EFE6] border border-[#E2D9C8] hover:border-[#9E7840] transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase tracking-wider text-[#7A6F61]">
                        WhatsApp Chat
                      </span>
                      <MessageCircle className="w-4 h-4 text-[#9E7840]" />
                    </div>
                    <p className="font-mono-tabular text-base font-semibold text-[#1C1A17] group-hover:text-[#9E7840] transition-colors">
                      {STUDIO_CONTACT.phoneDisplay}
                    </p>
                    <p className="text-xs text-[#6B6257] mt-1">Instant WhatsApp consultation</p>
                  </a>
                </div>

                {/* Theni Location & Map Integration */}
                <div className="rounded-2xl overflow-hidden border border-[#E2D9C8] bg-[#F4EFE6]">
                  <div className="p-5 border-b border-[#E2D9C8] flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-[#876533]">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Studio Base Location</span>
                      </div>
                      <h3 className="font-serif-display text-xl font-semibold text-[#1C1A17] mt-0.5">
                        Theni, Tamil Nadu, India
                      </h3>
                      <p className="text-xs text-[#5E554B]">
                        Serving Theni, Madurai, Coimbatore & Chennai
                      </p>
                    </div>
                    <a
                      href={STUDIO_CONTACT.googleMapsSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-[#1C1A17] text-[#FAF7F2] hover:bg-[#332E28] transition-colors whitespace-nowrap shrink-0"
                    >
                      Open in Google Maps
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Interactive Map Embed for Theni, Tamil Nadu */}
                  <div className="relative h-56 w-full bg-[#EAE2D3]">
                    <iframe
                      title="Sri Anjana Photography - Theni, Tamil Nadu Map"
                      src="https://www.openstreetmap.org/export/embed.html?bbox=77.4200%2C9.9700%2C77.5300%2C10.0500&layer=mapnik&marker=10.0104%2C77.4768"
                      className="w-full h-full border-0"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Clearly Identified Social Media Placeholders (No Fabricated URLs) */}
                <div className="p-5 rounded-xl bg-[#F4EFE6] border border-[#E2D9C8] space-y-2">
                  <p className="text-xs uppercase tracking-wider text-[#7A6F61]">
                    Social Media Channels (Official Links Placeholder)
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#4A433B]">
                    <span>Instagram: @srianjanaphotography (Placeholder)</span>
                    <span aria-hidden="true">·</span>
                    <span>YouTube Showreel (Placeholder)</span>
                    <span aria-hidden="true">·</span>
                    <span>Facebook Page (Placeholder)</span>
                  </div>
                  <p className="text-[11px] text-[#7A6F61]">
                    Request our latest full wedding album links directly on WhatsApp at{' '}
                    <span className="font-mono-tabular">{STUDIO_CONTACT.phoneDisplay}</span>.
                  </p>
                </div>
              </div>

              {/* Right Column: Validated Functional Enquiry Form */}
              <div className="lg:col-span-7">
                <div className="p-8 sm:p-10 rounded-2xl bg-[#F4EFE6] border border-[#E2D9C8]">
                  <div className="mb-8 space-y-2">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#876533]">
                      <span>Wedding & Event Enquiry Form</span>
                      <span aria-hidden="true">·</span>
                      <span>Direct Studio Response</span>
                    </div>
                    <h3 className="font-serif-display text-3xl font-semibold text-[#1C1A17]">
                      Check Availability & Request a Custom Quote
                    </h3>
                  </div>

                  {formSubmitted ? (
                    <div className="p-8 rounded-xl bg-[#FAF7F2] border border-[#C59B5F] space-y-6">
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-wider text-[#876533] font-semibold">
                          Enquiry Prepared Successfully
                        </p>
                        <h4 className="font-serif-display text-3xl font-semibold text-[#1C1A17]">
                          Thank You, {formData.fullName}!
                        </h4>
                        <p className="text-sm text-[#4A433B] leading-relaxed">
                          Your celebration details for{' '}
                          <strong className="text-[#1C1A17]">{formData.weddingDate}</strong> in{' '}
                          <strong className="text-[#1C1A17]">{formData.eventLocation}</strong> are ready.
                          Click the button below to send your enquiry directly to our WhatsApp desk for the
                          fastest response, or call us at{' '}
                          <span className="font-mono-tabular font-medium">
                            {STUDIO_CONTACT.phoneDisplay}
                          </span>
                          .
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-[#F4EFE6] border border-[#E2D9C8] text-xs space-y-1.5 text-[#3D3730]">
                        <div>
                          <span className="text-[#7A6F61]">Name:</span> {formData.fullName}
                        </div>
                        <div>
                          <span className="text-[#7A6F61]">Phone:</span>{' '}
                          <span className="font-mono-tabular">{formData.phone}</span>
                        </div>
                        <div>
                          <span className="text-[#7A6F61]">Event Date:</span>{' '}
                          <span className="font-mono-tabular">{formData.weddingDate}</span>
                        </div>
                        <div>
                          <span className="text-[#7A6F61]">Location:</span> {formData.eventLocation}
                        </div>
                        <div>
                          <span className="text-[#7A6F61]">Service Requirement:</span>{' '}
                          {formData.serviceRequirement}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        <a
                          href={getEnquiryWhatsAppUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#1C1A17] text-[#FAF7F2] hover:bg-[#332E28] text-sm font-medium transition-colors"
                        >
                          <MessageCircle className="w-4 h-4 text-[#E5C99B]" />
                          Send Enquiry on WhatsApp Now
                        </a>
                        <button
                          type="button"
                          onClick={() => setFormSubmitted(false)}
                          className="px-4 py-3 text-xs font-medium text-[#5E554B] hover:text-[#1C1A17] underline cursor-pointer"
                        >
                          Edit Enquiry Details
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} noValidate className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                          <label
                            htmlFor="fullName"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#3D3730] mb-2"
                          >
                            Your Full Name <span className="text-[#9E7840]">*</span>
                          </label>
                          <input
                            ref={nameInputRef}
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            placeholder="e.g., Karthik & Ananya"
                            value={formData.fullName}
                            onChange={(e) => {
                              setFormData({ ...formData, fullName: e.target.value });
                              if (formErrors.fullName) {
                                setFormErrors({ ...formErrors, fullName: '' });
                              }
                            }}
                            className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#D8CEBC] text-sm text-[#1C1A17] placeholder:text-[#9A9083] focus:outline-none focus:border-[#1C1A17]"
                          />
                          {formErrors.fullName && (
                            <p className="mt-1.5 text-xs text-[#B91C1C]" role="alert">
                              {formErrors.fullName}
                            </p>
                          )}
                        </div>

                        {/* Phone Number */}
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#3D3730] mb-2"
                          >
                            Phone / WhatsApp Number <span className="text-[#9E7840]">*</span>
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            placeholder="e.g., +91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => {
                              setFormData({ ...formData, phone: e.target.value });
                              if (formErrors.phone) {
                                setFormErrors({ ...formErrors, phone: '' });
                              }
                            }}
                            className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#D8CEBC] text-sm text-[#1C1A17] font-mono-tabular placeholder:text-[#9A9083] focus:outline-none focus:border-[#1C1A17]"
                          />
                          {formErrors.phone && (
                            <p className="mt-1.5 text-xs text-[#B91C1C]" role="alert">
                              {formErrors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Wedding / Event Date */}
                        <div>
                          <label
                            htmlFor="weddingDate"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#3D3730] mb-2"
                          >
                            Wedding / Event Date <span className="text-[#9E7840]">*</span>
                          </label>
                          <input
                            id="weddingDate"
                            name="weddingDate"
                            type="date"
                            required
                            value={formData.weddingDate}
                            onChange={(e) => {
                              setFormData({ ...formData, weddingDate: e.target.value });
                              if (formErrors.weddingDate) {
                                setFormErrors({ ...formErrors, weddingDate: '' });
                              }
                            }}
                            className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#D8CEBC] text-sm text-[#1C1A17] font-mono-tabular focus:outline-none focus:border-[#1C1A17]"
                          />
                          {formErrors.weddingDate && (
                            <p className="mt-1.5 text-xs text-[#B91C1C]" role="alert">
                              {formErrors.weddingDate}
                            </p>
                          )}
                        </div>

                        {/* Event Location */}
                        <div>
                          <label
                            htmlFor="eventLocation"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#3D3730] mb-2"
                          >
                            Event City / Venue Location <span className="text-[#9E7840]">*</span>
                          </label>
                          <select
                            id="eventLocation"
                            name="eventLocation"
                            value={formData.eventLocation}
                            onChange={(e) => {
                              setFormData({ ...formData, eventLocation: e.target.value });
                              if (formErrors.eventLocation) {
                                setFormErrors({ ...formErrors, eventLocation: '' });
                              }
                            }}
                            className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#D8CEBC] text-sm text-[#1C1A17] focus:outline-none focus:border-[#1C1A17]"
                          >
                            <option value="Theni">Theni (Theni District / Surrounding Towns)</option>
                            <option value="Madurai">Madurai</option>
                            <option value="Coimbatore">Coimbatore</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Other Tamil Nadu Location">
                              Other Location in Tamil Nadu
                            </option>
                          </select>
                          {formErrors.eventLocation && (
                            <p className="mt-1.5 text-xs text-[#B91C1C]" role="alert">
                              {formErrors.eventLocation}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Service Requirements */}
                      <div>
                        <label
                          htmlFor="serviceRequirement"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#3D3730] mb-2"
                        >
                          Service & Collection Requirements <span className="text-[#9E7840]">*</span>
                        </label>
                        <input
                          id="serviceRequirement"
                          name="serviceRequirement"
                          type="text"
                          required
                          value={formData.serviceRequirement}
                          onChange={(e) => {
                            setFormData({ ...formData, serviceRequirement: e.target.value });
                            if (formErrors.serviceRequirement) {
                              setFormErrors({ ...formErrors, serviceRequirement: '' });
                            }
                          }}
                          className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#D8CEBC] text-sm text-[#1C1A17] focus:outline-none focus:border-[#1C1A17]"
                        />
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {[
                            'Signature Collection (Candid + Traditional + Film)',
                            'Essential Collection',
                            'Premium Heirloom Collection',
                            'Candid Wedding Photography',
                            'Pre-Wedding + Wedding Coverage',
                          ].map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() =>
                                setFormData({ ...formData, serviceRequirement: preset })
                              }
                              className="text-[11px] px-2.5 py-1 rounded bg-[#EFE8DC] hover:bg-[#E4DAC8] text-[#4A433B] transition-colors cursor-pointer"
                            >
                              {preset}
                            </button>
                          ))}
                        </div>
                        {formErrors.serviceRequirement && (
                          <p className="mt-1.5 text-xs text-[#B91C1C]" role="alert">
                            {formErrors.serviceRequirement}
                          </p>
                        )}
                      </div>

                      {/* Notes */}
                      <div>
                        <label
                          htmlFor="notes"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#3D3730] mb-2"
                        >
                          Venue Name, Muhurtham Timing or Additional Details (Optional)
                        </label>
                        <textarea
                          id="notes"
                          name="notes"
                          rows={3}
                          placeholder="Tell us about your events (e.g., Reception evening + morning Muhurtham, approximate guest count, or specific traditions)..."
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#D8CEBC] text-sm text-[#1C1A17] placeholder:text-[#9A9083] focus:outline-none focus:border-[#1C1A17]"
                        />
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <button
                          type="submit"
                          className="px-7 py-3.5 rounded-lg bg-[#1C1A17] text-[#FAF7F2] hover:bg-[#332E28] text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                        >
                          Prepare Enquiry & Request Quote
                        </button>
                        <p className="text-xs text-[#6B6257]">
                          Or message directly on{' '}
                          <a
                            href={STUDIO_CONTACT.whatsappBaseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline font-medium text-[#1C1A17] hover:text-[#9E7840]"
                          >
                            WhatsApp ({STUDIO_CONTACT.phoneDisplay})
                          </a>
                        </p>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && filteredPortfolio[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={filteredPortfolio[lightboxIndex].title}
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8"
        >
          {/* Top Bar inside Lightbox */}
          <div className="flex items-center justify-between gap-4 text-[#FAF7F2]">
            <div className="flex items-center gap-2 text-xs text-[#D6CEC0]">
              <span className="font-mono-tabular">
                {String(lightboxIndex + 1).padStart(2, '0')} /{' '}
                {String(filteredPortfolio.length).padStart(2, '0')}
              </span>
              <span>·</span>
              <span>{filteredPortfolio[lightboxIndex].category}</span>
              <span>·</span>
              <span>{filteredPortfolio[lightboxIndex].location}</span>
            </div>
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close lightbox"
              className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Image & Prev/Next Controls */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              type="button"
              onClick={() =>
                setLightboxIndex(
                  (lightboxIndex - 1 + filteredPortfolio.length) % filteredPortfolio.length
                )
              }
              aria-label="Previous photograph"
              className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/15 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <ResilientImage
              src={filteredPortfolio[lightboxIndex].image}
              alt={filteredPortfolio[lightboxIndex].alt}
              fallbackTitle={filteredPortfolio[lightboxIndex].title}
              className="max-h-[70vh] max-w-full object-contain rounded-lg"
            />

            <button
              type="button"
              onClick={() => setLightboxIndex((lightboxIndex + 1) % filteredPortfolio.length)}
              aria-label="Next photograph"
              className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/15 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Caption & CTA */}
          <div className="max-w-4xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 border-t border-white/15 text-[#FAF7F2]">
            <div>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold">
                {filteredPortfolio[lightboxIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-[#D6CEC0] mt-1">
                {filteredPortfolio[lightboxIndex].story}
              </p>
              <p className="font-mono-tabular text-[11px] text-[#E5C99B] mt-1.5">
                {filteredPortfolio[lightboxIndex].exif}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const chosenCategory = filteredPortfolio[lightboxIndex].category;
                setLightboxIndex(null);
                scrollToEnquiry(`${chosenCategory} Coverage`);
              }}
              className="self-start sm:self-end px-5 py-2.5 rounded-lg bg-[#C59B5F] text-[#1C1A17] hover:bg-[#D4AE75] text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
            >
              Enquire for Similar Coverage
            </button>
          </div>
        </div>
      )}

      {/* FOOTER (Clean, Quiet, Zero Fake Telemetry) */}
      <footer className="bg-[#1C1A17] text-[#EAE2D3] py-16 border-t border-[#332E28]">
        <div className="max-w-[1360px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#332E28]">
            <div className="lg:col-span-5 space-y-4">
              <p className="font-serif-display text-3xl font-semibold text-[#FAF7F2]">
                Sri Anjana Photography
              </p>
              <p className="text-sm text-[#BFB5A6] max-w-[44ch] leading-relaxed">
                Luxury wedding photography, candid wedding storytelling, and cinematic wedding films based
                in Theni, Tamil Nadu—serving couples and families across Theni, Madurai, Coimbatore, and
                Chennai.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#D6B179]">
                <span>Wedding Photographer in Theni</span>
                <span>·</span>
                <span>Madurai</span>
                <span>·</span>
                <span>Coimbatore</span>
                <span>·</span>
                <span>Chennai</span>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-3">
              <p className="text-xs uppercase tracking-wider text-[#D6B179] font-semibold">
                Navigation
              </p>
              <ul className="space-y-2 text-sm text-[#D6CEC0]">
                <li>
                  <a href="#home" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="hover:text-white transition-colors">
                    Portfolio Gallery
                  </a>
                </li>
                <li>
                  <a href="#service-areas" className="hover:text-white transition-colors">
                    Service Areas
                  </a>
                </li>
                <li>
                  <a href="#packages" className="hover:text-white transition-colors">
                    Packages & Custom Quotes
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <p className="text-xs uppercase tracking-wider text-[#D6B179] font-semibold">
                Studio Contact & Bookings
              </p>
              <p className="text-sm text-[#D6CEC0]">
                Theni, Tamil Nadu, India
              </p>
              <p className="text-sm">
                <a
                  href={`tel:${STUDIO_CONTACT.phoneRaw}`}
                  className="font-mono-tabular text-[#FAF7F2] hover:text-[#D6B179] transition-colors"
                >
                  Phone: {STUDIO_CONTACT.phoneDisplay}
                </a>
              </p>
              <p className="text-sm">
                <a
                  href={STUDIO_CONTACT.whatsappBaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FAF7F2] hover:text-[#D6B179] underline underline-offset-4 transition-colors"
                >
                  WhatsApp: {STUDIO_CONTACT.phoneDisplay}
                </a>
              </p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#9A9083]">
            <p>© {new Date().getFullYear()} Sri Anjana Photography, Theni, Tamil Nadu. All rights reserved.</p>
            <p>Crafted for timeless South Indian weddings across Tamil Nadu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
