import { useState } from 'react';
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

const Kurse = () => {
  const [activeTab, setActiveTab] = useState<'alle' | 'wochenplan'>('alle');

  const kurse = [
    "Schwangerschafts-Yoga",
    "Rückbildungs-Yoga", 
    "Rückbildung",
    "Babymassage",
    "Geburtsvorbereitung",
    "Trageberatung",
    "Krabbelgruppe"
  ];

  const wochenplan = [
    { tag: "Montag", zeit: "09:00 - 10:00", kurs: "Schwangerschafts-Yoga" },
    { tag: "Montag", zeit: "18:00 - 19:00", kurs: "Rückbildungs-Yoga" },
    { tag: "Dienstag", zeit: "10:00 - 11:30", kurs: "Geburtsvorbereitung" },
    { tag: "Mittwoch", zeit: "09:30 - 10:30", kurs: "Babymassage" },
    { tag: "Mittwoch", zeit: "16:00 - 17:00", kurs: "Krabbelgruppe" },
    { tag: "Donnerstag", zeit: "09:00 - 10:00", kurs: "Schwangerschafts-Yoga" },
    { tag: "Donnerstag", zeit: "18:00 - 19:00", kurs: "Rückbildung" },
    { tag: "Freitag", zeit: "11:00 - 12:00", kurs: "Trageberatung" },
  ];

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
              variant={activeTab === 'alle' ? 'default' : 'ghost'}
              className={`px-6 py-2 rounded-md ${
                activeTab === 'alle' 
                  ? 'bg-white shadow-sm' 
                  : 'hover:bg-white/50'
              }`}
            >
              Alle Kurse
            </Button>
            <Button
              onClick={() => setActiveTab('wochenplan')}
              variant={activeTab === 'wochenplan' ? 'default' : 'ghost'}
              className={`px-6 py-2 rounded-md ${
                activeTab === 'wochenplan' 
                  ? 'bg-white shadow-sm' 
                  : 'hover:bg-white/50'
              }`}
            >
              Wochenplan
            </Button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'alle' && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-serif mb-8 text-center">Unsere Kursangebote</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kurse.map((kurs, index) => (
                <div key={index} className="bg-amber-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                  <h4 className="font-serif text-lg mb-2">{kurs}</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Informationen und Anmeldung über unser Kontaktformular.
                  </p>
                  <Button variant="outline" size="sm" className="border-amber-300 hover:bg-amber-100">
                    Mehr erfahren
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'wochenplan' && (
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-serif mb-8 text-center">Wochenplan</h3>
            <div className="bg-amber-50 rounded-lg p-6">
              <div className="grid grid-cols-1 gap-4">
                {['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'].map(tag => (
                  <div key={tag} className="bg-white rounded-lg p-4">
                    <h4 className="font-serif text-lg mb-4 border-b pb-2">{tag}</h4>
                    <div className="space-y-2">
                      {wochenplan
                        .filter(termin => termin.tag === tag)
                        .map((termin, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="font-medium">{termin.zeit}</span>
                            <span className="text-gray-700">{termin.kurs}</span>
                          </div>
                        ))}
                      {wochenplan.filter(termin => termin.tag === tag).length === 0 && (
                        <p className="text-gray-500 text-sm italic">Keine Termine</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Änderungen vorbehalten. Aktuelle Termine und Anmeldung über unser Kontaktformular.
                </p>
                <Button className="bg-primary hover:bg-primary/90">
                  Zur Anmeldung
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Kurse;