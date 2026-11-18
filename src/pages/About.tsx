import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { teamMembers as teamData, type TeamCategory } from "@/data/team";
import { getPlaceholderImage } from "@/utils/placeholderImage";

interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
}

// Team is now sourced from src/data/team

const About = () => {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('about-page');
    return () => {
      document.body.classList.remove('about-page');
    };
  }, []);

  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter) {
      setActiveFilter(filter);
    } else {
      setActiveFilter('');
    }
  }, [searchParams]);

  const teamMembers = teamData;

  // --- Timeline horizontal scrolling (arrows, edge fades, mouse drag) ---
  const timelineRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  // While a drag glides to its resting card, CSS scroll-snap stays off –
  // otherwise the browser would snap abruptly the moment the mouse is released.
  const [isSettling, setIsSettling] = useState(false);
  const settleTimer = useRef<number>();
  const dragState = useRef({ active: false, startX: 0, startScroll: 0, moved: false, lastX: 0, lastT: 0, velocity: 0 });

  // Cards of the timeline (direct children of the inner flex row)
  const getTimelineItems = () =>
    Array.from(timelineRef.current?.firstElementChild?.children ?? []) as HTMLElement[];

  // An arrow is only shown if the first/last card is NOT fully visible yet.
  // (Checking the cards instead of raw scroll extremes avoids false positives
  // from scroll-snap, sub-pixel rounding and elastic overscroll in Safari.)
  const updateScrollState = useCallback(() => {
    const el = timelineRef.current;
    if (!el) return;
    const items = Array.from(el.firstElementChild?.children ?? []) as HTMLElement[];
    if (items.length === 0) return;
    const box = el.getBoundingClientRect();
    const first = items[0].getBoundingClientRect();
    const last = items[items.length - 1].getBoundingClientRect();
    const tolerance = 8;
    const atStart = el.scrollLeft <= tolerance || first.left >= box.left - tolerance;
    const atEnd =
      el.scrollLeft + el.clientWidth >= el.scrollWidth - tolerance || last.right <= box.right + tolerance;
    setCanScrollLeft(!atStart);
    setCanScrollRight(!atEnd);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = timelineRef.current;
    if (!el) return;
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(el);
    el.addEventListener('scrollend', updateScrollState);
    window.addEventListener('load', updateScrollState);
    return () => {
      observer.disconnect();
      el.removeEventListener('scrollend', updateScrollState);
      window.removeEventListener('load', updateScrollState);
    };
  }, [updateScrollState]);

  // Center the next card in the given direction. This lands exactly on a
  // snap point (cards use snap-center), so scroll-snap never pulls it back.
  const scrollTimeline = (direction: 1 | -1) => {
    const el = timelineRef.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    const mid = box.left + box.width / 2;
    const centerOf = (item: HTMLElement) => {
      const r = item.getBoundingClientRect();
      return r.left + r.width / 2;
    };
    const items = getTimelineItems();
    const target =
      direction === 1
        ? items.find((item) => centerOf(item) > mid + 10)
        : [...items].reverse().find((item) => centerOf(item) < mid - 10);
    if (!target) return;
    el.scrollTo({ left: el.scrollLeft + centerOf(target) - mid, behavior: 'smooth' });
  };

  // Mouse drag-to-scroll (touch keeps native swiping)
  const onDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || !timelineRef.current) return;
    window.clearTimeout(settleTimer.current);
    setIsSettling(false);
    dragState.current = {
      active: true,
      startX: e.clientX,
      startScroll: timelineRef.current.scrollLeft,
      moved: false,
      lastX: e.clientX,
      lastT: performance.now(),
      velocity: 0,
    };
  };

  const onDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    const el = timelineRef.current;
    if (!state.active || !el) return;
    const dx = e.clientX - state.startX;
    if (!state.moved && Math.abs(dx) > 5) {
      state.moved = true;
      setIsDragging(true);
      el.setPointerCapture(e.pointerId);
    }
    if (!state.moved) return;
    el.scrollLeft = state.startScroll - dx;
    // Smoothed pointer velocity (px/ms) for a natural "throw" on release
    const now = performance.now();
    const dt = Math.max(now - state.lastT, 1);
    state.velocity = 0.8 * ((e.clientX - state.lastX) / dt) + 0.2 * state.velocity;
    state.lastX = e.clientX;
    state.lastT = now;
  };

  const onDragEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = timelineRef.current;
    const state = dragState.current;
    if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    const wasDragging = state.active && state.moved;
    state.active = false;
    setIsDragging(false);
    if (!el || !wasDragging) return;

    // Project where the throw would end, then glide to the card closest to that point
    const idle = performance.now() - state.lastT > 100; // mouse held still before release -> no throw
    const throwDistance = idle ? 0 : Math.max(-450, Math.min(450, state.velocity * 250)); // max ~1.5 cards
    const projected = el.scrollLeft - throwDistance;
    const box = el.getBoundingClientRect();
    const mid = box.width / 2;
    let best = projected;
    let bestDist = Infinity;
    for (const item of getTimelineItems()) {
      const r = item.getBoundingClientRect();
      const itemCenter = el.scrollLeft + (r.left - box.left) + r.width / 2;
      const left = itemCenter - mid;
      const dist = Math.abs(left - projected);
      if (dist < bestDist) {
        bestDist = dist;
        best = left;
      }
    }
    best = Math.max(0, Math.min(best, el.scrollWidth - el.clientWidth));

    setIsSettling(true);
    el.scrollTo({ left: best, behavior: 'smooth' });
    const finish = () => {
      window.clearTimeout(settleTimer.current);
      el.removeEventListener('scrollend', finish);
      setIsSettling(false);
    };
    el.addEventListener('scrollend', finish, { once: true });
    settleTimer.current = window.setTimeout(finish, 800); // fallback for browsers without scrollend
  };

  // Swallow the click that ends a drag so buttons inside aren't triggered
  const onClickCapture = (e: React.MouseEvent) => {
    if (dragState.current.moved) {
      e.stopPropagation();
      e.preventDefault();
      dragState.current.moved = false;
    }
  };

  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      date: "1900",
      title: "Nürnberger Lebkuchen",
      description: "Was davor hier war? Unklar, vielleicht eine Lebkuchenbäckerei.",
      image: "/timeline/lebkuchenbaeckerei.png"
    },
    {
      id: 2,
      date: "2000",
      title: "Herrenausstatter",
      description: "Elegante Herrenmode für den stilbewussten Nürnberger.",
      image: "/timeline/herrenausstatter.png"
    },
    {
      id: 3,
      date: "2024",
      title: "Umbau",
      description: "Voller Elan und Motivation geht es in den Umbau. Aus Alt wird Neu.",
      image: "/timeline/umbau.png"
    },
    {
      id: 4,
      date: "2025",
      title: "Harte Arbeit muss belohnt werden",
      description: "Nach langen Arbeitstagen: Eis als verdiente Belohnung.",
      image: "/timeline/eis.png"
    },
    {
      id: 5,
      date: "2025",
      title: "Grand Opening",
      description: "Es ist soweit! Das Wunderwerk öffnet offiziell die Türen.",
      image: "/timeline/group.png"
    }
  ];

  const filteredTeamMembers = activeFilter
    ? teamMembers.filter(member => member.categories.includes(activeFilter as TeamCategory))
    : teamMembers;

  const scrollToContact = () => {
    if (window.location.pathname === '/') {
      const element = document.getElementById('contact');
      if (element) {
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - 100;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // Navigate to home page with scroll state
      navigate('/', { state: { scrollTo: 'contact' } });
    }
  };

  // Helper function to generate srcSet for retina images
  const getSrcSet = (imagePath: string | undefined) => {
    if (!imagePath || imagePath === '/placeholder.svg') {
      return '/placeholder.svg';
    }

    const extension = imagePath.substring(imagePath.lastIndexOf('.'));
    const basePathWithoutExt = imagePath.substring(0, imagePath.lastIndexOf('.'));

    return `${imagePath} 1x, ${basePathWithoutExt}@2x${extension} 2x, ${basePathWithoutExt}@3x${extension} 3x`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader title="Über uns" />

      <div className="container mx-auto px-6 pt-0 pb-16">
        {/* Call to Action */}
        <div className="mb-16">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-6">
              Lust, ein Teil von uns zu werden?
            </p>
            <Button
              onClick={scrollToContact}
              className="px-8 py-6 text-base font-medium rounded-lg transition-all"
            >
              Jetzt Kontakt aufnehmen
            </Button>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          {/* Filter Buttons */}
          <div className="flex justify-center mb-8 gap-2 flex-wrap">
            <Button
              onClick={() => setActiveFilter('')}
              variant={activeFilter === '' ? 'default' : 'outline'}
              size="sm"
              className={`rounded-full ${activeFilter === '' ? 'bg-white text-black hover:bg-gray-100 hover:text-black border border-gray-200' : ''}`}
            >
              Alle
            </Button>
            <Button
              onClick={() => setActiveFilter('hebammen')}
              variant={activeFilter === 'hebammen' ? 'default' : 'outline'}
              size="sm"
              className={`rounded-full ${activeFilter === 'hebammen' ? 'bg-white text-black hover:bg-gray-100 hover:text-black border border-gray-200' : ''}`}
            >
              Hebamme
            </Button>
            <Button
              onClick={() => setActiveFilter('physiotherapie')}
              variant={activeFilter === 'physiotherapie' ? 'default' : 'outline'}
              size="sm"
              className={`rounded-full ${activeFilter === 'physiotherapie' ? 'bg-white text-black hover:bg-gray-100 hover:text-black border border-gray-200' : ''}`}
            >
              Physiotherapie
            </Button>
            <Button
              onClick={() => setActiveFilter('osteopathie')}
              variant={activeFilter === 'osteopathie' ? 'default' : 'outline'}
              size="sm"
              className={`rounded-full ${activeFilter === 'osteopathie' ? 'bg-white text-black hover:bg-gray-100 hover:text-black border border-gray-200' : ''}`}
            >
              Osteopathie
            </Button>
            <Button
              onClick={() => setActiveFilter('heilpraktik')}
              variant={activeFilter === 'heilpraktik' ? 'default' : 'outline'}
              size="sm"
              className={`rounded-full ${activeFilter === 'heilpraktik' ? 'bg-white text-black hover:bg-gray-100 hover:text-black border border-gray-200' : ''}`}
            >
              Heilpraktik
            </Button>
            <Button
              onClick={() => setActiveFilter('yoga')}
              variant={activeFilter === 'yoga' ? 'default' : 'outline'}
              size="sm"
              className={`rounded-full ${activeFilter === 'yoga' ? 'bg-white text-black hover:bg-gray-100 hover:text-black border border-gray-200' : ''}`}
            >
              Yoga
            </Button>
          </div>

          {/* Team Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {filteredTeamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 p-6 text-center flex flex-col">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[hsl(var(--background))]">
                    <img
                      src={member.image || '/placeholder.svg'}
                      alt={member.name}
                      width={96}
                      height={96}
                      srcSet={getSrcSet(member.image)}
                      sizes="96px"
                      className="w-full h-full object-cover"
                      decoding="async"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                    />
                  </div>
                </div>
                <h3 className="text-lg font-serif mb-2">{member.name}</h3>
                <div className="flex flex-col items-center gap-2 flex-1 justify-center">
                  {member.coFounder && (
                    <Tag>Mitgründerin</Tag>
                  )}
                  {member.role && (
                    Array.isArray(member.role)
                      ? member.role.map((r) => <Tag key={r}>{r}</Tag>)
                      : <Tag>{member.role}</Tag>
                  )}
                  {member.comingSoon && (
                    <Tag variant="warning">Kommt bald!</Tag>
                  )}
                </div>
                {member.website && !member.comingSoon ? (
                  <div className="mt-4">
                    <a href={member.website} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="border-2 border-gray-200 bg-white text-black hover:border-warm hover:bg-warm/10 hover:text-black transition-all">
                        Website besuchen
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </a>
                  </div>
                ) : (
                  <div className="mt-4 h-9" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="p-6 max-w-6xl mx-auto mt-20">
          <h2 className="text-4xl font-serif text-center mb-12">Unsere Geschichte</h2>

          {/* Wrapper has the same negative margin as the scroller, so the fades sit exactly on its edges */}
          <div className="relative -mx-2">
          {/* Edge fades – only visible when there is more content in that direction */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 left-0 w-10 md:w-16 z-10 bg-gradient-to-r from-background to-transparent transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`}
          />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 right-0 w-10 md:w-16 z-10 bg-gradient-to-l from-background to-transparent transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Arrow buttons */}
          <button
            type="button"
            aria-label="Zurück"
            onClick={() => scrollTimeline(-1)}
            className={`absolute left-2 md:-left-2 top-[40%] -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:border-warm hover:text-warm transition-all duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0 invisible pointer-events-none'}`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Weiter"
            onClick={() => scrollTimeline(1)}
            className={`absolute right-2 md:-right-2 top-[40%] -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:border-warm hover:text-warm transition-all duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0 invisible pointer-events-none'}`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={timelineRef}
            onScroll={updateScrollState}
            onPointerDown={onDragStart}
            onPointerMove={onDragMove}
            onPointerUp={onDragEnd}
            onPointerCancel={onDragEnd}
            onClickCapture={onClickCapture}
            onDragStartCapture={(e) => e.preventDefault()}
            tabIndex={0}
            aria-label="Zeitleiste – mit Pfeiltasten scrollen"
            className={`overflow-x-auto scrollbar-hide pb-2 outline-none select-none ${isDragging ? 'cursor-grabbing' : 'md:cursor-grab'} ${isDragging || isSettling ? '' : 'snap-x snap-mandatory'}`}
          >
            <div className="flex gap-10 min-w-max px-4 items-end">
              {timelineItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center w-[260px] flex-shrink-0 snap-center"
                >
                  <div className="flex-1 flex items-end w-full mb-5">
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden w-full hover:shadow-md transition-shadow">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full aspect-[4/3] object-cover"
                        onError={e => {
                          const target = e.target as HTMLImageElement;
                          target.src = getPlaceholderImage(index);
                        }}
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-serif font-semibold mb-1.5">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-500 mb-2">{item.date}</span>
                  <div className="flex items-center w-full">
                    <div className={`flex-1 h-0.5 bg-gray-200 ${index === 0 ? 'invisible' : ''}`} />
                    <div className="w-4 h-4 rounded-full bg-warm flex-shrink-0" />
                    <div className="flex-1 h-0.5 bg-gray-200" />
                  </div>
                </div>
              ))}
              {/* Zukunft als letzter Punkt der Zeitreihe */}
              <div className="flex flex-col items-center w-[260px] flex-shrink-0 snap-center">
                <div className="flex-1 flex items-center justify-center mb-5">
                  <button
                    type="button"
                    onClick={(e) => {
                      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                      const x = (rect.left + rect.width / 2) / window.innerWidth;
                      const y = (rect.top + rect.height / 2) / window.innerHeight;
                      confetti({
                        particleCount: 80,
                        spread: 70,
                        origin: { x, y },
                        colors: ['#d4a090', '#e0b5a8', '#e8c9bf', '#f0ddd6']
                      });
                    }}
                    className="bg-warm border-2 border-warm text-white rounded-lg px-6 py-5 text-xl font-serif font-semibold cursor-pointer hover:bg-white hover:text-warm hover:border-warm transition-all text-center"
                  >
                    Die Zukunft? Wird wunderbar.
                  </button>
                </div>
                <span className="text-sm font-medium text-transparent mb-2" aria-hidden="true">&nbsp;</span>
                <div className="flex items-center w-full">
                  <div className="flex-1 h-0.5 bg-gray-200" />
                  <div className="w-4 h-4 rounded-full bg-warm flex-shrink-0" />
                  <div className="flex-1 h-0.5 bg-gray-200 invisible" />
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
