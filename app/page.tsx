// @ts-nocheck
"use client";
import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  ArrowRight, 
  Info, 
  Star, 
  ChevronDown,
  Calendar,
  Hash
} from 'lucide-react';

// ------------------------------------------------------------------------------------------
// CONSTANTS & DATA
// ------------------------------------------------------------------------------------------

const LOGO_URL = "https://i.imgur.com/8pb2amZ.jpg"; 

const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/25974685/ug64l7b/"; 
const agentPhoneNumber = "17862957184"; 
const whatsappMessage = encodeURIComponent("Hi Alex, I'm interested in 6899 Collins Ave, Unit LPH04. Is it still available?");
const whatsappUrl = `https://wa.me/${agentPhoneNumber}?text=${whatsappMessage}`;

const property = {
  address: "4701 Meridian Ave, Unit UPH21",
  city: "Miami Beach, FL 33140",
  price: "$85,000 / Month",
  beds: 2,
  baths: 3,
  sqft: "4,230",
  building: "The Ritz-Carlton Residences Miami Beach",
  tagline: "SkyHouse: The Crown Jewel",
  description: "SkyHouse, the crown jewel of The Ritz-Carlton Residences Miami Beach, rises above the water with 300°+ unobstructed views and nearly 9,000 SF of refined indoor/outdoor living. A newly enclosed modular great room transforms the former open terrace into an all-season sanctuary, with glass walls that glide open to welcome the ocean breeze. Designed by award-winning CEU Studio, this Bali-inspired residence features custom heirloom furnishings, a Salvatori Signature bathroom, and a Boffi kitchen with Gaggenau appliances. Residents enjoy a dedicated butler, private boat slip, and world-class Ritz-Carlton amenities.",
};

const propertySpecs = [
  {
    category: "General Information",
    items: [
      { label: "Subdivision", value: "The Ritz-Carlton Resi" },
      { label: "Style", value: "Condo/Co-Op/Annual" },
      { label: "Waterfront", value: "Yes" },
      { label: "Waterfront Description", value: "Bay Front, Canal Front, Ocean Access" },
      { label: "View", value: "Bay, Canal, Golf View, Intracoastal View, Skyline" },
      { label: "Furnished", value: "Furnished" },
      { label: "Area", value: "32" },
      { label: "Num Stories", value: "10" },
      { label: "Sq Ft Liv Area", value: "4,230" },
      { label: "Year Built", value: "2022" }
    ]
  }
];

const reviews = [
  "It was a pleasure to work with Alex. He is personable, knowledgeable, and knew just how to list the property to get the best price. Following his advice, we had multiple offers within days of listing. Alex negotiated well and I am very pleased with the result. He is very easy to work with and I would not hesitate to use his services again.",
  "Alex was an absolute pleasure to work with. He knows the Miami condo market very well and got me into the exact building I wanted to live in. He guided me throughout the process and was helpful in answering all questions. I highly recommend him to anyone seeking a relator and would work with him again!",
  "Alex is very educated in Real Estate he has helped us get the best price when we bought, and yet get us the lowest price. What else would a Buyer or seller want. If you would like someone to look after your best interest, and make deals come together Alex is your man."
];

const agentImage = "https://i.imgur.com/8Xt0Se9.jpg";
const primaryLivingAreaImage = "https://i.imgur.com/Dyy8QTK.jpg";

const images = [
  // [Index 0] HERO SLIDE 1 & Main Cover Image
  "https://i.imgur.com/In8R5Fl.jpg", 
  
  // [Index 1] HERO SLIDE 2 & "Primary Living Area" Feature Section (Uses variable above)
  primaryLivingAreaImage,
  
  // [Index 2] HERO SLIDE 5 & Visual Tour (Large Left Image)
  "https://i.imgur.com/btPMC4L.jpg", 
  
  // [Index 3] Visual Tour (Top Right Image)
  "https://i.imgur.com/61FqwjJ.jpg", 
  
  // [Index 4] HERO SLIDE 3 & Visual Tour (Bottom Right Image)
  "https://i.imgur.com/4e7oLVh.jpg", 
  
  // [Index 5] HERO SLIDE 4 & "The Lifestyle" Section Image
  "https://i.imgur.com/QPZmxZC.jpg", 
  
  // [Index 6] Extra Gallery Image (Cycles through Visual Tour)
  "https://i.imgur.com/YUxeEl0.jpg", 
  
  // [Index 7] Inquiry Modal Image (Popup Background)
  "https://i.imgur.com/9o2YRgD.jpg", 
  
  // [Index 8] Extra Gallery Image (Cycles through Visual Tour)
  "https://i.imgur.com/SzYF3sl.jpg", 
  
  // [Index 9] Extra Gallery Image (Cycles through Visual Tour)
  "https://i.imgur.com/PQ9g6WN.jpg",

  // [Index 10] Additional Gallery Image
  "https://i.imgur.com/h7UuN2p.jpg",

  // [Index 11] Additional Gallery Image
  "https://i.imgur.com/qDZqyNi.jpg",

  // [Index 12] Additional Gallery Image
  "https://i.imgur.com/A71Z809.jpg",

  // [Index 13] Additional Gallery Image
  "https://i.imgur.com/PRIw4je.jpg",

  // [Index 14] Additional Gallery Image
  "https://i.imgur.com/x4vU8wY.jpg",

  // [Index 15] Additional Gallery Image
  "https://i.imgur.com/fHx8ZdY.jpg",

  // [Index 16] Additional Gallery Image
  "https://i.imgur.com/ips9vtm.jpg",

  // [Index 17] Additional Gallery Image
  "https://i.imgur.com/9ItMzti.jpg",

  // [Index 18] Additional Gallery Image
  "https://i.imgur.com/yBxOKub.jpg",

  // [Index 19] Additional Gallery Image
  "https://i.imgur.com/UT4ThAm.jpg",

  // [Index 20] Additional Gallery Image
  "https://i.imgur.com/2XSpdnNg.jpg",

  // [Index 21] Additional Gallery Image
  "https://i.imgur.com/73YsO9H.jpg",

  // [Index 22] Additional Gallery Image
  "https://i.imgur.com/UtWL958.jpg",

  // [Index 23] Additional Gallery Image
  "https://i.imgur.com/sf5j3eP.jpg",

  // [Index 24] Additional Gallery Image
  "https://i.imgur.com/EgoEEMw.jpg"
];

