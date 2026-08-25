

function App() {
  return (
   <main className="min-h-screen bg-slate-950 text-white">

{/* Header */}
    <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          
          <h1 className="text-xl font-semibold">
            Weather App
          </h1>

 {/* Search */}
        <div className="flex w-full max-w-md">
            <input
              type="text"
              placeholder="Search for a city..."
              className="w-full rounded-l-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm outline-none focus:border-blue-400"
            />

            <button className="rounded-r-full bg-blue-600 px-6 hover:bg-blue-500">
              Search
            </button>
          </div>

        </div>
      </header>

   {/* Main Content */}
    <div className="mx-auto max-w-7xl px-6 py-10">

       {/* Current Weather */}
        <section className="grid gap-10 border-b border-slate-800 pb-12 md:grid-cols-2">
        
         <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Orlando
            </p>

            <div className="mt-4 flex items-start">
              <span className="text-8xl font-light">
                63
              </span>

              <span className="mt-4 text-3xl text-slate-400">
                °F
              </span>
            </div>

            <p className="mt-2 text-2xl text-slate-300">
              Partly Cloudy
            </p>

            <p className="mt-3 text-slate-500" >
              Feels like 59°
            </p>
          </div>


  {/* Weather Details */}
          <div className="grid grid-cols-2 gap-4">
             <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6">
              <p className="text-sm uppercase tracking-wider text-blue-400">
                Humidity
              </p>
              <p className="mt-2 text-2xl font-semibold">
                78%
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6">
              <p className="text-sm uppercase tracking-wider text-blue-400">
                Wind
              </p>
              <p className="mt-2 text-2xl font-semibold">
                12 mph
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6">
              <p className="text-sm uppercase tracking-wider text-blue-400">
                Visibility
              </p>
              <p className="mt-2 text-2xl font-semibold">
                10 mi
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6">
              <p className="text-sm uppercase tracking-wider text-blue-400">
                UV Index
              </p>
              <p className="mt-2 text-2xl font-semibold">
                4
              </p>
            </div>

          </div>

        </section>
</div>



{/* Hourly Forecast */}
        <section className="py-10">

          <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-blue-400">
            Hourly Forecast
          </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">

            {[
              ["9 AM", "☀️", "58°"],
              ["12 PM", "🌤️", "63°"],
              ["3 PM", "🌤️", "65°"],
              ["6 PM", "🌙", "61°"],
              ["9 PM", "🌙", "56°"],
              ["12 AM", "🌙", "54°"],
            ].map(([time, icon, temperature]) => (
              <div
                key={time}
                className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 text-center"
              >
                <p className="text-sm text-slate-400">
                  {time}
                </p>

                <p className="my-5 text-3xl">
                  {icon}
                </p>

                <p className="text-xl font-semibold">
                  {temperature}
                </p>
              </div>
            ))}

          </div>
        </section>  


    {/* 5-Day Forecast */}
        <section>

          <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-blue-400">
            5-Day Forecast
          </h2>

          <div className="space-y-3">

            {[
              ["Mon", "🌤️", "Cloudy", "52°", "65°"],
              ["Tue", "☀️", "Sunny", "54°", "68°"],
              ["Wed", "🌧️", "Rainy", "50°", "60°"],
              ["Thu", "☁️", "Cloudy", "49°", "59°"],
              ["Fri", "🌤️", "Partly Cloudy", "51°", "63°"],
            ].map(([day, icon, condition, low, high]) => (
              <div
                key={day}
                className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/60 px-6 py-5"
              >

                <div className="flex items-center gap-5">
                  <span className="w-10 font-semibold">
                    {day}
                  </span>

                  <span className="text-2xl">
                    {icon}
                  </span>

                  <span className="text-slate-400">
                    {condition}
                  </span>
                </div>

                <div className="flex gap-5">
                  <span className="text-slate-500">
                    {low}
                  </span>

                  <span className="font-semibold">
                    {high}
                  </span>
                </div>

              </div>
            ))}

          </div>

        </section>

               
   
   </main>
  )
}

export default App
