import { type CourseId } from './courses';

export type Weekday = 'Montag' | 'Dienstag' | 'Mittwoch' | 'Donnerstag' | 'Freitag';

export interface WeeklyScheduleEntry {
    courseId: CourseId;
    weekday: Weekday;
    startTime: string; // Format: "HH:MM"
    endTime: string;   // Format: "HH:MM"
}

export const weeklySchedule: WeeklyScheduleEntry[] = [
    {
        courseId: "schwangerschafts-yoga",
        weekday: "Montag",
        startTime: "09:00",
        endTime: "10:00"
    },
    {
        courseId: "rueckbildungs-yoga",
        weekday: "Montag",
        startTime: "18:00",
        endTime: "19:00"
    },
    {
        courseId: "geburtsvorbereitung",
        weekday: "Dienstag",
        startTime: "10:00",
        endTime: "11:30"
    },
    {
        courseId: "babymassage",
        weekday: "Mittwoch",
        startTime: "09:30",
        endTime: "10:30"
    },
    {
        courseId: "krabbelgruppe",
        weekday: "Mittwoch",
        startTime: "16:00",
        endTime: "17:00"
    },
    {
        courseId: "schwangerschafts-yoga",
        weekday: "Donnerstag",
        startTime: "09:00",
        endTime: "10:00"
    },
    {
        courseId: "rueckbildung",
        weekday: "Donnerstag",
        startTime: "18:00",
        endTime: "19:00"
    },
    {
        courseId: "trageberatung",
        weekday: "Freitag",
        startTime: "11:00",
        endTime: "12:00"
    },
];

