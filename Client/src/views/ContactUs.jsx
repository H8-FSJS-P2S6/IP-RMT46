import { useState } from "react";

export default function ContactUs() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {!isSubmitted ? (
        <>
          <h1 className="text-3xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-lg text-gray-700 mb-4">
            Apakah Anda memiliki pertanyaan atau masukan? Jangan ragu untuk
            menghubungi kami melalui formulir kontak di bawah ini.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <input
                type="text"
                placeholder="Nama"
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md"
              />
              <input
                type="email"
                placeholder="Email"
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md"
              />
            </div>
            <textarea
              placeholder="Pesan"
              className="w-full py-2 px-4 border border-gray-300 rounded-md"
              rows="5"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Kirim
            </button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Terima Kasih!</h2>
          <p>Pesan Anda telah berhasil dikirim. Kami akan segera merespons.</p>
        </div>
      )}
    </div>
  );
}
