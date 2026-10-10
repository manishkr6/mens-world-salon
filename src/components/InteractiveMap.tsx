import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MapPin, Navigation, Copy, Check, ExternalLink, Phone, Compass, Map as MapIcon, Scissors, Clock } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface InteractiveMapProps {
  onOpenBooking: () => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onOpenBooking }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const [mapViewType, setMapViewType] = useState<'interactive' | 'google-embed'>('interactive');
  const [copiedPlusCode, setCopiedPlusCode] = useState(false);

  // Initialize and update Leaflet map with OpenStreetMap tiles (Only Men's World Salon)
  useEffect(() => {
    if (mapViewType !== 'interactive' || !mapContainerRef.current) return;

    // Fix default marker icon assets
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [SALON_INFO.coordinates.lat, SALON_INFO.coordinates.lng],
        zoom: 16,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      // Free OpenStreetMap tiles without API key
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: ['a', 'b', 'c'],
        maxZoom: 19,
      }).addTo(map);

      // Custom Gold Pin specifically for Men's World Salon & Academy
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            background: #c5a059;
            color: #000000;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid #ffffff;
            box-shadow: 0 4px 18px rgba(0,0,0,0.7);
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
          ">
            ✂
          </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
      });

      const marker = L.marker([SALON_INFO.coordinates.lat, SALON_INFO.coordinates.lng], {
        icon: customIcon,
      }).addTo(map);

      const popupHtml = `
        <div style="padding: 8px; max-width: 260px; font-family: inherit;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
            <span style="background: #c5a059; color: #000; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">Our Salon</span>
            <span style="color: #fbbf24; font-size: 11px; font-weight: bold;">★ ${SALON_INFO.rating} (50)</span>
          </div>
          <h4 style="font-weight: 700; font-size: 14px; margin: 0 0 4px 0; color: #e6c687;">
            ${SALON_INFO.name}
          </h4>
          <p style="font-size: 11px; color: #d4d4d8; margin: 0 0 4px 0; line-height: 1.4;">
            ${SALON_INFO.address}
          </p>
          <p style="font-size: 10px; color: #10b981; margin: 0 0 8px 0; font-weight: 600;">
            • ${SALON_INFO.openingHours}
          </p>
          <a
            href="${SALON_INFO.googleMapsDirectionsUrl}"
            target="_blank"
            rel="noopener noreferrer"
            style="
              display: block;
              text-align: center;
              background: #c5a059;
              color: #000000;
              font-size: 11px;
              font-weight: 700;
              padding: 7px 12px;
              border-radius: 6px;
              text-decoration: none;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            "
          >
            Get Google Directions
          </a>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        autoPan: true,
        autoPanPadding: [20, 20],
      });
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
        map.setView([SALON_INFO.coordinates.lat, SALON_INFO.coordinates.lng], 16);
      }, 150);
    }

    return () => {
      if (mapInstanceRef.current && mapViewType !== 'interactive') {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapViewType]);

  const copyPlusCode = () => {
    navigator.clipboard.writeText(SALON_INFO.plusCode);
    setCopiedPlusCode(true);
    setTimeout(() => setCopiedPlusCode(false), 2500);
  };

  return (
    <section id="map-directions" className="py-20 bg-[#0f1117] border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#c5a059] mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Exact Salon Location & Live Route Navigation</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wide">
              MEN'S WORLD SALON LOCATION
            </h2>
            <p className="text-zinc-400 text-sm mt-2 max-w-xl">
              Located above Manshi Shopping Complex on Zanzarda Road, Vishnu Colony, Junagadh. Click below for real-time turn-by-turn navigation on Google Maps.
            </p>
          </div>

          {/* View Mode Toggle: Interactive Map vs Google Maps Embed */}
          <div className="flex items-center gap-1 bg-[#181b24] p-1 rounded-lg border border-zinc-800 w-full sm:w-auto justify-center">
            <button
              onClick={() => setMapViewType('interactive')}
              className={`flex-1 sm:flex-none justify-center flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                mapViewType === 'interactive'
                  ? 'bg-[#c5a059] text-black font-semibold shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Interactive Map</span>
            </button>
            <button
              onClick={() => setMapViewType('google-embed')}
              className={`flex-1 sm:flex-none justify-center flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                mapViewType === 'google-embed'
                  ? 'bg-[#c5a059] text-black font-semibold shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Google Maps View</span>
            </button>
          </div>
        </div>

        {/* Map Container + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Display Box */}
          <div className="lg:col-span-2 relative rounded-xl overflow-hidden border border-zinc-800 bg-[#141720] min-h-[340px] sm:min-h-[460px] shadow-2xl">
            {mapViewType === 'interactive' ? (
              <>
                <div ref={mapContainerRef} className="w-full h-full min-h-[340px] sm:min-h-[460px] z-10" />

                {/* Map Legend Overlay */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-[#12141c]/95 backdrop-blur-md p-2.5 sm:p-3 rounded-lg border border-zinc-800 text-xs shadow-lg max-w-[200px] sm:max-w-none">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#c5a059] border border-white shrink-0"></span>
                    <span className="font-semibold text-white text-[11px] sm:text-xs truncate">Men's World Salon</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5 truncate">
                    Manshi Shopping Complex
                  </p>
                </div>
              </>
            ) : (
              /* Google Maps Direct Embed centered at exact coordinates 21.5222259, 70.4415272 */
              <div className="w-full h-full min-h-[340px] sm:min-h-[460px]">
                <iframe
                  title="Men's World Salon & Academy Google Maps Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '340px' }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={SALON_INFO.embedMapUrl}
                />
              </div>
            )}
          </div>

          {/* Location Details Card */}
          <div className="bg-[#141720] border border-zinc-800 rounded-xl p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-[#c5a059] uppercase tracking-wider">
                  Verified Destination
                </span>
                <span className="text-xs text-emerald-400 font-medium">Open · Closes 10 PM</span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#1a1d26] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059]">
                  <Scissors className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white font-cinzel">
                  {SALON_INFO.name}
                </h3>
              </div>

              <div className="flex items-start gap-2.5 text-zinc-300 text-xs mb-4 leading-relaxed">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span>{SALON_INFO.address}</span>
              </div>

              {/* Coordinates & Plus Code info box */}
              <div className="space-y-3 mb-6">
                <div className="p-3 rounded-lg bg-[#181b24] border border-zinc-800/80">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-zinc-400">Google Plus Code:</span>
                    <button
                      onClick={copyPlusCode}
                      className="text-[#c5a059] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                    >
                      {copiedPlusCode ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <code className="text-xs font-mono text-zinc-200 block font-semibold">
                    {SALON_INFO.plusCode}
                  </code>
                </div>

                <div className="text-xs text-zinc-400 space-y-1.5 p-3 rounded-lg bg-[#12141c] border border-zinc-800/60">
                  <p className="flex items-center gap-1.5 text-zinc-300 font-medium">
                    <Clock className="w-3 h-3 text-[#c5a059]" />
                    <span>Working Hours: 9:00 AM – 10:00 PM Daily</span>
                  </p>
                  <p>• Landmark: Above Manshi Shopping Complex, B-9</p>
                  <p>• Main Road: Zanzarda Road, Vishnu Colony</p>
                  <p>• City: Junagadh, Gujarat 362001</p>
                  <p>• Parking: Ample space for bikes and cars</p>
                </div>
              </div>

              {/* Direct Actions: Google Directions (exact GPS coordinates) & Phone */}
              <div className="space-y-2.5 mb-4">
                <a
                  href={SALON_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#c5a059] hover:bg-[#d6b26d] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#c5a059]/20 active:scale-95"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Google Directions</span>
                </a>

                <a
                  href={SALON_INFO.googleMapsPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#181b24] hover:bg-[#202430] border border-zinc-700 text-zinc-200 text-xs font-medium transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Open Place on Google Maps</span>
                </a>

                <a
                  href={`tel:${SALON_INFO.phoneRaw}`}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-zinc-400 hover:text-white text-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Call Desk for Directions: {SALON_INFO.phone}</span>
                </a>
              </div>
            </div>

            {/* Quick appointment action */}
            <div className="pt-3 border-t border-zinc-800 text-center">
              <button
                onClick={onOpenBooking}
                className="text-xs text-[#c5a059] hover:underline font-semibold cursor-pointer"
              >
                Schedule Appointment Before Arriving →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
