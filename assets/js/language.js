class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'tr';
        this.translations = {};
        this.init();
    }

    async init() {
        // Dil dosyalarını yükle
        await this.loadTranslations('tr');
        await this.loadTranslations('en');

        // Dil değiştirme butonlarını dinle
        document.querySelectorAll('.lang-link').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = e.target.getAttribute('data-lang');
                this.changeLanguage(lang);
            });
        });

        // Sayfa yüklendiğinde mevcut dili uygula
        this.applyLanguage(this.currentLang);

        // FAQ Section
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Tüm FAQ öğelerini kapat
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Tıklanan öğeyi aç (eğer zaten açık değilse)
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });
    }

    async loadTranslations(lang) {
        try {
            const response = await fetch(`assets/lang/${lang}.json`);
            this.translations[lang] = await response.json();
        } catch (error) {
            console.error(`Error loading ${lang} translations:`, error);
        }
    }

    async changeLanguage(lang) {
        if (this.currentLang === lang) return;
        
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Dil butonlarının aktif durumunu güncelle
        document.querySelectorAll('.lang-link').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        await this.applyLanguage(lang);
    }

    async applyLanguage(lang) {
        const t = this.translations[lang];
        if (!t) return;

        // Navigation
        document.querySelector('[data-lang-key="nav.home"]').textContent = t.nav.home;
        document.querySelector('[data-lang-key="nav.about"]').textContent = t.nav.about;
        document.querySelector('[data-lang-key="nav.services"]').textContent = t.nav.services;
        document.querySelector('[data-lang-key="nav.contact"]').textContent = t.nav.contact;

        // Hero Section
        document.querySelector('[data-lang-key="hero.title"]').textContent = t.hero.title;
        document.querySelector('[data-lang-key="hero.subtitle"]').textContent = t.hero.subtitle;
        document.querySelector('[data-lang-key="hero.cta"]').textContent = t.hero.cta;

        // Services Section
        document.querySelector('[data-lang-key="services.title"]').textContent = t.services.title;
        document.querySelector('[data-lang-key="services.education.title"]').textContent = t.services.education.title;
        document.querySelector('[data-lang-key="services.education.description"]').textContent = t.services.education.description;
        document.querySelector('[data-lang-key="services.consulting.title"]').textContent = t.services.consulting.title;
        document.querySelector('[data-lang-key="services.consulting.description"]').textContent = t.services.consulting.description;
        document.querySelector('[data-lang-key="services.development.title"]').textContent = t.services.development.title;
        document.querySelector('[data-lang-key="services.development.description"]').textContent = t.services.development.description;
        document.querySelector('[data-lang-key="services.token.title"]').textContent = t.services.token.title;
        document.querySelector('[data-lang-key="services.token.description"]').textContent = t.services.token.description;
        document.querySelector('[data-lang-key="services.security.title"]').textContent = t.services.security.title;
        document.querySelector('[data-lang-key="services.security.description"]').textContent = t.services.security.description;
        document.querySelector('[data-lang-key="services.defi.title"]').textContent = t.services.defi.title;
        document.querySelector('[data-lang-key="services.defi.description"]').textContent = t.services.defi.description;
        document.querySelector('[data-lang-key="services.dao.title"]').textContent = t.services.dao.title;
        document.querySelector('[data-lang-key="services.dao.description"]').textContent = t.services.dao.description;
        document.querySelector('[data-lang-key="services.infrastructure.title"]').textContent = t.services.infrastructure.title;
        document.querySelector('[data-lang-key="services.infrastructure.description"]').textContent = t.services.infrastructure.description;
        document.querySelector('[data-lang-key="services.metaverse.title"]').textContent = t.services.metaverse.title;
        document.querySelector('[data-lang-key="services.metaverse.description"]').textContent = t.services.metaverse.description;
        document.querySelector('[data-lang-key="services.crosschain.title"]').textContent = t.services.crosschain.title;
        document.querySelector('[data-lang-key="services.crosschain.description"]').textContent = t.services.crosschain.description;

        // About Section
        document.querySelector('[data-lang-key="about.title"]').textContent = t.about.title;
        document.querySelector('[data-lang-key="about.highlight"]').textContent = t.about.highlight;
        document.querySelector('[data-lang-key="about.description"]').textContent = t.about.description;

        // Contact Form
        document.querySelector('[data-lang-key="contact.title"]').textContent = t.contact.title;
        document.querySelector('[data-lang-key="contact.name"]').setAttribute('placeholder', t.contact.name);
        document.querySelector('[data-lang-key="contact.email"]').setAttribute('placeholder', t.contact.email);
        document.querySelector('[data-lang-key="contact.message"]').setAttribute('placeholder', t.contact.message);
        document.querySelector('[data-lang-key="contact.submit"]').textContent = t.contact.submit;

        // Tech Stack Section
        document.querySelector('[data-lang-key="tech.title"]').textContent = t.tech.title;
        document.querySelector('[data-lang-key="tech.description"]').textContent = t.tech.description;
        document.querySelector('[data-lang-key="tech.list.item1"]').textContent = t.tech.list.item1;
        document.querySelector('[data-lang-key="tech.list.item2"]').textContent = t.tech.list.item2;
        document.querySelector('[data-lang-key="tech.list.item3"]').textContent = t.tech.list.item3;
        document.querySelector('[data-lang-key="tech.list.item4"]').textContent = t.tech.list.item4;
        document.querySelector('[data-lang-key="tech.blockchain.title"]').textContent = t.tech.blockchain.title;
        document.querySelector('[data-lang-key="tech.blockchain.ethereum"]').textContent = t.tech.blockchain.ethereum;
        document.querySelector('[data-lang-key="tech.blockchain.solana"]').textContent = t.tech.blockchain.solana;
        document.querySelector('[data-lang-key="tech.blockchain.polkadot"]').textContent = t.tech.blockchain.polkadot;
        document.querySelector('[data-lang-key="tech.languages.title"]').textContent = t.tech.languages.title;
        document.querySelector('[data-lang-key="tech.languages.solidity"]').textContent = t.tech.languages.solidity;
        document.querySelector('[data-lang-key="tech.languages.rust"]').textContent = t.tech.languages.rust;
        document.querySelector('[data-lang-key="tech.languages.javascript"]').textContent = t.tech.languages.javascript;
        document.querySelector('[data-lang-key="tech.tools.title"]').textContent = t.tech.tools.title;
        document.querySelector('[data-lang-key="tech.tools.hardhat"]').textContent = t.tech.tools.hardhat;
        document.querySelector('[data-lang-key="tech.tools.truffle"]').textContent = t.tech.tools.truffle;
        document.querySelector('[data-lang-key="tech.tools.web3"]').textContent = t.tech.tools.web3;

        // FAQ Section
        document.querySelector('[data-lang-key="faq.title"]').textContent = t.faq.title;
        document.querySelector('[data-lang-key="faq.q1.question"]').textContent = t.faq.q1.question;
        document.querySelector('[data-lang-key="faq.q1.answer"]').textContent = t.faq.q1.answer;
        document.querySelector('[data-lang-key="faq.q2.question"]').textContent = t.faq.q2.question;
        document.querySelector('[data-lang-key="faq.q2.answer"]').textContent = t.faq.q2.answer;
        document.querySelector('[data-lang-key="faq.q3.question"]').textContent = t.faq.q3.question;
        document.querySelector('[data-lang-key="faq.q3.answer"]').textContent = t.faq.q3.answer;
        document.querySelector('[data-lang-key="faq.q4.question"]').textContent = t.faq.q4.question;
        document.querySelector('[data-lang-key="faq.q4.answer"]').textContent = t.faq.q4.answer;
        document.querySelector('[data-lang-key="faq.q5.question"]').textContent = t.faq.q5.question;
        document.querySelector('[data-lang-key="faq.q5.answer"]').textContent = t.faq.q5.answer;

        // Footer
        document.querySelector('[data-lang-key="footer.description"]').textContent = t.footer.description;
        document.querySelector('[data-lang-key="footer.legal.title"]').textContent = t.footer.legal.title;
        document.querySelector('[data-lang-key="footer.legal.terms"]').textContent = t.footer.legal.terms;
        document.querySelector('[data-lang-key="footer.legal.privacy"]').textContent = t.footer.legal.privacy;
        document.querySelector('[data-lang-key="footer.contact.title"]').textContent = t.footer.contact.title;
        document.querySelector('[data-lang-key="footer.contact.email"]').textContent = t.footer.contact.email;
        document.querySelector('[data-lang-key="footer.copyright"]').textContent = t.footer.copyright;
    }
}

// Sayfa yüklendiğinde dil yöneticisini başlat
document.addEventListener('DOMContentLoaded', () => {
    window.langManager = new LanguageManager();
}); 