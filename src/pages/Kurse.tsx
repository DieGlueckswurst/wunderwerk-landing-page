import { useState } from 'react';
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tag } from "@/components/ui/tag";
import { courses, type Course, type CourseCategory } from "@/data/courses";
import { weeklySchedule, type Weekday } from "@/data/schedule";
import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";

const Kurse = () => {
  const [activeTab, setActiveTab] = useState<'alle' | 'wochenplan'>('alle');
  const navigate = useNavigate();

  const kurse = [...courses]; // Convert to mutable array for filtering
  const [activeCategory, setActiveCategory] = useState<string>('');
  const filteredKurse = activeCategory
    ? kurse.filter(k => (k.categories as readonly string[]).includes(activeCategory))
    : kurse;

  // Join schedule entries with course details
  const scheduleWithDetails = weeklySchedule.map(entry => {
    const course = [...courses].find(c => c.id === entry.courseId) as Course | undefined;
    return {
      ...entry,
      courseName: course?.name || '',
      courseUrl: course?.url
    };
  });

  const handleScheduleEntryClick = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      navigate('/', { state: { scrollTo: 'contact' } });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PageHeader title="Kurse" />

      <div className="container mx-auto px-6 pt-0 pb-16">
        {/* Segment Control */}
        <div className="flex justify-center mb-12">
          <div className="bg-amber-50 rounded-lg p-1 inline-flex">
            <Button
              onClick={() => setActiveTab('alle')}
              variant="ghost"
              className={`px-6 py-2 rounded-md text-black font-medium select-none touch-manipulation [-webkit-tap-highlight-color:transparent] transition-colors hover:text-black/80 active:text-black/70 focus:text-black/80 ${activeTab === 'alle'
                ? 'bg-white shadow-sm hover:bg-white active:bg-white focus:bg-white'
                : 'hover:bg-transparent active:bg-transparent focus:bg-transparent'
                }`}
            >
              Alle Kurse
            </Button>
            <Button
              onClick={() => setActiveTab('wochenplan')}
              variant="ghost"
              className={`px-6 py-2 rounded-md text-black font-medium select-none touch-manipulation [-webkit-tap-highlight-color:transparent] transition-colors hover:text-black/80 active:text-black/70 focus:text-black/80 ${activeTab === 'wochenplan'
                ? 'bg-white shadow-sm hover:bg-white active:bg-white focus:bg-white'
                : 'hover:bg-transparent active:bg-transparent focus:bg-transparent'
                }`}
            >
              Wochenplan
            </Button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'alle' && (
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-serif mb-8 text-center">Unsere Kursangebote</h3>
            {/* Category Filters */}
            <div className="flex justify-center mb-8 gap-2 flex-wrap">
              <Button
                onClick={() => setActiveCategory('')}
                variant={activeCategory === '' ? 'default' : 'outline'}
                size="sm"
                className="rounded-full"
              >
                Alle
              </Button>
              <Button
                onClick={() => setActiveCategory('Vor der Geburt')}
                variant={activeCategory === 'Vor der Geburt' ? 'default' : 'outline'}
                size="sm"
                className="rounded-full"
              >
                Vor der Geburt
              </Button>
              <Button
                onClick={() => setActiveCategory('Nach der Geburt')}
                variant={activeCategory === 'Nach der Geburt' ? 'default' : 'outline'}
                size="sm"
                className="rounded-full"
              >
                Nach der Geburt
              </Button>
              <Button
                onClick={() => setActiveCategory('Yoga')}
                variant={activeCategory === 'Yoga' ? 'default' : 'outline'}
                size="sm"
                className="rounded-full"
              >
                Yoga
              </Button>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {filteredKurse.map((kurs, index) => {
                const courseWithUrl = kurs as Course;
                return (
                  <AccordionItem key={index} value={`item-${index}`} className="border-amber-200">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex-1">
                        <span className="font-serif text-2xl text-left block">{courseWithUrl.name}</span>
                        <div className="mt-2 flex gap-2 flex-wrap">
                          {courseWithUrl.categories.map((cat, i) => (
                            <Tag key={i}>{cat}</Tag>
                          ))}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <p className="text-gray-600 mb-4 leading-relaxed whitespace-pre-line">
                        {courseWithUrl.description}
                      </p>
                      {courseWithUrl.url ? (
                        <a href={courseWithUrl.url} target="_blank" rel="noopener noreferrer">
                          <Button className="bg-primary hover:bg-primary/90">
                            Zur Anmeldung
                          </Button>
                        </a>
                      ) : (
                        <Button
                          className="bg-primary hover:bg-primary/90"
                          onClick={() => navigate('/', { state: { scrollTo: 'contact' } })}
                        >
                          Kontakt aufnehmen
                        </Button>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        )}

        {activeTab === 'wochenplan' && (
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-serif mb-4 text-center">Wochenplan</h3>

            {/* Info Banner */}
            <div className="bg-amber-50 rounded-lg p-4 mb-8 max-w-3xl mx-auto flex gap-3">
              <Info className="w-5 h-5 text-amber-600 flex-shrink-0 self-start -translate-y-[0.1rem]" />
              <p className="text-sm text-gray-700 leading-5">
                <span className="font-medium text-gray-900">Üblicher Zeitplan:</span> Klicke auf einen Kurs für die aktuellen Termine und Anmeldung
              </p>
            </div>

            <div className="bg-amber-50 rounded-lg p-6">
              <div className="grid grid-cols-1 gap-4">
                {(['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'] as Weekday[]).map(tag => (
                  <div key={tag} className="bg-white rounded-lg p-4">
                    <h4 className="font-serif text-lg mb-4 border-b pb-2">{tag}</h4>
                    <div className="space-y-2">
                      {scheduleWithDetails
                        .filter(entry => entry.weekday === tag)
                        .map((entry, index) => (
                          <div
                            key={index}
                            className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-0 p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => handleScheduleEntryClick(entry.courseUrl)}
                          >
                            <span className="font-medium">{entry.startTime} - {entry.endTime}</span>
                            <span className="text-gray-700">{entry.courseName}</span>
                          </div>
                        ))}
                      {scheduleWithDetails.filter(entry => entry.weekday === tag).length === 0 && (
                        <p className="text-gray-500 text-sm italic">Keine Termine</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Kurse;