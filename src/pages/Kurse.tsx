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
    <div className="min-h-screen bg-background">
      <Header />
      <PageHeader title="Kurse" />

      <div className="container mx-auto px-6 pt-0 pb-16">
        {/* Segment Control */}
        <div className="flex justify-center mb-6">
          <div className="bg-warm rounded-lg p-1 inline-flex text-white">
            <Button
              onClick={() => setActiveTab('alle')}
              variant="ghost"
              className={`px-6 py-2 rounded-md font-medium select-none touch-manipulation [-webkit-tap-highlight-color:transparent] transition-colors ${activeTab === 'alle'
                ? 'bg-white text-black shadow-sm hover:bg-white hover:text-black active:bg-white focus:bg-white'
                : 'text-white hover:bg-white/15 hover:text-white active:bg-transparent focus:bg-transparent'
                }`}
            >
              Alle Kurse
            </Button>
            <Button
              onClick={() => setActiveTab('wochenplan')}
              variant="ghost"
              className={`px-6 py-2 rounded-md font-medium select-none touch-manipulation [-webkit-tap-highlight-color:transparent] transition-colors ${activeTab === 'wochenplan'
                ? 'bg-white text-black shadow-sm hover:bg-white hover:text-black active:bg-white focus:bg-white'
                : 'text-white hover:bg-white/15 hover:text-white active:bg-transparent focus:bg-transparent'
                }`}
            >
              Wochenplan
            </Button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'alle' && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              {/* Category Filters */}
              <div className="flex justify-center mb-8 gap-2 flex-wrap">
                <Button
                  onClick={() => setActiveCategory('')}
                  variant={activeCategory === '' ? 'default' : 'outline'}
                  size="sm"
                  className={`rounded-full ${activeCategory === '' ? 'bg-white text-black hover:bg-gray-100 hover:text-black border border-gray-200' : ''}`}
                >
                  Alle
                </Button>
                <Button
                  onClick={() => setActiveCategory('Vor der Geburt')}
                  variant={activeCategory === 'Vor der Geburt' ? 'default' : 'outline'}
                  size="sm"
                  className={`rounded-full ${activeCategory === 'Vor der Geburt' ? 'bg-white text-black hover:bg-gray-100 hover:text-black border border-gray-200' : ''}`}
                >
                  Vor der Geburt
                </Button>
                <Button
                  onClick={() => setActiveCategory('Nach der Geburt')}
                  variant={activeCategory === 'Nach der Geburt' ? 'default' : 'outline'}
                  size="sm"
                  className={`rounded-full ${activeCategory === 'Nach der Geburt' ? 'bg-white text-black hover:bg-gray-100 hover:text-black border border-gray-200' : ''}`}
                >
                  Nach der Geburt
                </Button>
                <Button
                  onClick={() => setActiveCategory('Yoga')}
                  variant={activeCategory === 'Yoga' ? 'default' : 'outline'}
                  size="sm"
                  className={`rounded-full ${activeCategory === 'Yoga' ? 'bg-white text-black hover:bg-gray-100 hover:text-black border border-gray-200' : ''}`}
                >
                  Yoga
                </Button>
              </div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {filteredKurse.map((kurs, index) => {
                  const courseWithUrl = kurs as Course;
                  return (
                    <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg p-4 border-0 [&:not(:last-child)]:mb-0">
                      <AccordionTrigger className="hover:no-underline py-2">
                        <div className="flex-1 text-left">
                          <span className="font-serif text-2xl block">{courseWithUrl.name}</span>
                          <div className="mt-2 flex gap-2 flex-wrap">
                            {courseWithUrl.categories.map((cat, i) => (
                              <Tag key={i}>{cat}</Tag>
                            ))}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pt-0">
                        <p className="text-gray-600 mb-4 leading-relaxed whitespace-pre-line">
                          {courseWithUrl.description}
                        </p>
                        {courseWithUrl.url ? (
                          <a href={courseWithUrl.url} target="_blank" rel="noopener noreferrer">
                            <Button>
                              Zur Anmeldung
                            </Button>
                          </a>
                        ) : (
                          <Button
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
          </div>
        )}

        {activeTab === 'wochenplan' && (
          <div className="max-w-6xl mx-auto">
            {/* Info Banner */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-lg p-4 inline-flex items-start gap-3 text-black border border-gray-200">
                <Info className="w-5 h-5 flex-shrink-0 -translate-y-[0.1rem] text-warm" />
                <p className="text-sm leading-5">
                  <span className="font-medium">Üblicher Zeitplan:</span> Klicke auf einen Kurs für die aktuellen Termine und Anmeldung
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="grid grid-cols-1 gap-4">
                {(['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'] as Weekday[]).map(tag => (
                  <div key={tag} className="bg-background rounded-lg p-4 text-gray-900">
                    <h4 className="font-serif text-xl font-semibold mb-4 border-b border-gray-200 pb-2 text-warm">{tag}</h4>
                    <div className="space-y-2">
                      {scheduleWithDetails
                        .filter(entry => entry.weekday === tag)
                        .map((entry, index) => (
                          <div
                            key={index}
                            className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-0 p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => handleScheduleEntryClick(entry.courseUrl)}
                          >
                            <span className="font-medium text-gray-900">{entry.startTime} - {entry.endTime}</span>
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