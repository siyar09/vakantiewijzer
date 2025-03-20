import React, { useState } from 'react';
import './FAQSection.css';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      category: 'Over de Quiz',
      questions: [
        {
          question: 'Hoe werkt de keuzehulp?',
          answer: 'De keuzehulp helpt je bij het vinden van de perfecte vakantiebestemming door middel van een slimme vragenlijst die jouw voorkeuren analyseert.',
        },
        {
          question: 'Is de keuzehulp gratis?',
          answer: 'Ja, de keuzehulp is gratis. De keuzehulp is alleen te gebruiken voor gebruikers die lid van VakantieWijzer zijn.',
        },
        {
          question: 'Hoe lang duurt de keuzehulp?',
          answer: 'De keuzehulp duurt ongeveer 2 minuten om te voltooien.',
        },
        {
          question: 'Kan ik de keuzehulp opnieuw doen?',
          answer: 'Ja, je kunt de keuzehulp zo vaak doen als je wilt.',
        },
      ],
    },
    {
      category: 'Over de bestemmingen',
      questions: [
        {
          question: 'Welke bestemmingen zijn beschikbaar?',
          answer: 'We bieden een breed scala aan bestemmingen over heel de wereld, van zonnige stranden tot avontuurlijke stedentrips.',
        },
        {
          question: 'Kan ik mijn favoriete bestemmingen opslaan?',
          answer: 'Ja, je kunt je favoriete bestemmingen opslaan door een account aan te maken en in te loggen. Je kunt een favoriet toevoegen door op het hartpictogram te klikken, bij de bestemmingen waar je op klikt.',
        },
        {
          question: 'Hoe vaak worden nieuwe bestemmingen toegevoegd?',
          answer: 'We voegen regelmatig nieuwe bestemmingen toe, dus houd onze website in de gaten voor updates.',
        },
        {
          question: 'Kan ik bestemmingen filteren op basis van mijn voorkeuren?',
          answer: 'Ja, je kunt bestemmingen filteren op basis van verschillende criteria zoals budget, beste reisperiode en sorteren op alfabet.',
        },
      ],
    },
    {
      category: 'Over Kosten & Boekingen',
      questions: [
        {
          question: 'Kan ik direct via VakantieWijzer boeken?',
          answer: 'Nee, wij helpen je alleen met het vinden van een bestemming. We geven je wel tips over hoe je jouw reis kunt plannen en boeken.',
        },
        {
          question: 'Zijn er kosten verbonden aan het gebruik van VakantieWijzer?',
          answer: 'Nee, het gebruik van VakantieWijzer is volledig gratis.',
        },
        {
          question: 'Bieden jullie kortingen of aanbiedingen?',
          answer: 'Nee, we bieden geen speciale aanbiedingen of kortingen voor bepaalde bestemmingen.',
        },
        {
          question: 'Hoe kan ik mijn boeking annuleren?',
          answer: 'Omdat we zelf geen boekingen doen, moet je contact opnemen met de aanbieder waar je hebt geboekt om je boeking te annuleren.',
        },
      ],
    },
    {
      category: 'Technische Vragen',
      questions: [
        {
          question: 'Hoe kan ik mijn wachtwoord resetten?',
          answer: 'Je kunt je wachtwoord resetten door naar "Mijn Account" te gaan, vervolgens "Accountoverzicht" te openen en daar op "Wachtwoord wijzigen" te klikken.',
        },
        {
          question: 'Hoe kan ik contact opnemen met de klantenservice?',
          answer: 'Je kunt contact opnemen met de klantenservice via onze mailadress: info@vakantiewijzer.nl.',
        },
        {
          question: 'Welke browsers worden ondersteund?',
          answer: 'Onze website werkt het beste op de nieuwste versies van Chrome, Firefox, Safari en Edge.',
        },
        {
          question: 'Hoe kan ik een technische fout melden?',
          answer: 'Je kunt een technische fout melden door contact op te nemen met onze klantenservice en een gedetailleerde beschrijving van het probleem te geven.',
        },
      ],
    },
  ];

  return (
    <section className="faq-section">
      <h2>FAQ - Veelgestelde Vragen</h2>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          onClick={() => toggleFAQ(index)}
        >
          <div className="faq-category">
            {activeIndex === index ? '-' : '+'} {faq.category}
          </div>
          {activeIndex === index && (
            <div className="faq-questions">
              {faq.questions.map((q, i) => (
                <div key={i} className="faq-question-answer">
                  <div className="faq-question">{q.question}</div>
                  <div className="faq-answer">{q.answer}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default FAQSection;