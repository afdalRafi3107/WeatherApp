export function WeatherCard({ data }) {
  const iconCode = data?.weather?.[0]?.icon;
  const iconUrl = iconCode
    ? `https://openweathermap.org/img/wn/${iconCode}@4x.png`
    : "";

  if (!data) {
    return (
      <div className="w-full mt-10 max-w-xl p-6">
        <div className="text-2xl font-semibold text-center text-gray-300 p-8 border border-dashed border-cyan-500/30 rounded-3xl bg-white/5 shadow-[0_0_20px_rgba(56,189,248,0.2)] backdrop-blur-md">
          Enter a city above to see the weather forecast!
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-purple-900/50 via-blue-900/30 to-transparent backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_35px_rgba(147,51,234,0.3)] p-8 text-white w-full transform hover:scale-[1.02] transition-all duration-300 ease-in-out overflow-hidden">
      {/* subtle glowing overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 blur-3xl"></div>

      <div className="relative z-10">
        <h2 className="text-4xl font-extrabold p-1 text-center mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]">
          {data.name}
        </h2>

        <div className="flex items-center justify-between space-x-4 mb-6 border-b border-white/20 pb-6">
          <div className="flex flex-col items-start min-w-[120px]">
            {iconUrl && (
              <img
                src={iconUrl}
                alt={data.weather[0].description}
                className="w-24 h-24 drop-shadow-[0_0_20px_rgba(147,51,234,0.4)]"
              />
            )}
            <p className="text-xl font-medium capitalize mt-[-10px] text-cyan-200 drop-shadow">
              {data.weather[0].description}
            </p>
          </div>

          <div className="text-7xl font-light text-right text-white drop-shadow-[0_0_10px_rgba(147,51,234,0.4)]">
            {Math.round(data.main.temp)}°C
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-4 bg-white/10 rounded-2xl shadow-[inset_0_0_15px_rgba(56,189,248,0.2)] backdrop-blur-sm hover:bg-white/15 transition-all duration-200">
            <p className="text-2xl font-semibold text-cyan-300">
              {data.main.humidity}%
            </p>
            <p className="text-sm font-light text-gray-300 mt-1 tracking-wide">
              Humidity
            </p>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl shadow-[inset_0_0_15px_rgba(147,51,234,0.2)] backdrop-blur-sm hover:bg-white/15 transition-all duration-200">
            <p className="text-2xl font-semibold text-purple-300">
              {Math.round(data.wind.speed)} m/s
            </p>
            <p className="text-sm font-light text-gray-300 mt-1 tracking-wide">
              Wind Speed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
