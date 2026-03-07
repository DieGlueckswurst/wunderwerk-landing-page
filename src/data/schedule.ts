import { type CourseId } from './courses';

export type Weekday = 'Montag' | 'Dienstag' | 'Mittwoch' | 'Donnerstag' | 'Freitag' | 'Samstag' | 'Sonntag';

export interface WeeklyScheduleEntry {
    courseId: CourseId;
    weekday: Weekday;
    startTime: string; // Format: "HH:MM"
    endTime: string;   // Format: "HH:MM"
}

export const weeklySchedule: WeeklyScheduleEntry[] = [
    // Montag: leer (Tag wird trotzdem angezeigt)
    {
        courseId: "krabbelgruppe-0-6",
        weekday: "Dienstag",
        startTime: "10:00",
        endTime: "12:00"
    },
    {
        courseId: "schwangerschafts-yoga",
        weekday: "Dienstag",
        startTime: "16:30",
        endTime: "17:30"
    },
    {
        courseId: "schwangerschafts-yoga",
        weekday: "Dienstag",
        startTime: "18:00",
        endTime: "19:00"
    },
    {
        courseId: "krabbelgruppe-6-12",
        weekday: "Mittwoch",
        startTime: "10:00",
        endTime: "12:00"
    },
    {
        courseId: "babymassage-praxis-just",
        weekday: "Mittwoch",
        startTime: "11:15",
        endTime: "12:00"
    },
    {
        courseId: "rueckbildung",
        weekday: "Mittwoch",
        startTime: "18:00",
        endTime: "19:15"
    },
    {
        courseId: "krabbelgruppe-12-plus",
        weekday: "Donnerstag",
        startTime: "15:00",
        endTime: "17:00"
    },
    {
        courseId: "lunch-yoga",
        weekday: "Donnerstag",
        startTime: "12:15",
        endTime: "13:00"
    },
    {
        courseId: "after-work-yoga",
        weekday: "Donnerstag",
        startTime: "18:00",
        endTime: "19:00"
    },
    {
        courseId: "babymassage",
        weekday: "Freitag",
        startTime: "10:00",
        endTime: "10:45"
    },
    {
        courseId: "geburtsvorbereitung",
        weekday: "Samstag",
        startTime: "10:00",
        endTime: "15:00"
    },
    {
        courseId: "geburtsvorbereitung",
        weekday: "Sonntag",
        startTime: "10:00",
        endTime: "15:00"
    },
    {
        courseId: "kinder-yoga",
        weekday: "Sonntag",
        startTime: "11:30",
        endTime: "12:30"
    },
];