const heroIndices = [0, 1, 4, 5, 2]; 

// ------------------------------------------------------------------------------------------
// HELPER COMPONENT
// ------------------------------------------------------------------------------------------
const ImageComponent = (props) => {
  const { index, className, alt = "Property View", style = {}, onClick } = props;
  
  const imgUrl = images[index];
  if (!imgUrl) return <div className={`bg-gray-200 ${className}`} style={style} />;

  return (
    <img 
      src={imgUrl} 
      alt={alt} 
      className={`${className} ${onClick ? 'cursor-pointer' : ''}`}
      style={style}
      loading="lazy"
      onClick={onClick}
    />
  );
};

// ------------------------------------------------------------------------------------------
// DISCLOSURES (same style as we used before)
// ------------------------------------------------------------------------------------------
const DisclosureBlock = ({ className = "" }) => {
  return (
    <div className={`mt-4 pt-4 border-t border-black/5 ${className}`}>
      <p className="text-[10px] leading-relaxed text-black/40">
        By submitting this form, you consent to be contacted by Alex Algarin and/or Compass via call, text,
        and email (including automated means). Consent is not a condition of purchase. Message and data
        rates may apply.
      </p>
      <p className="text-[10px] leading-relaxed text-black/40 mt-3">
        Alex Algarin is a real estate agent affiliated with COMPASS, a licensed real estate broker and
        abides by equal housing opportunity laws. All material presented herein is intended for informational
        purposes only. Information is compiled from sources deemed reliable but is subject to errors,
        omissions, changes in price, condition, sale, or withdrawal without notice. No statement is made as
        to accuracy of any description. All measurements and square footages are approximate. This is not
        intended to solicit properties already listed. Nothing herein shall be construed as legal, accounting
        or other professional advice outside the realm of real estate brokerage.
      </p>
      <div className="mt-3">
        <a
          href="#disclosures"
          className="text-[10px] uppercase tracking-widest font-medium text-black/50 hover:text-[#C5A27D] transition"
        >
          View Disclosures
        </a>
      </div>
    </div>
  );
};

