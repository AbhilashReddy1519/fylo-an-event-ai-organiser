import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className="pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* left */}
          <div className="text-center sm:text-left">
            <span className="text-white font-light tracking-wide mb-6">
              Fylo <span className="text-pink-500">*</span>
            </span>

            <h1 className="text-5xl sm:text-6xl md:text-[69px] mb-4">
              Explore{' '}
              <span className="bg-linear-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
                events
              </span>
              , host effortlessly
              <br /> & connect{' '}
              <span className="bg-linear-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
                deeply
              </span>
              .
            </h1>

            <p className="text-lg sm:text-xl sm:text-left text-center  mb-12 text-[#dcd3dc] max-w-lg font-light">
              Whether you&apos;re hosting or attending, Fylo turns every event
              into an unforgettable experience — and you&apos; re invited to
              build the future with us.
            </p>

            <Link href={'/explore'}>
              <Button size={'xl'} className={'cursor-pointer'}>Get Started</Button>
            </Link>
          </div>
          {/* right */}
          <div className="flex justify-center items-center">
            <video
              src="/phone-dark.webm"
              width={'100%'}
              height={'auto'}
              loop
              muted
              autoPlay
              className="sm:h-3/4 px-6 sm:w-3/4 lg:w-full lg:h-full"
            ></video>
          </div>
        </div>
      </section>
    </>
  );
}
