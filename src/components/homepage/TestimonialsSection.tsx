interface Testimonial {
    name:String,
    title:String,
    company:String,
    comment:String
}


export default function TestimonialsSection() {
  const testimonials:Testimonial[] = [
    {
      name: "Ahmet Kaya",
      title: "E-ticaret Uzmanı", 
      company: "XXXXX",
      comment: "PriceSyncPro sayesinde satışlarımız %35 arttı!"
    },
    {
      name: "Merve Özkan",
      title: "Pazarlama Müdürü",
      company: "XXXXX", 
      comment: "Gerçek zamanlı takip işimizi çok kolaylaştırdı."
    },
    {
      name: "Can Demir",
      title: "İşletme Sahibi",
      company: "XXX",
      comment: "Otomatik fiyatlandırma ile ROI'miz %200 arttı!"
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Müşterilerimiz Diyor Ki
          </h2>
          <p className="text-lg text-gray-600">
            <strong>10,000+</strong> işletme PriceSyncPro ile büyüyor
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-700 mb-4 italic">
                "{testimonial.comment}"
              </p>
              <div>
                <div className="font-bold text-gray-900">{testimonial.name}</div>
                <div className="text-gray-600 text-sm">{testimonial.title}</div>
                <div className="text-gray-500 text-sm">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}