const FullDisclosuresSection = () => {
  return (
    <section id="disclosures" className="py-24 bg-[#FDFCFB] border-t border-black/5 px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#C5A27D]">Disclosures</h2>
            <h3 className="text-4xl md:text-5xl font-serif leading-tight">
              Important information & compliance
            </h3>
            <p className="text-black/60 leading-relaxed font-light text-sm max-w-xl">
              Please review the disclosures below. If you have questions, contact Alex directly.
            </p>
          </div>

          <div className="bg-white p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-black/5 rounded-sm">
            <p className="text-[10px] leading-relaxed text-black/40">
              By submitting any form on this page, you consent to be contacted by Alex Algarin and/or
              Compass via call, text, and email (including automated means). Consent is not a condition of
              purchase. Message and data rates may apply.
            </p>
            <p className="text-[10px] leading-relaxed text-black/40 mt-4">
              Alex Algarin is a real estate agent affiliated with COMPASS, a licensed real estate broker and
              abides by equal housing opportunity laws. All material presented herein is intended for
              informational purposes only. Information is compiled from sources deemed reliable but is subject
              to errors, omissions, changes in price, condition, sale, or withdrawal without notice. No
              statement is made as to accuracy of any description. All measurements and square footages are
              approximate. This is not intended to solicit properties already listed. Nothing herein shall be
              construed as legal, accounting or other professional advice outside the realm of real estate
              brokerage.
            </p>

            <div className="mt-6 pt-6 border-t border-black/5">
              <a
                href="#residence"
                className="text-[10px] uppercase tracking-widest font-medium text-black/50 hover:text-[#C5A27D] transition"
              >
                Back to top
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ------------------------------------------------------------------------------------------
// MAIN APP COMPONENT
// ------------------------------------------------------------------------------------------
const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('tour'); // 'tour' or 'search'
  const [formStatus, setFormStatus] = useState('idle'); 
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  // Lightbox State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-advance Hero Carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroIndices.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Auto-advance Visual Tour Gallery
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLightboxOpen) { // Only auto-cycle if user isn't viewing an image
        setCurrentGalleryIndex((prev) => (prev + 1) % images.length);
      }
    }, 4000); 
    return () => clearInterval(interval);
  }, [isLightboxOpen]);

  const nextHeroImage = () => {
    setCurrentHeroIndex((prev) => (prev + 1) % heroIndices.length);
  };

  const prevHeroImage = () => {
    setCurrentHeroIndex((prev) => (prev - 1 + heroIndices.length) % heroIndices.length);
  };

  // Gallery Navigation
  const nextGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev + 1) % images.length);
  };

  const prevGalleryImage = () => {
    setCurrentGalleryIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Lightbox Navigation Controls
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const nextLightboxImage = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevLightboxImage = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Review Navigation
  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // @ts-ignore
    data.timestamp = new Date().toISOString();

    try {
      if (ZAPIER_WEBHOOK_URL) {
        await fetch(ZAPIER_WEBHOOK_URL, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          },
          mode: 'no-cors' 
        });
      } else {
        console.warn("No Zapier Webhook URL configured. Simulating success.");
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setFormStatus('success');
      setTimeout(() => {
        setFormStatus('idle'); 
        setIsModalOpen(false);
        e.target.reset();
      }, 3000);
    } catch (error) {
      console.error("Submission error", error);
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-['Inter'] text-[#1A1A1A] selection:bg-[#E5D5C5]">
      {/* Import Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
          
          .font-serif { font-family: 'Playfair Display', serif; }
          .font-sans { font-family: 'Inter', sans-serif; }
          
          @keyframes fade-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-up { animation: fade-up 0.8s ease-out forwards; }
          
          html { scroll-behavior: smooth; }
        `}
      </style>

      {/* Luxury Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-md py-4 border-b border-black/5' : 'bg-transparent py-8'}`}>
        <div className="max-w-[1400px] mx-auto px-8 flex justify-between items-center">
          <div className="flex flex-col">
            <img 
              src={LOGO_URL} 
              alt="The Algarin Group" 
              className={`h-12 w-auto object-contain transition-all duration-500 ${isScrolled ? '' : 'brightness-0 invert'}`} 
            />
          </div>
          
          <div className="hidden md:flex items-center space-x-12">
            {['Residence', 'Lifestyle', 'Gallery', 'Disclosures'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`text-xs uppercase tracking-[0.2em] font-medium transition hover:text-[#C5A27D] ${isScrolled ? 'text-black' : 'text-white'}`}>
                {item}
              </a>
            ))}
            <button 
              onClick={() => { setModalType('tour'); setIsModalOpen(true); }}
              className={`text-xs uppercase tracking-[0.2em] font-semibold border-b-2 pb-1 transition ${isScrolled ? 'text-black border-[#C5A27D]' : 'text-white border-white'}`}
            >
              Inquire
            </button>
          </div>
        </div>
      </nav>

      {/* WhatsApp Floating Action Button */}
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-24 md:bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-sm font-bold ml-0 group-hover:ml-3">
          Chat with Alex
        </span>
      </a>

      {/* Immersive Hero Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Carousel Images */}
        {heroIndices.map((imageIndex, idx) => (
           <div 
             key={idx}
             className={`absolute inset-0 z-0 transition-opacity duration-[2000ms] ease-in-out ${idx === currentHeroIndex ? 'opacity-100' : 'opacity-0'}`}
           >
             <ImageComponent index={imageIndex} className="w-full h-full object-cover scale-105 animate-[slow-zoom_20s_infinite_alternate]" alt={`Slide ${idx + 1}`} />
             <div className="absolute inset-0 bg-black/30"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
           </div>
        ))}

        {/* Carousel Controls */}
        <button 
          onClick={prevHeroImage}
          className="absolute left-4 md:left-8 z-20 text-white/50 hover:text-white transition p-2 rounded-full hover:bg-white/10"
        >
          <ChevronLeft size={40} strokeWidth={1} />
        </button>
        <button 
          onClick={nextHeroImage}
          className="absolute right-4 md:right-8 z-20 text-white/50 hover:text-white transition p-2 rounded-full hover:bg-white/10"
        >
          <ChevronRight size={40} strokeWidth={1} />
        </button>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-6 mt-20">
          <p className="text-sm md:text-base uppercase tracking-[0.4em] mb-4 animate-fade-up opacity-0 drop-shadow-md" style={{ animationDelay: '0.2s' }}>The Ritz-Carlton Residences</p>
          <h1 className="text-7xl md:text-[120px] font-serif leading-[0.9] mb-8 animate-fade-up opacity-0 drop-shadow-lg" style={{ animationDelay: '0.4s' }}>
            SkyHouse UPH21
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 animate-fade-up opacity-0" style={{ animationDelay: '0.6s' }}>
            <span className="flex items-center text-lg md:text-xl tracking-[0.2em] uppercase drop-shadow-md"><MapPin size={18} className="mr-2 text-[#C5A27D]" /> Miami Beach</span>
            <span className="w-1 h-1 bg-white/60 rounded-full hidden md:block"></span>
            <span className="text-lg md:text-xl tracking-[0.2em] uppercase drop-shadow-md">{property.price}</span>
          </div>
          
          {/* New Request Tour CTA */}
          <div className="mt-12 animate-fade-up opacity-0" style={{ animationDelay: '0.8s' }}>
            <button 
              onClick={() => { setModalType('tour'); setIsModalOpen(true); }}
              className="bg-white text-[#1A1A1A] px-12 py-4 text-xs uppercase tracking-[0.3em] font-bold hover:bg-[#C5A27D] hover:text-white transition-colors duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
            >
              Request Tour
            </button>
          </div>

          {/* Inline disclosures link (optional subtle) */}
          <div className="mt-6">
            <a
              href="#disclosures"
              className="text-[10px] uppercase tracking-[0.35em] text-white/60 hover:text-white transition"
            >
              Disclosures
            </a>
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {heroIndices.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentHeroIndex(idx)}
              className={`h-[2px] transition-all duration-300 ${idx === currentHeroIndex ? 'w-8 bg-white' : 'w-4 bg-white/40 hover:bg-white/70'}`}
            />
          ))}
        </div>
      </section>

      {/* Floating Inquiry Summary for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-white border-t border-black/5">
        <button 
          onClick={() => { setModalType('tour'); setIsModalOpen(true); }}
          className="w-full bg-black text-white text-xs uppercase tracking-[0.2em] py-4 font-bold"
        >
          Schedule Showing
        </button>
      </div>

      {/* Main Content Area */}
      <main className="max-w-[1400px] mx-auto px-8 py-32 relative">
        <div className="grid lg:grid-cols-12 gap-20">
          
          {/* Left: Content */}
          <div className="lg:col-span-7 space-y-32">
            
            {/* Introductory Section */}
            <section id="residence" className="space-y-8">
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#C5A27D]">The Property</h2>
              <h3 className="text-4xl md:text-5xl font-serif italic leading-tight">
  A SkyHouse sanctuary suspended between light, water, and horizon.
