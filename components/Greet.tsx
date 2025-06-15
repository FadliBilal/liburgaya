import { useState, useEffect } from 'react';
import Image from 'next/image';
import RealTime from '@/components/Realtime';
import dataHolidays from '../data/2023.json';

interface Holiday {
  date: string;
  name: string;
}

export default function Greet() {
  const [loading, setLoading] = useState(true);
  const [isHoliday, setIsHoliday] = useState(false);
  const [holidayName, setHolidayName] = useState('');

  useEffect(() => {
    const checkTodayStatus = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const dayOfWeek = today.getDay(); // 0 = Minggu, 6 = Sabtu
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      const todayPublicHoliday = (dataHolidays as Holiday[]).find((holiday) => {
        const holidayDate = new Date(holiday.date);
        holidayDate.setHours(0, 0, 0, 0);
        return holidayDate.getTime() === today.getTime();
      });

      const finalIsHoliday = isWeekend || !!todayPublicHoliday;
      setIsHoliday(finalIsHoliday);

      if (todayPublicHoliday && isWeekend) {
        setHolidayName(`Libur Akhir Pekan & ${todayPublicHoliday.name}`);
      } else if (todayPublicHoliday) {
        setHolidayName(todayPublicHoliday.name);
      } else if (isWeekend) {
        setHolidayName('Libur Akhir Pekan');
      } else {
        setHolidayName('Saatnya Bekerja 💪');
      }

      setLoading(false);
    };

    checkTodayStatus();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <svg
          className="h-12 w-12 animate-spin text-slate-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className="mt-4 text-slate-500">Mengecek kalender...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-4 text-center text-5xl font-bold sm:text-6xl md:text-7xl">
        Hari ini
        {isHoliday ? (
          <span className="ml-3 text-green-500">Libur</span>
        ) : (
          <span className="ml-3 text-sky-600">Kerja</span>
        )}
        !
      </h1>

      <div className="h-64 w-64 md:h-80 md:w-80">
        <Image
          src={isHoliday ? '/sleep.gif' : '/work.gif'}
          alt={isHoliday ? 'GIF sedang tidur' : 'GIF sedang bekerja'}
          width={400}
          height={400}
          priority
          unoptimized
        />
      </div>

      <div className="mt-4 text-center text-lg md:text-xl">
        <p className={isHoliday ? 'font-semibold text-green-500' : 'font-semibold text-sky-600'}>
          {holidayName}
        </p>
        <div className="mt-1 text-base text-slate-500">
          <RealTime />
        </div>
      </div>
    </div>
  );
}
