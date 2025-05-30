import NavBar from "@/app/components/navbar/navbar";
import { auth } from "@/auth";
import { User } from "@prisma/client";
import Link from "next/link";
import { GitHubIcon, LinkedInIcon } from "./components/icons";

export default async function Home() {
  const session = await auth();
  const user = session?.user as unknown as User | undefined;

  return (
    <>
      <NavBar />
      <main>
        <div className="flex flex-col p-2 px-4 md:p-4 md:px-8">
          <div className="mt-12 mb-12 px-2">
            <div>
              <div className="mb-3">
                <h1 className="text-4xl md:text-5xl font-bold">
                  Timers For Any Activity
                </h1>
              </div>
              <div className="mb-6">
                <p className="text-lg">
                  Create customizable timer series for studying, workouts,
                  cooking, presentations, or any timed activity.
                </p>
              </div>
              <div>
                {!user ? (
                  <Link className="btn btn-primary btn-lg" href="/register">
                    Start For Free
                  </Link>
                ) : (
                  <Link className="btn btn-primary btn-lg" href="/series">
                    Continue For Free
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="mb-12 mt-12">
            <div>
              <h2 className="text-2xl font-bold text-center mb-5 p-3">
                Features
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-2">
              <div className="bg-base-300 rounded-lg p-5 w-full">
                <div className="text-4xl mb-2">⏱️</div>
                <div className="mb-2">
                  <h3 className="text-xl font-bold">Sequential Timers</h3>
                </div>
                <div className="mb-2">
                  <p>
                    Create and save multiple timer sequences for different
                    activities.
                  </p>
                </div>
              </div>
              <div className="bg-base-300 rounded-lg p-5 w-full">
                <div className="text-4xl mb-2">😴</div>
                <div className="mb-2">
                  <h3 className="text-xl font-bold">Customizable Intervals</h3>
                </div>
                <div className="mb-2">
                  <p>
                    Each timer includes a main timer followed by an optional
                    interval timer, perfect for rest between study sessions or
                    workouts.
                  </p>
                </div>
              </div>
              <div className="bg-base-300 rounded-lg p-5 w-full">
                <div className="text-4xl mb-2">⏭️</div>
                <div className="mb-2">
                  <h3 className="text-xl font-bold">Skip & Reset Functions</h3>
                </div>
                <div className="mb-2">
                  <p>
                    Easily skip timers or intervals, or reset them as needed.
                  </p>
                </div>
              </div>
              <div className="bg-base-300 rounded-lg p-5 w-full">
                <div className="text-4xl mb-2">🌘</div>
                <div className="mb-2">
                  <h3 className="text-xl font-bold">Dark Mode</h3>
                </div>
                <div className="mb-2">
                  <p>Easy on the eyes or bright and clear.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-12 mt-12 bg-base-200 rounded-lg">
            <div>
              <h2 className="text-2xl font-bold text-center mb-5 mt-6 p-3">
                Perfect For Timed Activities
              </h2>
            </div>
            <div className="flex flex-row flex-wrap p-3 pb-6">
              <div className="bg-base-100 text-center rounded-lg p-5 mt-3 md:ml-3 w-full md:w-[48%]">
                <div className="text-4xl mb-2 ">📚</div>
                <div className="mb-2">
                  <h3 className="text-xl font-bold">Study with Pomodoro</h3>
                </div>
                <div className="mb-2">
                  <p className="min-h-24">
                    Boost your productivity and maintain focus with customizable
                    Pomodoro timing. Create the perfect study-break balance for
                    your learning style.
                  </p>
                </div>
                <div className="bg-base-300 rounded-lg p-3">
                  <h4 className="text-md font-bold">Example Setup:</h4>
                  <p>
                    25min Focus → 5min Break → 25min Focus → 5min Break → 25min
                    Focus → 15min Long Break
                  </p>
                </div>
              </div>
              <div className="bg-base-100 text-center rounded-lg p-5 mt-3 md:ml-3 w-full md:w-[48%]">
                <div className="text-4xl mb-2 ">💪</div>
                <div className="mb-2">
                  <h3 className="text-xl font-bold">Workout Sessions</h3>
                </div>
                <div className="mb-2">
                  <p className="min-h-24">
                    Perfect for HIIT sessions, circuit training, and interval
                    workouts. Focus on performance, not the clock.
                  </p>
                </div>
                <div className="bg-base-300 rounded-lg p-3">
                  <h4 className="text-md font-bold">Example Setup:</h4>
                  <p>
                    30sec High Intensity → 15sec Rest → 30sec High Intensity →
                    15sec Rest → 1min Active Recovery
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center mb-12 mt-12">
            <div className="mb-10">
              <h2 className="font-bold text-3xl">Get Started Now ⏱️</h2>
            </div>
            <div>
              {!user ? (
                <Link className="btn btn-primary btn-lg" href="/register">
                  Start For Free
                </Link>
              ) : (
                <Link className="btn btn-primary btn-lg" href="/series">
                  Continue For Free
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className="bg-base-200">
          <div className="p-10 md:p-16">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold">Timer App</h3>
                <p className="text-sm">
                  Designed and developed by{" "}
                  <a
                    className="link"
                    href="https://thomasrainford.dev"
                    target="_blank"
                  >
                    <b>Thomas Rainford</b>
                  </a>
                </p>
                <div className="flex flex-row mt-3">
                  <div className="mr-4">
                    <a href="https://github.com/ThomasRainford" target="_blank">
                      <GitHubIcon className="fill-accent" size={7} />
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.linkedin.com/in/thomasrainford/"
                      target="_blank"
                    >
                      <LinkedInIcon className="fill-accent" size={7} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