</h3>
              <p className="text-xl text-black/60 leading-relaxed font-light max-w-xl">
                {property.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-12 pt-8">
                {[
                  { label: "Beds", value: property.beds, icon: Bed },
                  { label: "Baths", value: property.baths, icon: Bath },
                  { label: "Size", value: `${property.sqft} SF`, icon: Maximize },
                  { label: "MLS #", value: "A11917280", icon: Hash },
                  { label: "Year Built", value: "2022", icon: Calendar },
                  { label: "County", value: "Miami-Dade", icon: MapPin }
                ].map((stat) => (
                  <div key={stat.label} className="group">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-2 group-hover:text-[#C5A27D] transition">{stat.label}</p>
                    <div className="flex items-baseline space-x-2">
                      <stat.icon size={16} className="text-black/20" />
                      <p className="text-2xl font-serif italic">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detailed Property Specifications Section */}
              <div className="mt-16 pt-12 border-t border-black/5">
                <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-10 flex items-center">
                  <Info size={14} className="mr-2 text-[#C5A27D]" />
                  Property Information for 4701 Meridian Ave, Unit UPH21
                </h4>
                
                <div className="space-y-12 max-h-[500px] overflow-y-auto pr-4">
                  {propertySpecs.map((section, idx) => (
                    <div key={idx}>
                      <h5 className="text-sm font-serif font-bold italic border-b border-black/10 pb-2 mb-6 text-black/80">
                        {section.category}
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                        {section.items.map((item, i) => (
                          <div key={i} className="flex flex-col md:flex-row md:justify-between md:items-baseline group">
                            <span className="text-[10px] uppercase tracking-wider text-black/40 font-medium mb-1 md:mb-0 w-full md:w-2/5 pr-2">{item.label}</span>
                            <span className="text-sm font-light text-black/80 md:w-3/5 md:text-right">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Feature Gallery 1 */}
            <section className="relative aspect-[4/5] md:aspect-[16/9] overflow-hidden group">
              <ImageComponent index={1} className="w-full h-full object-cover transition duration-1000 group-hover:scale-105" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-80 mb-2">Primary Living Area</p>
                <h4 className="text-2xl font-serif mb-4">Expansive Southeast Vistas</h4>
                <a 
                  href="https://youtu.be/jtD6rgqx9sw" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs uppercase tracking-[0.2em] font-bold border-b border-white/50 pb-1 hover:text-[#C5A27D] hover:border-[#C5A27D] transition"
                >
                  Watch Virtual Tour <ArrowRight size={14} className="ml-2" />
                </a>
              </div>
            </section>

            {/* Lifestyle Section */}
            <section id="lifestyle" className="space-y-16">
              <div className="grid md:grid-cols-2 gap-12 items-end">
                <div className="space-y-6">
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-[#C5A27D]">The Lifestyle</h2>
                    <h3 className="text-3xl font-serif">The Ritz-Carlton Experience</h3>
                    <p className="text-black/60 leading-relaxed font-light">
                      Homeowners enjoy legendary Ritz-Carlton service managed by a dedicated residential team. This waterfront oasis offers a rooftop pool deck with private cabanas, a private captained day yacht for residents, and a serene meditation garden, redefining luxury living in Miami Beach.
                    </p>
                </div>
                <div className="aspect-square bg-slate-100 overflow-hidden">
                  <ImageComponent index={5} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="border-t border-black/5 pt-16 grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
                {[
                  "Private Captained Day Yacht",
                  "Rooftop Pool & Private Cabanas",
                  "State-of-the-Art Fitness Center",
                  "Cinema-Style Screening Room",
                  "Art Studio & Kids Room",
                  "Legendary Ritz-Carlton Concierge"
                ].map((item) => (
                  <div key={item} className="flex items-center space-x-4 border-b border-black/5 pb-4">
                    <div className="w-1 h-1 bg-[#C5A27D] rounded-full"></div>
                    <span className="text-xs uppercase tracking-[0.15em] font-medium text-black/70">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Sticky Form */}
          <aside className="lg:col-span-5 relative">
            <div className="sticky top-32 space-y-12">
              <div className="bg-white p-12 text-[#1A1A1A] rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-[#1A1A1A]/5">
                <h3 className="text-3xl font-serif mb-2">Request Information</h3>
                <p className="text-[#1A1A1A]/60 text-sm mb-10 font-light">Inquire for a private viewing or the full offering memorandum.</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* HIDDEN SOURCE FIELD FOR CRM/ZAPIER */}
                  <input type="hidden" name="source" value="Listing Inquiry - 4701 Meridian Ave, Unit UPH21" />

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/50">Full Name</label>
                    <input name="fullName" required type="text" className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-3 text-sm focus:border-[#C5A27D] outline-none transition" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/50">Email</label>
                    <input name="email" required type="email" className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-3 text-sm focus:border-[#C5A27D] outline-none transition" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/50">Phone</label>
                    <input name="phone" required type="tel" className="w-full bg-transparent border-b border-[#1A1A1A]/20 py-3 text-sm focus:border-[#C5A27D] outline-none transition" />
                  </div>
                  <button type="submit" className="w-full bg-[#1A1A1A] hover:bg-[#C5A27D] text-white py-5 text-xs uppercase tracking-[0.3em] font-bold mt-10 transition-colors shadow-lg">
                    {formStatus === 'sending' ? 'Sending...' : 'Send Inquiry'}
                  </button>

                  {/* ✅ Disclaimers directly under the form CTA (like we did before) */}
                  <DisclosureBlock />
                </form>

                {formStatus === 'success' && (
                  <div className="mt-8 text-center text-[#C5A27D] animate-fade-up">
                    <p className="text-sm italic font-serif">Thank you. We will be in touch shortly.</p>
                  </div>
                )}
              </div>

              {/* Agent Sub-info */}
              <div className="flex items-center space-x-6 px-4">
                <div className="w-16 h-16 bg-slate-200 rounded-full overflow-hidden flex-shrink-0">
                  <img src={agentImage} alt="Agent" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold mb-1">Listing Agent</p>
                  <p className="text-lg font-serif italic text-black/80 underline decoration-[#C5A27D] decoration-2 underline-offset-4 cursor-pointer">Alex Algarin</p>
                  <p className="text-[10px] uppercase tracking-widest font-medium text-black/50 mt-1">Compass</p>
                  <a href="mailto:alex@algaringroup.com" className="text-[10px] uppercase tracking-widest font-medium text-black/50 mt-1 hover:text-[#C5A27D] transition block">alex@algaringroup.com</a>
                  <a href="tel:7862957184" className="text-[10px] uppercase tracking-widest font-medium text-black/50 mt-1 hover:text-[#C5A27D] transition block">(786) 295-7184</a>
                  
                  {/* WhatsApp Sidebar Link */}
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest font-medium text-[#25D366] mt-2 hover:text-[#128C7E] transition flex items-center">
                      <span className="mr-1">WhatsApp Agent</span>
                  </a>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </main>

      {/* Grid Gallery - Integrated Bottom */}
      <section id="gallery" className="bg-[#1A1A1A] py-32 px-8 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
              <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#C5A27D]">Visual Tour</h2>
              <div className="flex items-center space-x-4">
                <h3 className="text-4xl md:text-5xl font-serif text-white">Capture the Horizon</h3>
                <div className="flex space-x-2 ml-4">
                  <button onClick={prevGalleryImage} className="text-white/50 hover:text-[#C5A27D] transition p-2 border border-white/20 rounded-full hover:border-[#C5A27D]">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={nextGalleryImage} className="text-white/50 hover:text-[#C5A27D] transition p-2 border border-white/20 rounded-full hover:border-[#C5A27D]">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
            <p className="text-white/40 text-sm max-w-sm font-light leading-relaxed">
              Photography from Residence UPH21. Every window serves as a living frame of the Atlantic coastline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[1000px] md:h-[800px] transition-all duration-500 ease-in-out">
            <div className="md:col-span-8 h-full">
              <ImageComponent 
                index={currentGalleryIndex % images.length} 
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition duration-700 hover:opacity-90 cursor-pointer"
                onClick={() => openLightbox(currentGalleryIndex % images.length)}
              />
            </div>
            <div className="md:col-span-4 grid grid-rows-2 gap-6 h-full">
              <ImageComponent 
                index={(currentGalleryIndex + 1) % images.length} 
                className="w-full h-full object-cover transition duration-700 hover:opacity-90 cursor-pointer" 
                onClick={() => openLightbox((currentGalleryIndex + 1) % images.length)}
              />
              <ImageComponent 
                index={(currentGalleryIndex + 2) % images.length} 
                className="w-full h-full object-cover transition duration-700 hover:opacity-90 cursor-pointer" 
                onClick={() => openLightbox((currentGalleryIndex + 2) % images.length)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="h-[600px] w-full relative grayscale hover:grayscale-0 transition duration-700 ease-in-out group">
        <iframe 
          width="100%" 
          height="100%" 
          id="gmap_canvas" 
          src="https://maps.google.com/maps?q=4701%20Meridian%20Ave%2C%20Unit%20UPH21%2C%20Miami%20Beach%2C%20FL%2033140&t=&z=15&ie=UTF8&iwloc=&output=embed" 
          frameBorder="0" 
          scrolling="no" 
          title="Property Location"
          className="w-full h-full"
        ></iframe>
        
        {/* Floating Location Card */}
        <div className="absolute top-12 left-8 md:left-20 bg-white p-8 shadow-2xl max-w-sm z-10 pointer-events-none group-hover:pointer-events-auto transition-transform duration-500 group-hover:-translate-y-2">
           <div className="flex items-center space-x-2 mb-4 text-[#C5A27D]">
             <MapPin size={16} />
             <p className="text-[10px] uppercase tracking-[0.2em] font-bold">The Neighborhood</p>
           </div>
           <h4 className="font-serif text-3xl mb-4 text-[#1A1A1A]">Private Waterfront Enclave</h4>
           <p className="text-sm text-[#1A1A1A]/60 leading-relaxed font-light">
             Situated on the shores of Surprise Lake, The Ritz-Carlton Residences offer a tranquil residential setting just minutes from the vibrant dining and shopping of South Beach and Bal Harbour.
           </p>
           <div className="mt-6 pt-6 border-t border-black/5 flex justify-between items-center">
             <span className="text-xs uppercase tracking-wider text-[#1A1A1A]/40">Walk Score® 82</span>
             <a href="https://maps.google.com/maps?q=4701%20Meridian%20Ave%2C%20Unit%20UPH21%2C%20Miami%20Beach%2C%20FL%2033140" target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center hover:text-[#C5A27D] transition pointer-events-auto">
               Get Directions <ArrowRight size={12} className="ml-2" />
             </a>
           </div>
        </div>
      </section>

      {/* New Agent & Reviews Section */}
      <section className="py-16 bg-[#F5F3F0] px-8 border-t border-black/5">
        <div className="max-w-[1100px] mx-auto">
           <div className="grid lg:grid-cols-2 gap-12 items-center">
             {/* Agent/CTA Side */}
             <div className="space-y-6 relative">
                 <div className="flex items-start space-x-6">
                    <div className="w-20 h-20 md:w-28 md:h-28 bg-slate-200 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-lg">
                       <img src={agentImage} alt="Alex Algarin" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-3">
                       <h2 className="text-2xl font-serif leading-tight">Didn’t find what you were looking for?</h2>
                       <p className="text-black/60 font-light leading-relaxed text-sm">
                          Alex specializes in Miami Beach properties and helps buyers uncover homes that never make it to the public market. Tell him what you’re looking for, and he’ll do the searching for you.
                       </p>
                       <button 
                          onClick={() => { setModalType('search'); setIsModalOpen(true); }}
                          className="inline-block bg-[#1A1A1A] text-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#C5A27D] transition-colors shadow-lg mt-2"
                       >
                          Get Personalized Listings
                       </button>
                       {/* Optional mini-disclaimer under this CTA too */}
                       <DisclosureBlock className="border-black/10" />
                    </div>
                 </div>
             </div>

             {/* Reviews Carousel Side */}
             <div className="bg-white p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative rounded-sm">
                 <div className="flex text-[#C5A27D] mb-4 space-x-1">
                   {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#C5A27D" />)}
                 </div>
                 
                 <div className="min-h-[200px] flex items-center">
                   <p className="font-serif italic text-lg text-[#1A1A1A]/80 leading-relaxed transition-opacity duration-500">
                     "{reviews[currentReviewIndex]}"
                   </p>
                 </div>

                 <div className="flex items-center justify-between mt-6 pt-6 border-t border-black/5">
                     <span className="text-[10px] uppercase tracking-widest text-black/40">Client Testimonials</span>
                     <div className="flex space-x-2">
                        <button onClick={prevReview} className="p-2 hover:bg-black/5 rounded-full transition text-black/60 hover:text-black">
                          <ChevronLeft size={18} />
                        </button>
                        <button onClick={nextReview} className="p-2 hover:bg-black/5 rounded-full transition text-black/60 hover:text-black">
                          <ChevronRight size={18} />
                        </button>
                     </div>
                 </div>
             </div>
           </div>
        </div>
      </section>

      {/* ✅ Full Disclosures Section (anchor target) */}
      <FullDisclosuresSection />

      {/* Footer */}
      <footer className="py-24 bg-[#FDFCFB] border-t border-black/5 px-8">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-20 items-start">
          <div className="space-y-12">
            <div className="flex flex-col">
              <span className="text-3xl font-serif tracking-tighter">RITZ-CARLTON</span>
              <span className="text-[10px] tracking-[0.3em] font-medium uppercase mt-1 text-black/40">Residences Miami Beach</span>
            </div>
            <div className="space-y-2 text-xs uppercase tracking-widest text-black/60 leading-loose">
              <p>4701 Meridian Ave, Unit UPH21</p>
              <p>Miami Beach, Florida 33140</p>
              <p className="pt-4 text-[#C5A27D] font-bold">Inquiries: (786) 295-7184</p>
            </div>
          </div>
          
          <div className="space-y-12 md:text-right">
             <div className="flex flex-col md:items-end space-y-4">
                <a href="https://www.compass.com/homedetails/4701-Meridian-Ave-Unit-UPH21-Miami-Beach-FL-33140/1CKO0U_pid/" target="_blank" rel="noreferrer" className="text-xs uppercase tracking-[0.2em] hover:text-[#C5A27D] transition">View Listing on Compass</a>
             </div>
             <p className="text-[10px] text-black/30 max-w-md md:ml-auto leading-relaxed">
               Alex Algarin is a real estate agent affiliated with COMPASS, a licensed real estate broker and abides by equal housing opportunity laws. All material presented herein is intended for informational purposes only. Information is compiled from sources deemed reliable but is subject to errors, omissions, changes in price, condition, sale, or withdrawal without notice. No statement is made as to accuracy of any description. All measurements and square footages are approximate. This is not intended to solicit properties already listed. Nothing herein shall be construed as legal, accounting or other professional advice outside the realm of real estate brokerage.
             </p>
          </div>
        </div>
      </footer>

      {/* Modal - Inquiry Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/25 backdrop-blur-sm animate-in fade-in duration-500">
          <div className="w-full max-w-lg relative bg-white rounded-sm shadow-2xl overflow-y-auto max-h-[90vh] p-8 animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-black/40 hover:text-black transition z-10"
            >
              <X size={24} />
            </button>
            
            {modalType === 'search' ? (
              <div className="flex flex-col justify-center space-y-6">
                 <div className="space-y-2 text-center">
                   <h3 className="text-2xl font-serif leading-tight">Let’s Find the Right Home for You</h3>
                   <p className="text-black/60 font-light text-xs leading-relaxed">
                     Quick questions so I can send you relevant options—no spam, no pressure.
                   </p>
                 </div>
                 <form onSubmit={handleSubmit} className="space-y-4">
                   <input type="hidden" name="source" value="Personalized Search Request" />

                   <input name="fullName" required type="text" placeholder="FULL NAME" className="w-full border-b border-black/10 py-3 text-xs tracking-widest outline-none focus:border-[#C5A27D] transition" />
                   <input name="email" required type="email" placeholder="EMAIL ADDRESS" className="w-full border-b border-black/10 py-3 text-xs tracking-widest outline-none focus:border-[#C5A27D] transition" />
                   
                   <div className="relative">
                     <input name="phone" type="tel" placeholder="PHONE (OPTIONAL)" className="w-full border-b border-black/10 py-3 text-xs tracking-widest outline-none focus:border-[#C5A27D] transition" />
                     <span className="absolute right-0 top-3 text-[8px] text-black/30 uppercase tracking-widest">Recommended</span>
                   </div>

                   <div className="pt-2 space-y-2">
                     <label className="text-[10px] uppercase tracking-widest text-black/50 font-bold">What are you looking for?</label>
                     <div className="grid grid-cols-2 gap-2">
                       {['Condo', 'Townhome', 'Single-family', 'Not sure yet'].map(type => (
                          <label key={type} className="flex items-center space-x-2 cursor-pointer group">
                             <div className="relative flex items-center">
                              <input type="radio" name="propertyType" value={type} className="peer sr-only" />
                              <div className="w-3 h-3 border border-black/20 rounded-full peer-checked:bg-[#1A1A1A] peer-checked:border-[#1A1A1A] transition"></div>
                             </div>
                             <span className="text-xs text-black/60 group-hover:text-black transition">{type}</span>
                          </label>
                       ))}
                     </div>
                   </div>

                   <div className="space-y-1 pt-2">
                      <label className="text-[10px] uppercase tracking-widest text-black/50 font-bold">Preferred Area</label>
                      <input name="preferredArea" type="text" placeholder="e.g. Miami Beach, South Beach" className="w-full border-b border-black/10 py-2 text-sm outline-none focus:border-[#C5A27D] transition" />
                   </div>

                   <div className="space-y-1 pt-2">
                      <label className="text-[10px] uppercase tracking-widest text-black/50 font-bold">Target price range (optional)</label>
                      <div className="relative">
                        <select name="priceRange" className="w-full border-b border-black/10 py-2 text-sm outline-none focus:border-[#C5A27D] transition appearance-none bg-transparent cursor-pointer" defaultValue="">
                          <option value="" disabled>Select a range</option>
                          <option value="Under $750k">Under $750k</option>
                          <option value="$750k – $1M">$750k – $1M</option>
                          <option value="$1M – $1.5M">$1M – $1.5M</option>
                          <option value="$1.5M – $2.5M">$1.5M – $2.5M</option>
                          <option value="$2.5M+">$2.5M+</option>
                          <option value="Not sure yet">Not sure yet</option>
                        </select>
                        <div className="absolute right-0 top-3 pointer-events-none text-black/30">
                          <ChevronDown size={12} />
                        </div>
                      </div>
                   </div>

                   <div className="space-y-1 pt-2">
                      <label className="text-[10px] uppercase tracking-widest text-black/50 font-bold">Anything this home was missing?</label>
                      <textarea name="feedback" rows="2" placeholder="Tell me what you need..." className="w-full border border-black/10 p-2 text-sm outline-none focus:border-[#C5A27D] transition rounded-sm resize-none bg-[#FDFCFB]" />
                   </div>

                   <button type="submit" className="w-full bg-[#1A1A1A] text-white py-4 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-[#C5A27D] transition-colors mt-2">
                     {formStatus === 'sending' ? 'Sending...' : 'Find Homes That Fit Me'}
                   </button>

                   {/* ✅ Disclaimers inside modal too (recommended) */}
                   <DisclosureBlock className="border-black/10" />

                   <p className="text-[10px] text-center text-black/40 mt-2">No obligation. I’ll only send homes that match your criteria.</p>
                 </form>
              </div>
            ) : (
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-2 text-center">
                  <h3 className="text-3xl font-serif leading-tight">Request a Private Appointment</h3>
                  <p className="text-black/60 font-light text-sm leading-relaxed">
                    Experience the lifestyle through a personalized, by-appointment-only tour.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="source" value="Private Viewing Request - 4701 Meridian Ave, Unit UPH21" />
                  
                  <input name="fullName" required type="text" placeholder="FULL NAME" className="w-full border-b border-black/10 py-3 text-xs tracking-widest outline-none focus:border-[#C5A27D] transition" />
                  <input name="email" required type="email" placeholder="EMAIL ADDRESS" className="w-full border-b border-black/10 py-3 text-xs tracking-widest outline-none focus:border-[#C5A27D] transition" />
                  <input name="phone" required type="tel" placeholder="PHONE NUMBER" className="w-full border-b border-black/10 py-3 text-xs tracking-widest outline-none focus:border-[#C5A27D] transition" />
                  <button type="submit" className="w-full bg-[#1A1A1A] text-white py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-[#C5A27D] transition-colors">
                    {formStatus === 'sending' ? 'Sending...' : 'Submit Request'}
                  </button>

                  {/* ✅ Disclaimers inside tour modal */}
                  <DisclosureBlock className="border-black/10" />
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lightbox Modal Overlay */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setIsLightboxOpen(false)}>
          <button onClick={() => setIsLightboxOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white p-2 z-10">
            <X size={32} />
          </button>
          
          <button onClick={prevLightboxImage} className="absolute left-4 text-white/50 hover:text-white p-4 z-10 hover:bg-white/10 rounded-full transition">
            <ChevronLeft size={40} strokeWidth={1} />
          </button>
          
          <img 
            src={images[lightboxIndex]} 
            alt="Gallery Fullscreen" 
            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()} 
          />

          <button onClick={nextLightboxImage} className="absolute right-4 text-white/50 hover:text-white p-4 z-10 hover:bg-white/10 rounded-full transition">
            <ChevronRight size={40} strokeWidth={1} />
          </button>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest uppercase">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
