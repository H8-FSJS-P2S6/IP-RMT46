import Map from "../components/Leaflet";


export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-5 text-center">Selamat datang di MedShop</h1>
      <p className="text-lg text-gray-700 mb-4 text-justify">
        Destinasi Anda untuk kesehatan dan kesejahteraan. Kami menyediakan
        akses mudah dan aman ke berbagai produk kesehatan berkualitas tinggi,
        mulai dari obat-obatan hingga produk perawatan diri.
      </p>
      <p className="text-lg text-gray-700 mb-4 text-justify">
        Dengan layanan yang cepat dan ramah, kami bertekad untuk memastikan Anda
        mendapatkan perawatan yang Anda butuhkan dengan nyaman dan efisien.
        Temukan solusi kesehatan terbaik untuk Anda dan keluarga di Apotik
        Online kami.
      </p>
      <Map />
    </div>
  );
}
