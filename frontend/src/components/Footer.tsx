export default function Footer() {
  return (
    <footer className="mt-12 py-6 border-t border-gray-300 text-center text-gray-600">
      <p className="text-sm">
        © Pratik Patil | Powered by{" "}
        <a
          href="https://openweathermap.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          OpenWeather API
        </a>
      </p>
    </footer>
  );
}
